
import { FaDumbbell } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#17130F] text-white">
      <div className="mx-auto flex min-h-24 max-w-360 flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row md:px-10 lg:px-12">
        <div className="flex items-center gap-2">
          <FaDumbbell
            className="h-5 w-5 text-[#C8FF36]"
            aria-hidden="true"
          />

          <span className="text-sm font-black tracking-tight">
            FITLOG
          </span>
        </div>

        <p className="text-center text-xs font-medium tracking-wide text-gray-400 sm:text-right">
          © 2026 FitLog - Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

