import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
export default NextAuth({
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!, // Ottieni da GitHub App
        clientSecret: process.env.GITHUB_CLIENT_SECRET!, // Ottieni da GitHub App
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        // Aggiungi informazioni extra alla sessione (e.g., GitHub ID)
        session.user.id = token.id;
        return session;
      },
    },
  });