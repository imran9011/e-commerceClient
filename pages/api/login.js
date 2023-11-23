import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Invalid credentials");
      }
      const user = await User.findOne({ email });
      if (user) {
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }
      } else {
        throw new Error("Invalid Credentials");
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json("Invalid credentials");
    }
  }
}
