import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import router from "next/router";

import { CancelButton, DeleteButton } from "../Buttons/Button";

type TProps = {
  message: string;
};

type TDeleteModal = {
  message: string;
  postId?: string;
  reviewId?: string;
  userId?: string;
  isOpen: boolean;
  deleteType: "post" | "review" | "account";
  onClose?: () => void;
};

export const LoadingModal = ({ message }: TProps) => {
  let [isOpen] = useState(true);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="img"
                  src="/LoadingIcon.svg"
                  height={18}
                  width={18}
                  className="animate-spin h-[30px] w-[30px] mx-auto my-4"
                ></Dialog.Title>
                <div className="mt-8 mb-5">
                  <p className="text-sm text-gray-500 text-center">{message}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const DeleteModal = ({
  message,
  postId,
  reviewId,
  userId,
  isOpen,
  deleteType,
  onClose,
}: TDeleteModal) => {
  // Delete
  const deleteHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    closeModal();

    try {
      // DELETE Post
      if (deleteType === "post") {
        const response = await fetch(`/api/post/delete`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ postId }),
        }).then((r) => r.json());

        console.log(response.message);
        router.push(response.redirect);
      }
      // DELETE Review
      else if (deleteType === "review") {
        const response = await fetch(`/api/review/delete`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ reviewId, postId }),
        }).then((r) => r.json());

        console.log(response.message);
        router.push(response.path);
      }
      // DELETE User Account
      else if (deleteType === "account") {
        const response = await fetch(`/api/user/delete`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }).then((r) => r.json());

        console.log(response.message);
        router.push(response.path);
      }
    } catch (error: any) {
      console.error(error);
      closeModal();
    }
  };

  function closeModal() {
    onClose?.();
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure?
                  </Dialog.Title>

                  <p className="text-sm text-gray-500 mt-2">{message}</p>

                  <section className="mt-4 flex gap-x-4 justify-center">
                    {/* Cancel Button  */}
                    <CancelButton onClick={closeModal}>Cancel</CancelButton>

                    {/* In modal Delete Button  */}
                    <DeleteButton onClick={deleteHandler}>
                      Yes, delete it
                    </DeleteButton>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
