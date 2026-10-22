 
const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#17130F] text-white">
      <div className="mx-auto flex min-h-24 max-w-360 flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row md:px-10 lg:px-12">

   
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C8FF36"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M4 7v10M8 9v6M16 9v6M20 7v10M8 12h8" />
          </svg>

          <span className="text-sm font-black tracking-tight">
            FITLOG
          </span>
        </div>


        <p className="text-center text-xs font-medium tracking-wide text-gray-400 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
 
