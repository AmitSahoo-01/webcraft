import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { error } from "console";


const working_dir = "/workspace";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Welcome to WEBCRAFT - hello from sandbox-Ai agent.",
        status: "success"
    });
});

app.get("/list-files", async(req,res)=>{

    const elements = await fs.promises.readdir(working_dir);

    res.status(200).json({
        message: "List of files in the working directory.",
        status: "success",
        elements
    });

});

/**
*get-/read-files 
* -> This route is used to read the content of files requested in the query parameter.
*/
app.get("/read-files", async(req,res)=>{

    const files = req.query.files;
    if(!files){
        return res.status(400).json({
            message: "No files specified in the query parameter.",
            status: "error"
        })
    };

    const fileList = files.split(",");

    const results = await Promise.all(fileList.map(async(file)=>{
        const filePath = `${working_dir}/${file}`;
        try{

            const content = await fs.promises.readFile(filePath, "utf-8");
            return {
                [filePath] : content
            }

        } catch (error) {
            console.error(`Error reading ${file}:`, error);
            return {
                [filePath]:`Error reading file:${error.message}`
            }
        }
    }));   

    res.status(200).json({
        message:"file contents",
        files: results
    });

}); 


/**
* patch - /update-files 
*  for updating the files 
*/

app.patch("/update-files", async(req,res)=>{
    const updates = req.body.updates;

    if(!updates || !Array.isArray(updates)){
        return res.status(400).json({
            message:"invalid request.body Expected a jsonobject with an 'updates' property containing an array of file updates. ",
            status: "error"
        });
    }


    const results = await Promise.all(updates.map(async(update)=>{
        const {file,content} = update;
        const filePath = path.join(working_dir,file);

        try{
            await fs.promises.writeFile(filePath,content, 'utf-8');
            return{
                [filePath]: "file updated successfully"
            }
        }catch(error){
            return{
                [filePath] :`error in updating the files ${error}`
            }
        }
    }));

    res.status(200).json({
        message:"file update results",
        results
    });
});

/**
* post - create-files 
* for creating files by agent
* by this api ai agent can acess and create file also in the folder or repo.
*/

app.post("/create-files", async(req,res)=>{
    const files = req.body.files;

    if(!files || !Array.isArray(files)){
        res.status(400).json({
            message:"invalid req body",
            status: "error"
        })
    };

    const results = await Promise.all(files.map(async(fileObj)=>{
        const {file,content} = fileObj;
        const filePath = path.join(working_dir,file);
        try{
            await fs.promises.writeFile(filePath,content,'utf-8');
            return{
                [filePath]:"file created successfully.",
            }
        }catch(error){
            return{
                [filePath]:`error creating in file ${error}`
            }
        }
    }));
});


export default app;