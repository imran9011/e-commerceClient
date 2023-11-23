import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    try {
      const { id } = req.body;
      if (id) {
        const order = await Order.findOne({ _id: id });
        return res.status(200).json(order);
      }
      const { email, type, orderLimit } = req.body;
      if (email) {
        if (type === "singleUserOrders") {
          const singleUserOrders = await Order.find({ email }).limit(orderLimit);
          if (orderLimit > singleUserOrders.length) {
            return res.status(200).json({ singleUserOrders, limitReached: true });
          }
          return res.status(200).json({ singleUserOrders });
        }

        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        return res.status(200).json({ orders });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
