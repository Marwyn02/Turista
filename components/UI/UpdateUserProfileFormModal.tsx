import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function UpdateUserProfileFormModal() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  //   function openModal() {
  //     setIsOpen(true);
  //   }
  return (
    <>
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
                    as="h1"
                    className="text-2xl font-bold text-gray-900 my-4"
                  >
                    Update Profile Form
                  </Dialog.Title>
                  <div className="mt-8 mb-5 flex justify-between">
                    <p className="text-sm text-gray-500">
                      Please wait for a moment. We're trying to make it as the
                      best of the best!
                    </p>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-50 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none duration-300"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
