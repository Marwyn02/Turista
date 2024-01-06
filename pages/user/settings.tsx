import { useSession } from "next-auth/react";

import PersonalDetails from "@/components/settings/PersonalDetails";
import MainPageLayout from "@/components/layout/MainPageLayout";

export default function settings() {
  const { data: session } = useSession();
  return (
    <MainPageLayout>
      <div>
        <h1 className="text-lg text-gray-700 font-semibold lg:px-0">
          User Settings
        </h1>
      </div>
      <PersonalDetails
        name={session?.user?.name as string}
        email={session?.user?.email as string}
        image={(session?.user as { image: { image?: string } })?.image.image}
        cover_photo={{
          image: (session?.user as { cover_photo: { image: string } })
            ?.cover_photo.image,
          public_id: (session?.user as { cover_photo: { public_id: string } })
            ?.cover_photo.public_id,
        }}
      />
    </MainPageLayout>
  );
}
