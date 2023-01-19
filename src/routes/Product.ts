import express from "express";
import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import * as multerStorageCloudinary from "multer-storage-cloudinary";
import {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  uploadImage,
  stripeController
} from "../controllers/Product";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary,

});

const upload = multer({ storage });


router.post("/upload", upload.single("image"), uploadImage);
router.route("/").get(getAllProducts).post(createProduct);
router.route('/stripe').post(stripeController)
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
