import { useEffect } from "react";
import Router from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";

const login = ({ provider, session }) => {
  console.log({ provider, session });
  useEffect(() => {
    if (session) return Router.push("/");
  }, [session]);
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <h1>Login</h1>
        <p>Login now with NextAuth</p>
        <button
          onClick={() => signIn(provider.facebook.id)}
          className="w-32 border py-2 text-sm mt-5 bg-blue-500 text-gray-50"
        >
          {provider.facebook.name}
        </button>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      provider: await getProviders(context),
      session: await getSession(context),
    },
  };
}

export default login;
