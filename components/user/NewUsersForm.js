import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";

const NewUsersForm = () => {
  const router = useRouter();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitUserHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const UserData = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const response = await fetch("/api/register/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserData),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      } else {
        router.push("/");
      }
    } catch (e) {
      throw new Error("Error in new-user: ", e);
    }
  };
  return (
    <form
      onSubmit={submitUserHandler}
      className="bg-white sm:my-4 py-10 md:rounded-lg md:border-2 md:border-blue-200"
    >
      <div className="space-y-12 px-5">
        <h2 className="text-4xl font-semibold leading-7 text-blue-400 underline">
          Create your account
        </h2>
        <p className="text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
          {/* Username Input  */}
          <div className="sm:col-span-4">
            <label
              className="text-sm font-medium leading-6 text-gray-600"
              htmlFor="username"
            >
              Username
            </label>
            <div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-500 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your name is?"
                  ref={usernameInputRef}
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Input  */}
          <div className="sm:col-span-4">
            <label
              className="text-sm font-medium leading-6 text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-500 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Youremail@email.com"
                  ref={emailInputRef}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              className="text-sm font-medium leading-6 text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-500 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                  ref={passwordInputRef}
                  required
                />
              </div>
            </div>
            <div className="flex mt-8 md:mt-12 gap-x-1.5">
              <div>
                <button className="bg-gray-200 text-sm py-1 px-1.5 w-max rounded text-gray-900">
                  <Link href="/">Cancel</Link>
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-sm py-1 px-1.5 w-max rounded text-gray-100"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewUsersForm;
