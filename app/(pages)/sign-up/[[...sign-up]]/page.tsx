import NavBar from "@/components/NavBar";
import { SignUp } from "@clerk/nextjs";

export default function Signup() {
  return (
    <>
      <NavBar />
      {/* <div className="flex pt-40 pb-20 h-screen w-full items-center justify-center px-4">
        <SignUp />
      </div> */}
      <div className="flex pt-40 pb-20 h-screen w-full items-center justify-center px-4">
        <SignUp />
      </div>
    </>
  );
}
