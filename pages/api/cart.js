import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();
  //await isAdminRequest(req, res);
  const ids = req.body.ids;
  res.status(200).json(await Product.find({ _id: ids }));
}
