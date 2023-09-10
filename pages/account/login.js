import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MainLayout from "@/components/layout/MainLayout";

const login = ({ provider, session }) => {
  const router = useRouter();
  const { data: account } = useSession();
  if (account) {
    router.push("/");
  }
  return (
    <MainLayout>
      <div className="bg-white sm:my-4 py-10 md:rounded-lg">
        <div className="px-5">
          <h1 className="text-2xl italic font-bold leading-9 text-blue-500 text-center tracking-wide">
            Turista
          </h1>
          <p className="text-base tracking-wide text-gray-700 font-bold mt-5">
            Sign in with
          </p>
          <hr className="my-5 border-gray-300" />
          <div className="flex justify-center -mt-2">
            <button
              onClick={() => signIn(provider.facebook.id)}
              className="w-5/6 rounded-full border py-3 text-sm mt-5 font-semibold tracking-wide text-gray-700 hover:bg-blue-500 hover:text-gray-50 hover:border-blue-500 duration-300"
            >
              {provider.facebook.name}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="w-5/6 rounded-full border py-3 text-sm mt-5 font-semibold tracking-wide text-gray-700 hover:bg-blue-500 hover:text-gray-50 hover:border-blue-500 duration-300"
              disabled
            >
              Google
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="w-5/6 rounded-full border py-3 text-sm mt-5 font-semibold tracking-wide text-gray-700 hover:bg-blue-500 hover:text-gray-50 hover:border-blue-500 duration-300"
              disabled
            >
              Github
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
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
