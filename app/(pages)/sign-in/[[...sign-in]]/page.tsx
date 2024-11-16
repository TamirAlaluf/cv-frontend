import { LoginForm } from "@/components/login-form";
import NavBar from "@/components/NavBar";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <NavBar />
      {/* <div className="flex pt-20 h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </div> */}
      <div className="flex pt-20 h-screen w-full items-center justify-center px-4">
        <SignIn />
      </div>
    </>
  );
}
