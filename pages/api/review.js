import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "/models/Review";
import { getToken } from "next-auth/jwt";
// needed to populate user and product
import { User } from "@/models/User";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();
  try {
    if (req.method === "POST") {
      const token = await getToken({ req });
      const { product, rating, title, comment, type, uid, reviewLimit } = req.body;
      if (type === "singleUserReviews") {
        const singleUserReviews = await Review.find({ user: uid }).populate("product", "title").limit(reviewLimit);
        if (reviewLimit > singleUserReviews.length) {
          return res.status(200).json({ singleUserReviews, limitReached: true });
        }
        return res.status(200).json({ singleUserReviews });
      }
      if (type === "singleProductReviews") {
        const { _id } = req.body;
        const reviews = await Review.find({ product: _id }).populate("user", "name").sort({ createdAt: -1 });
        return res.status(200).json(reviews);
      }
      const review = await Review.create({ rating, title, comment, user: token.uid, product });
      return res.status(201).json(review);
    }

    if (req.method === "GET") {
      const fullUrl = req.headers.referer.split("/");
      const product = fullUrl[fullUrl.length - 1];
      console.log(product);
      const reviews = await Review.find({ product }).populate("user", "name").sort({ createdAt: -1 });
      return res.status(200).json(reviews);
    }

    if (req.method === "PATCH") {
      const token = await getToken({ req });
      const { product, rating, title, comment } = req.body;
      const updatedReview = await Review.findOneAndUpdate({ product, user: { _id: token.uid } }, { rating, title, comment }, { new: true });
      return res.status(200).json(updatedReview);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      await Review.findByIdAndDelete(id);
      return res.status(200).json();
    }
  } catch (error) {
    console.log(error);
  }
}
