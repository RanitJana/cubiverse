import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRECT
});

const uploadAvater = async function (filePath, name) {

    const uploadResult = await cloudinary.uploader
        .upload(filePath, { public_id: `${name}` })
        .catch((err) => {
            console.log(err);
        });
    return uploadResult;
}
export default uploadAvater;