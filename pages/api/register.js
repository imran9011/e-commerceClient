import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handler(req, res) {
  await mongooseConnect();
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json("Invalid credentials");
    }
    return;
  }
}
