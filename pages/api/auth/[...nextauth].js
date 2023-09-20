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

  cookies: {
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "lax",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.type === "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },

    async signOut({ token, session }) {
      res.setHeader("Set-Cookie", "");

      token = {};
      session = {};
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      const user = await getUserByEmail({ email: token.email });
      token.user = user;
      return token;
    },

    async session({ session, token, user }) {
      // session.accessToken = token.accessToken;
      session.user = token.user;
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
    image: profile.picture.data.url,
    provider: account.provider,
  });
  const saveUser = await newUser.save();
  return true;
}

async function getUserByEmail({ email }) {
  const user = await User.findOne({ email }).select("-password");
  if (!user) throw new Error("Email does not exist");

  return { ...user._doc, _id: user._id.toString() };
}
