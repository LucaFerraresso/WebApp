// app/api/auth/[...nextauth]/route.ts (Server-side API route)
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; // This is fine in API routes

const secret = process.env.JWT_SECRET || "your-random-secret";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        let user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.create({
            data: {
              username: credentials.username,
              password: hashedPassword,
              email: credentials.username, // Use username as the email for simplicity
            },
          });
        } else {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            return null;
          }
        }
        console.log("User authenticated:", user);

        return { id: user.id, username: user.username, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
  secret, // JWT secret key
};

const handler = NextAuth(authOptions);

// Export API route handlers
export { handler as GET, handler as POST };
