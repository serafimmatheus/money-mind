import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const home = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <main className="container">
      <h1>Hello world!</h1>
    </main>
  );
};

export default home;
