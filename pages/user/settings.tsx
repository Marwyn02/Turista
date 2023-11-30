import { useSession } from "next-auth/react";
import PersonalDetails from "@/components/settings/PersonalDetails";
import MainPageLayout from "@/components/layout/MainPageLayout";

export default function settings() {
  const { data: session } = useSession();

  return (
    <MainPageLayout>
      <h1 className="text-lg text-gray-700 font-semibold px-3 lg:px-0">
        User Settings
      </h1>
      <PersonalDetails
        name={session?.user?.name as string}
        email={session?.user?.email as string}
        image={session?.user?.image as string}
      />
    </MainPageLayout>
  );
}
