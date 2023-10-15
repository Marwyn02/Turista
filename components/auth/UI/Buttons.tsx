import { signIn } from "next-auth/react";
import React, { FC } from "react";

interface ProvidersObject {
  [key: string]: Provider;
}

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SignupButtons: FC<ProvidersObject> = ({ providers }) => {
  const provider = Object.values(providers);

  return (
    <>
      {provider.map((prov) => (
        <div key={prov.id} className="flex justify-center -mt-2">
          <button
            onClick={() => signIn(prov.id)}
            className={
              prov.id === "facebook"
                ? "bg-blue-500 w-full rounded-lg py-3 text-sm mt-5 font-bold tracking-wide text-gray-50 hover:text-white hover:drop-shadow-md"
                : "bg-white w-full border border-black rounded-lg py-3 text-sm mt-5 font-bold tracking-wide text-gray-600 hover:text-gray-800 hover:drop-shadow-md"
            }
          >
            Continue with {prov.name}
          </button>
        </div>
      ))}
    </>
  );
};

export default SignupButtons;
