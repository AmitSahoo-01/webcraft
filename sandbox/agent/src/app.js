import express from "express";
import morgan from "morgan";
import fs from "fs";

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

})


export default app;