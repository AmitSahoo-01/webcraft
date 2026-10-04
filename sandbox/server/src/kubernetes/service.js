import {k8sCoreV1Api} from "./config.js";

export async function createService(sandboxId) {

    const serviceManifest = {
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                app: "sandbox",
                sandboxId: sandboxId,
            }
        },
        spec:{
            selector: {
                app: "sandbox",
                sandboxId: sandboxId,
            },
            ports: [
                {
                    name: "http",
                    port: 80,
                    targetPort: 5173,
                    protocol: "TCP"
                }
            ],
            type: "ClusterIP"
        }
    }

    try {
        const response = await k8sCoreV1Api.createNamespacedService({
            namespace: "default",
            body: serviceManifest
        });

        // console.log(`Service created: ${response.body.metadata.name}`);

        return response;

    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }

}