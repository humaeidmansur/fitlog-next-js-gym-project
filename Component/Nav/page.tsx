"use client";

import Logo from "@/app/logo.ico";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  getStoredWorkouts,
  PLAN_KEY,
  SAVED_KEY,
} from "@/lib/workStorage";

const Navbar = () => {
const pathname = usePathname();
const [planCount, setPlanCount] = useState(0);
const [savedCount, setSavedCount] = useState(0);

const refreshCounts = useCallback(() => {
setPlanCount(getStoredWorkouts(PLAN_KEY).length);
setSavedCount(getStoredWorkouts(SAVED_KEY).length);
}, []);

useEffect(() => {
refreshCounts();

window.addEventListener("storage", refreshCounts);
window.addEventListener("fitlog-storage", refreshCounts);

return () => {
  window.removeEventListener("storage", refreshCounts);
  window.removeEventListener("fitlog-storage", refreshCounts);
};


}, [refreshCounts]);

return ( <header className="border-b border-white/5 bg-[#17130F] text-white"> <nav className="navbar mx-auto min-h-16 max-w-360 px-5 md:px-10 lg:px-12"> <div className="navbar-start"> <Link href="/" className="flex items-center gap-2"> <img src={Logo.src} alt="Logo" className="h-8 w-auto" /> </Link> </div>

    <div className="navbar-center">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            pathname === "/"
              ? "bg-[#29291B] font-bold text-[#C8FF36]"
              : "font-medium text-gray-300 hover:text-[#C8FF36]"
          }`}
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            pathname === "/my-plan"
              ? "bg-[#29291B] font-bold text-[#C8FF36]"
              : "font-medium text-gray-300 hover:text-[#C8FF36]"
          }`}
        >
          My Plan
        </Link>
      </div>
    </div>

    <div className="navbar-end gap-4 md:gap-7">
      <Link
        href="/my-plan"
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
          pathname === "/my-plan"
            ? "text-[#C8FF36]"
            : "text-gray-200 hover:text-[#C8FF36]"
        }`}
      >
        <span>Plan</span>
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#C8FF36] px-1.5 text-xs font-bold text-black">
          {planCount}
        </span>
      </Link>

      <Link
        href="/my-plan"
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
          pathname === "/my-plan"
            ? "text-[#C8FF36]"
            : "text-gray-200 hover:text-[#C8FF36]"
        }`}
      >
        <span>Saved</span>
        <span className="text-xs font-semibold text-gray-300">
          {savedCount}
        </span>
      </Link>
    </div>
  </nav>
</header>

);
};

export default Navbar;
