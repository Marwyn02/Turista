import { useSession } from "next-auth/react";
import PersonalDetails from "@/components/settings/PersonalDetails";
import MainPageLayout from "@/components/layout/MainPageLayout";
import { useState } from "react";

import UpdateUserProfileFormModal from "@/components/UI/UpdateUserProfileFormModal";

export default function settings() {
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <MainPageLayout>
      <div className="flex justify-between items-center px-3">
        <h1 className="text-lg text-gray-700 font-semibold lg:px-0">
          User Settings
        </h1>
        <button
          type="button"
          className="border border-gray-600 text-gray-700 bg-gray-50 font-bold text-xs px-4 py-1 rounded-full hover:bg-gray-200 duration-300"
          onClick={() => setIsFormOpen(true)}
        >
          Update Profile
        </button>
      </div>
      <PersonalDetails
        name={session?.user?.name as string}
        email={session?.user?.email as string}
        image={session?.user?.image as string}
      />

      {isFormOpen && <UpdateUserProfileFormModal />}
    </MainPageLayout>
  );
}
