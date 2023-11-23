import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be post request");
    return;
  }
  await mongooseConnect();
  const { name, email, streetAddress, town, postCode, city, cartProducts: products } = req.body;
  const allProducts = products;
  const uniqueIds = [...new Set(allProducts)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let total = 0;
  let line_items = [];
  for (const productId of uniqueIds) {
    const singleProductInfo = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = allProducts.filter((id) => id === productId)?.length || 0;

    if (quantity > 0) {
      line_items.push({
        quantity,
        price_data: {
          currency: "GBP",
          product_data: {
            name: singleProductInfo.title,
            _id: singleProductInfo._id,
            images: [singleProductInfo.images[0]] || "https://placehold.co/600x400",
          },
          unit_amount: singleProductInfo.price * 100,
        },
      });
    }
    total += quantity * singleProductInfo.price * 100;
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    streetAddress,
    town,
    postCode,
    city,
    paid: false,
    total,
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.HOME_URL + "/cart?success=1",
    cancel_url: process.env.HOME_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
  });
  return res.status(201).json({
    url: session.url,
  });
}
