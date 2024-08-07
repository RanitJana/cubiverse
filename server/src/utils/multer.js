import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.join(__dirname, "../public/uploads"));
        cb(null, "/tmp");   //**** THIS IS FOR VERCEL ONLY
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now() + file.originalname}`);
    }
})

const upload = multer({
    storage: diskStorage,
    limits: { fileSize: 1000000 }
});

export default upload;