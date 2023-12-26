import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import router from "next/router";
import { CancelButton, DeleteButton } from "./Buttons/Button";

export default function DeletePostModal({ postId }: { postId: string }) {
  let [isOpen, setIsOpen] = useState(false);

  // Deletes Post
  const deleteHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    closeModal();

    try {
      const response = await fetch(`/api/post/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId }),
      }).then((r) => r.json());

      console.log(response.message);
      router.push(response.redirect);
    } catch (error: any) {
      console.error(error);
      closeModal();
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex">
        {/* Delete button */}
        <DeleteButton onClick={openModal}>
          <img src="/trash-bin-white.svg" height={15} width={15} alt="Delete" />
          <span className="ml-2 text-white font-semibold text-xs">Delete</span>
        </DeleteButton>
      </div>

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

                  <p className="text-sm text-gray-500 mt-2">
                    This will permanently delete all your information in your
                    post. You won't be able to revert this.
                  </p>

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
}
