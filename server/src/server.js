import cluster from "cluster";
import os from "os";

const cpuCount = os.cpus().length;

export default function handleServer(app) {

    if (cluster.isPrimary) {

        for (let i = 0; i < cpuCount; i++) {
            cluster.fork();
        }
    }
    else {

        app
            .listen(process.env.PORT, () => {
                console.log(`⚙ Server started at port : ${process.env.PORT}`);
            })
            .on('error', (err) => {
                console.log(`An error occurred in express server : ${err}`);
                throw new Error(err)
            })
    }
}   