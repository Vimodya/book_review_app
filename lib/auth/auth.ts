import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, Session } from "next-auth";
import User from "../../models/user";
import { JWT } from "next-auth/jwt";

export async function comparePassword(password: string, hashPassword: string) {
  const isValid = await compare(password, hashPassword);
  return isValid;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user?.email;
        const name = user?.name;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          const newUser = await User.create({
            email,
            firstName: name?.split(" ")[0] || "",
            lastName: name?.split(" ")[1] || "",
            password: "",
          });

          user._id = newUser._id;
          user.firstName = newUser.firstName;
          user.lastName = newUser.lastName;
        } else {
          user._id = existingUser._id;
          user.firstName = existingUser.firstName;
          user.lastName = existingUser.lastName;
        }
        return true;
      }
      return true;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user._id = token.id as string;
      return session;
    },

    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
  },
};
