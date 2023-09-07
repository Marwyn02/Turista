import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { connectMongoDB } from "@/lib/connectMongoDB";

export default NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: "email",
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/account/login",
  },

  session: {
    jwt: true,
  },

  database: process.env.MONGODB_URI,
});
