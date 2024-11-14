export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md fixed w-full top-0 z-50 bg-white">
      <div className="text-xl font-bold">ResumeOPT</div>
      <div className="space-x-4">
        <a
          href="#demo"
          className="px-4 py-2 hover:text-gray-200 transition-colors"
        >
          Demo
        </a>
        <a
          href="#faq"
          className="px-4 py-2 hover:text-gray-200 transition-colors"
        >
          FAQ
        </a>
        <a
          href="#pricing"
          className="px-4 py-2 hover:text-gray-200 transition-colors"
        >
          Pricing
        </a>
        <a
          href="#login"
          className="px-4 py-2 text-white bg-[#1468EF] rounded-md hover:bg-opacity-80 transition-colors"
        >
          Login
        </a>
      </div>
    </nav>
  );
}
