import  { Schema, model } from "mongoose";
// import validator from 'validator';


interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  // category: string;
  user: object;
  inventory: number;
  averageRating: number;
  numOfReviews: number;
  freeShipping: boolean;
  colors?: string;
  productType: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the product "],
      minlength: 3,
      maxlength: 40,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for the product"],
      default: 0,
    },
    // category: {
    //   type: String,
    //   required: [true, "Please provide product category"],
    //   enum: ["office", "kitchen", "bedroom", "school"],
    // },
    productType: {
      type: String,
      required: [true, "Please a product type"]
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      default: "An expensive shit",
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("remove", async function () {
  await model("Review").deleteMany({ product: this });
});

export default model<IProduct>("Product", ProductSchema);
