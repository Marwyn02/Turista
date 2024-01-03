import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

      return Promise.resolve(session);
    },
  },

  pages: {
    signIn: "/account/login",
  },
});

async function signInWithOAuth({ account, profile }) {
  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  if (account.provider === "facebook") {
    const newUser = new User({
      followers: [],
      name: profile.name,
      email: profile.email,
      image: profile.picture.data.url,
      cover_photo: "",
      provider: account.provider,
    });

    const saveUser = await newUser.save();
    return true;
  } else if (account.provider === "google") {
    const newUser = new User({
      followers: [],
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      cover_photo: "",
      provider: account.provider,
    });
    const saveUser = await newUser.save();
    return true;
  }
}

async function getUserByEmail({ email }) {
  const user = await User.findOne({ email }).select("-password");
  if (!user) throw new Error("Email does not exist");

  return { ...user._doc, _id: user._id.toString() };
}
