import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    try {
      const { _id } = req.body;
      const product = await Product.find({ _id });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }
}
