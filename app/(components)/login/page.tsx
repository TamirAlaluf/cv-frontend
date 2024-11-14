import { LoginForm } from "@/components/login-form";
import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </div>
    </>
  );
}
