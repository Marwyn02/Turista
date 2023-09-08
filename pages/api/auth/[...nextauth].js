import { connectMongoDB } from "@/lib/connectMongoDB";
import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import User from "@/models/User";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  // providers: [
  //   Github({
  //     clientId: process.env.GITHUB_CLIENT_ID,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //   }),
  // ],

  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: "email",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.type === "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      // console.log("TOKEN: ", token);
      return session;
    },
  },

  pages: {
    signIn: "/account/login",
  },
});

async function signInWithOAuth({ account, profile }) {
  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    providers: account.provider,
  });

  console.log({ newUser });

  return true;
}
