import { Schema, model } from "mongoose";
interface ReviewType {
  rating: number;
  review: string;
  reviewTitle: string;
  product: object;
  user: object;
}

const ReviewSchema = new Schema<ReviewType>({
  rating: {
    type: Number,
    required: [true, "Please provide rating for product"],
  },
  review: {
    type: String,
    required: [true, "Please provide a rveiew"],
  },
  reviewTitle: {
    type: String,
    required: [true, "Please a title for your review"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// ReviewSchema.post("save", async function () {
//   await this.constructor.calculateAverageRating(this.product);
// });


// ReviewSchema.post("remove", async function () {
//   await this.constructor.calculateAverageRating(this.product);
// });



export default model("Review", ReviewSchema);
