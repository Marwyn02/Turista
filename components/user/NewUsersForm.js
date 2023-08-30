import Link from "next/link";
import { useRef } from "react";

const NewUsersForm = (props) => {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const UserData = {
      type: "USERS",
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onAddUser(UserData);
  };

  return (
    <form onSubmit={submitUserHandler}>
      <div className="space-y-12 px-5 my-6 sm:my-1">
        <h2 className="text-4xl text-center font-semibold leading-7 text-blue-200 mt-3 md:mt-5">
          Create your account
        </h2>
        <p className="text-sm leading-6 text-gray-600 text-center">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
          {/* Username Input  */}
          <div className="sm:col-span-4 md:col-span-1 md:col-start-2">
            <label
              className="text-sm font-medium leading-6 text-gray-100"
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-200 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your name is?"
                  ref={usernameInputRef}
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Input  */}
          <div className="sm:col-span-4 md:col-span-1 md:col-start-2">
            <label
              className="text-sm font-medium leading-6 text-gray-100"
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-200 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Youremail@email.com"
                  ref={emailInputRef}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 md:col-span-1 md:col-start-2">
            <label
              className="text-sm font-medium leading-6 text-gray-100"
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-200 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
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
                  Create account
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
