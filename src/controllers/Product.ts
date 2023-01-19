import { RequestHandler } from "express";
import { v2 as cloudinary} from "cloudinary"
import Stripe from "stripe";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Products";
import { badRequestError } from "../errors";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const getAllProducts: RequestHandler = async (_, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json({ product });
};

const getProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.find({ _id: id });
  if (!product) {
    throw new badRequestError("Invalid request ");
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct: RequestHandler = async (req, res) => {
  const { name, price, description, category } = req.body;
  if (!req.body || !category || !name || !price || !description) {
    throw new badRequestError("Invalid Request");
  }
  await Product.create({
    ...req.body
  });
  res.status(StatusCodes.CREATED).json({ name, price, category });
};

const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;
  if (!req.body || !category || !name || !price || !description) {
    throw new badRequestError("Invalid Request");
  }
  const products = await Product.findOneAndUpdate(
    { _id: id },
    { name, price, description, category },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!products) {
    throw new badRequestError("Inalid Requests");
  }
  res.status(StatusCodes.OK).json({ products });
};

const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    throw new badRequestError("Invalid Request ");
  }
  res.status(StatusCodes.OK).json({ product });
};

const uploadImage: RequestHandler = async (req, res) => {
  const image = req.file;
  if (!image) {
    throw new badRequestError("Please provide Image file")
  }
  cloudinary.uploader.upload(
    image.path,
    { folder: "Diene" },
     (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      return res.json({ image: result });
    }
  );
};

const stripeController: RequestHandler = async (req, res) => {
  const createCustomer = async () => {
    const params: Stripe.CustomerCreateParams = {
      description: "test customer",
    };

    const customer: Stripe.Customer = await stripe.customers.create(params);

    console.log(customer.id);
  };
  createCustomer();
  const { total_amount, shipping_fee } = req.body;

  const totalOrderAmount = () => {
    console.log(total_amount);
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalOrderAmount(),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  }

export {
  uploadImage,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  stripeController
};
