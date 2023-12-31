import React, { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

import { Icon } from "../UI/Images/Image";

//
//
// - This component is responsible for displaying the user's profile image
// - User can sign out through the signOut button below
//
//

export default function Component() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const data = [
    {
      image: `${(session?.user as { image: { image?: string } })?.image.image}`,
      name: `${session?.user?.name}`,
      description: "Account Profile",
      href: `/user/${(session?.user as { _id: string })?._id as string}`,
    },
    {
      image: "",
      name: "Manage Posts",
      description: "Keep track of your posts",
      href: "/manage/posts",
    },
    {
      image: "",
      name: "Settings",
      description: "",
      href: "/user/settings",
    },
  ];

  if (session) {
    return (
      <div>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "text-white" : "text-white/90"}
                group flex items-center focus:ring-0 focus:outline-none`}
              >
                <img
                  src={
                    (session?.user as { image: { image?: string } })?.image
                      .image
                  }
                  alt="Profile Image"
                  className="rounded-full h-[40px] w-[40px] border-[1.5px] border-y-violet-500
                  border-x-pink-300 hover:opacity-90 duration-150 cursor-pointer"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-[90%] transform px-4 sm:px-0 lg:max-w-sm">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                    <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                      {data.map((item) => (
                        <Popover.Button key={item.name} as={Fragment}>
                          <Link
                            href={item.href}
                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                              {item.image === "" ? (
                                <div></div>
                              ) : (
                                <img
                                  src={item?.image || ""}
                                  alt="Profile Image"
                                  className="rounded-full h-full w-full"
                                />
                              )}
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        </Popover.Button>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4">
                      <button
                        onClick={() => signOut()}
                        className="flex py-2 px-4 font-medium text-sm text-start text-gray-900 
                           hover:text-gray-600 rounded-lg hover:bg-gray-100 w-full duration-100"
                      >
                        <Icon
                          src="/logout.svg"
                          alt="logout"
                          height={18}
                          width={18}
                        />
                        <span className="ml-2">Sign out</span>
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  }

  // Show sign in button only if the user is not in the /account/login page
  if (pathname !== "/account/login") {
    return (
      <Link
        href="/account/login"
        className="self-center py-1.5 px-4 font-semibold text-xs 
                     lg:text-sm text-violet-400 rounded
                    hover:bg-violet-400 hover:text-white duration-300"
      >
        Sign in
      </Link>
    );
  }
}
