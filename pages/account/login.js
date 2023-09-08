import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const login = ({ provider, session }) => {
  const router = useRouter();
  const { data: account } = useSession();

  if (account) {
    router.push("/");
  }
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
