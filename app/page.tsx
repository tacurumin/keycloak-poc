// src/app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/providers/authProvider";
import LogoutWrapper from "@/components/LogoutWrapper/LogoutWrapper";

export default async function Home() {
  const session = await getServerSession(authOptions);

  //  Login succeeded:
  if (session) {
    return (
      <LogoutWrapper
        username={session.user?.preferredUsername || session.user?.name || ""}
      />
    );
  }

  // Main page of the application:
  return redirect("/signin");
}
