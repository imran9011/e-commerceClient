import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import axios from "axios";
import { mongooseConnect } from "@/lib/mongoose";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          await mongooseConnect();
          const result = await axios.post(process.env.NEXTAUTH_URL + "/api/login", {
            email: credentials.email,
            password: credentials.password,
          });
          const { _id, name, email } = result.data;
          if (email === credentials.email) {
            return { _id, name, email };
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    maxAge: 60 * 24 * 60 * 30,
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user._id;
      }
      return token;
    },
    async session({ token, session, user }) {
      if (session) {
        session.user.id = token.uid;
        return session;
      } else return false;
    },
  },
};

export async function isLoggedIn(req, res) {
  const session = await getServerSession(req, res, options);
  const email = session?.user?.email;
  if (!email) {
    res.status(401);
    res.end();
    throw "Not Logged in";
  }
}

export default NextAuth(options);
