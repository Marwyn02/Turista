import { FC } from "react";
import { getProviders, getSession, useSession } from "next-auth/react";
import router from "next/router";

import Buttons from "@/components/auth/UI/Buttons";

interface LoginProps {
  provider: any;
  session: any;
}

const login: FC<LoginProps> = ({ provider, session }) => {
  const { data: account } = useSession();

  if (account) {
    router.push("/");
  }
  return (
    <section className="pt-10 lg:mx-24 grid grid-cols-1 lg:grid-cols-5">
      {/* Login title and subtitle */}
      <div className="lg:col-span-3 lg:grid lg:place-content-center lg:h-screen">
        <h1 className="text-2xl text-center lg:text-start lg:text-6xl font-semibold lg:font-thin leading-9 lg:text-black tracking-wider lg:tracking-wide">
          Welcome to
          <span className="text-indigo-600 lg:font-light"> Turista</span>
        </h1>
        <p className="text-base lg:text-3xl font-medium tracking-wide lg:tracking-widest text-center lg:text-start text-gray-700 lg:mt-0.5">
          Great to have you back!
        </p>
      </div>

      <div className="border border-gray-300 rounded-md col-span-2 my-8 lg:my-10 mx-3.5 lg:mx-5 h-fit">
        <div className="py-6 px-8">
          {/* Working button provider  */}
          <Buttons providers={provider} />

          {/* On going auth project  */}
          <div className="flex justify-center -mt-2">
            <button
              className="bg-gray-300 w-full border border-gray-300 rounded-lg py-3 text-sm mt-5 font-bold tracking-wide text-white"
              disabled
            >
              Continue with Instagram
            </button>
          </div>

          <div className="flex justify-center -mt-2">
            <button
              className="bg-gray-300 w-full border border-gray-300 rounded-lg py-3 text-sm mt-5 font-bold tracking-wide text-white"
              disabled
            >
              Continue with Apple
            </button>
          </div>

          <p className="text-sm text-center text-gray-400 my-3">or</p>

          {/* Disabled login form  */}
          <section>
            <div>
              <label htmlFor="email" className="text-sm text-gray-300">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                className="bg-gray-100 w-full py-2 px-3 border border-gray-300 rounded-lg"
                disabled
              />
            </div>
            <div className="my-3">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="bg-gray-100 w-full py-2 px-3 border border-gray-300 rounded-lg"
                disabled
              />
            </div>
            <button
              className="w-full rounded-lg bg-[#ff5964] py-3.5 text-center text-gray-200 opacity-80 mt-3"
              disabled
            >
              Sign in
            </button>
          </section>
        </div>

        {/* Disabled sign in button */}
        <div className="bg-gray-500 px-12 py-8 rounded-b-md">
          <p className="text-white text-sm ">
            Turista collects and uses personal data. By creating an account, you
            agree to our Terms & Conditions. Your personal data will be shown
            publicly.
          </p>
        </div>
      </div>
    </section>
  );
};

export async function getStaticProps(context: any) {
  const provider = await getProviders();
  const session = await getSession();

  return {
    props: {
      provider,
      session,
    },
  };
}

export default login;
