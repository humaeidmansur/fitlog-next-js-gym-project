import Link from "next/link";
import "./globals.css";
import { FaDumbbell, FaHome, FaArrowRight, FaBolt } from "react-icons/fa";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="m-0 bg-[#11100D] text-white antialiased">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8FF36]/[0.06] blur-[120px]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8FF36]/40 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <header className="mb-16 flex items-center justify-between">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C8FF36] text-[#11100D] transition-transform group-hover:rotate-[-8deg]">
                  <FaDumbbell className="text-xl" />
                </div>

                <div>
                  <p className="text-lg font-black uppercase tracking-[0.16em]">
                    FIT<span className="text-[#C8FF36]">LOG</span>
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500">
                    Train with purpose
                  </p>
                </div>
              </Link>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Error 404
              </span>
            </header>

            <section className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
              <div className="order-2 text-center md:order-1 md:text-left">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C8FF36]/20 bg-[#C8FF36]/[0.06] px-4 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#C8FF36]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C8FF36]">
                    Looks like you missed a rep
                  </span>
                </div>

                <h1 className="text-[100px] font-black leading-[0.8] tracking-[-0.09em] sm:text-[140px] lg:text-[170px]">
                  4<span className="text-[#C8FF36]">0</span>4
                </h1>

                <h2 className="mt-8 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                  This page is
                  <br />
                  <span className="text-[#C8FF36]">out of the game.</span>
                </h2>

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400 md:mx-0">
                  The page you are looking for couldn't be found. It may have
                  moved, been removed, or never existed. Don't let that stop
                  your progress.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                  <Link
                    href="/"
                    className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-[#C8FF36] px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-[#11100D] transition duration-300 hover:-translate-y-1 hover:bg-lime-300"
                  >
                    {/* <FaHome className="text-sm" /> */}
                    Click & Reload
                    {/* <FaArrowRight className="transition-transform group-hover:translate-x-1" /> */}
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-white transition duration-300 hover:border-[#C8FF36]/40 hover:bg-white/[0.06]"
                  >
                    <FaDumbbell className="text-[#C8FF36]" />
                    Explore Workouts
                  </Link>
                </div>

                <div className="mt-10 flex items-center justify-center gap-3 md:justify-start">
                  <FaBolt className="text-[#C8FF36]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Train smart. Stay consistent.
                  </p>
                </div>
              </div>

              <div className="order-1 flex justify-center md:order-2">
                <div className="relative flex aspect-square w-full max-w-[360px] items-center justify-center sm:max-w-[420px]">
                  <div className="absolute inset-[8%] rounded-full border border-white/[0.06]" />

                  <div className="absolute inset-[18%] rounded-full border border-dashed border-[#C8FF36]/20" />

                  <div className="absolute inset-[28%] rounded-full bg-[#C8FF36]/[0.04] blur-2xl" />

                  <div className="relative flex h-44 w-44 rotate-[-12deg] items-center justify-center rounded-[2rem] border border-[#C8FF36]/20 bg-gradient-to-br from-[#292B1C] to-[#171612] shadow-[0_0_100px_rgba(200,255,54,0.08)] sm:h-56 sm:w-56">
                    <FaDumbbell className="text-7xl text-[#C8FF36] drop-shadow-[0_0_25px_rgba(200,255,54,0.25)] sm:text-8xl" />

                    <span className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#211F19] text-sm font-black text-white shadow-xl">
                      ?
                    </span>
                  </div>

                  <div className="absolute right-[3%] top-[18%] rounded-xl border border-white/10 bg-[#1B1915]/90 px-4 py-3 backdrop-blur-md">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                      Status
                    </p>
                    <p className="mt-1 text-xs font-black text-[#C8FF36]">
                      NOT FOUND
                    </p>
                  </div>

                  <div className="absolute bottom-[14%] left-[1%] rounded-xl border border-white/10 bg-[#1B1915]/90 px-4 py-3 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                        Route unavailable
                      </p>
                    </div>
                  </div>

                  <span className="absolute left-[15%] top-[17%] h-2 w-2 rounded-full bg-[#C8FF36]/70" />
                  <span className="absolute bottom-[22%] right-[13%] h-3 w-3 rounded-full border border-[#C8FF36]/50" />
                </div>
              </div>
            </section>

            <footer className="mt-16 border-t border-white/[0.08] pt-6">
              <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600">
                  © 2026 FITLOG
                </p>

                <p className="text-[10px] font-medium tracking-wide text-gray-600">
                  Every setback is a setup for a comeback.
                </p>
              </div>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
