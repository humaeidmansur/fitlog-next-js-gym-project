import Logo from "@/app/logo.ico" 
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-b border-white/5 bg-[#17130F] text-white">
      <nav className="navbar mx-auto min-h-16 max-w-360 px-5 md:px-10 lg:px-12">

     

        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
 
            <img src={Logo.src} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

      
        <div className="navbar-center">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full bg-[#29291B] px-4 py-2 text-sm font-bold text-[#C8FF36] transition-colors hover:bg-[#343421]"
            >
              Workouts
            </Link>

            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-[#C8FF36]"
            >
              My Plan
            </Link>
          </div>
        </div>

   
        <div className="navbar-end gap-4 md:gap-7">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-[#C8FF36]"
          >
            <span>Plan</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#C8FF36] px-1.5 text-xs font-bold text-black">
              0
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-[#C8FF36]"
          >
            <span>Saved</span>
            <span className="text-xs font-semibold text-gray-300">0</span>
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
 
