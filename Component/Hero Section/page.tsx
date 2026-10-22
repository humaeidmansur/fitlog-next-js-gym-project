import Image from "next/image";
import Link from "next/link";
import Banner from "@/public/images/banner.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#17130F] text-white">
      <div className="mx-auto grid min-h-130 max-w-360 grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-12 lg:px-20 lg:py-20">
 
        <div className="z-10 flex flex-col items-start">
          <p className="mb-6 text-sm font-extrabold uppercase tracking-wider text-[#C8FF36]">
            Workout Library
          </p>

          <h1 className="max-w-3xl text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-2xl lg:text-5xl">
            Train with intent.Log
            <br /> every set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#9CA3AF] sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="/"
            className="btn mt-8 min-h-12 border-none bg-[#C8FF36] px-8 text-sm font-black uppercase text-[#17130F] shadow-[0_0_20px_rgba(200,255,54,0.15)] transition-all duration-300 hover:scale-105 hover:bg-[#D8FF70]"
          >
            Browse Workouts
          </Link>
        </div>

 
        <div className="relative flex min-h-[300px] items-center justify-center md:min-h-[400px]">
         
          <div className="absolute h-64 w-64 rounded-full bg-[#C8FF36]/5 blur-3xl md:h-96 md:w-96" />

   
          <Image
            src= {Banner.src}
            alt="Athlete performing a gym exercise"
            width={520}
            height={520}
            priority
            className="relative z-10 h-auto max-h-[420px] w-full max-w-[460px] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;