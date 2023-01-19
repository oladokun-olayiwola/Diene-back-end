import express from "express"
import Authentication from "../middlewares/Authentication";


const router = express.Router()

import  {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/Review";

router.route("/").post(Authentication, createReview).get(getAllReviews);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(Authentication, updateReview)
  .delete(Authentication, deleteReview);



export default router