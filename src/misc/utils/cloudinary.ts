import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (imageUploaded: string) => {
  return await v2.uploader
    .upload(imageUploaded, {
      width: 150,
      height: 150,
      crop: "fill",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
