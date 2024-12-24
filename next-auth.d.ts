// types/next-auth.d.ts or src/types/next-auth.d.ts
import NextAuth, { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}
