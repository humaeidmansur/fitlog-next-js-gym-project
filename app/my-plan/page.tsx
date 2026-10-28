
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  FaClock,
  FaFire,
  FaStar,
  FaCheck,
  FaDumbbell,
} from "react-icons/fa";
import type { Workout } from "../../types/type.js";

type Tab = "today" | "saved";
type SortOption = "duration" | "calories" | "rating" | "name";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function loadWorkouts() {
      try {
        const storedPlan = localStorage.getItem(PLAN_KEY);
        const storedSaved = localStorage.getItem(SAVED_KEY);
        const storedDone = localStorage.getItem(DONE_KEY);

        setPlan(storedPlan ? (JSON.parse(storedPlan) as Workout[]) : []);
        setSaved(storedSaved ? (JSON.parse(storedSaved) as Workout[]) : []);
        setDoneIds(storedDone ? (JSON.parse(storedDone) as number[]) : []);
      } catch {
        setPlan([]);
        setSaved([]);
        setDoneIds([]);
      } finally {
        setReady(true);
      }
    }

    loadWorkouts();

    window.addEventListener("storage", loadWorkouts);
    window.addEventListener("fitlog-storage", loadWorkouts);

    return () => {
      window.removeEventListener("storage", loadWorkouts);
      window.removeEventListener("fitlog-storage", loadWorkouts);
    };
  }, []);

  const activeWorkouts = activeTab === "today" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    return [...activeWorkouts].sort((a, b) => {
      switch (sortBy) {
        case "calories":
          return b.caloriesBurned - a.caloriesBurned;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "duration":
        default:
          return a.duration - b.duration;
      }
    });
  }, [activeWorkouts, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  function removeWorkout(id: number) {
    if (activeTab === "today") {
      const updatedPlan = plan.filter((workout) => workout.id !== id);

      setPlan(updatedPlan);
      localStorage.setItem(PLAN_KEY, JSON.stringify(updatedPlan));

      toast.success("Workout removed from your plan.");
    } else {
      const updatedSaved = saved.filter((workout) => workout.id !== id);

      setSaved(updatedSaved);
      localStorage.setItem(SAVED_KEY, JSON.stringify(updatedSaved));

      toast.success("Removed from saved items.");
    }

    window.dispatchEvent(new Event("fitlog-storage"));
  }

  function addToPlan(workout: Workout) {
    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      toast.error("Already added in your plan!");
      return;
    }

    const updatedPlan = [...plan, workout];

    setPlan(updatedPlan);
    localStorage.setItem(PLAN_KEY, JSON.stringify(updatedPlan));

    window.dispatchEvent(new Event("fitlog-storage"));

    toast.success("Workout added to your plan!");
  }

  function markAsDone(id: number) {
    const isDone = doneIds.includes(id);

    const updatedDoneIds = isDone
      ? doneIds.filter((doneId) => doneId !== id)
      : [...doneIds, id];

    setDoneIds(updatedDoneIds);
    localStorage.setItem(DONE_KEY, JSON.stringify(updatedDoneIds));

    if (isDone) {
      toast.info("Workout is not marked.");
    } else {
      toast.success("Great job! Workout completed!");
    }
  }

  return (
    <main className="min-h-screen bg-[#0E1014] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <section
          aria-label="Workout statistics"
          className="mb-6 grid grid-cols-3 gap-3 sm:gap-5"
        >
          <div className="rounded-xl border border-white/[0.08] bg-[#14171D] p-4 sm:p-6">
            <div className="flex items-center gap-2 text-gray-400">
              <FaDumbbell className="text-sm text-[#C8FF36]" />
              <p className="text-xs font-medium sm:text-sm">Exercises</p>
            </div>

            <p className="mt-3 text-2xl font-black text-[#C8FF36] sm:text-3xl">
              {ready ? plan.length : 0}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#14171D] p-4 sm:p-6">
            <div className="flex items-center gap-2 text-gray-400">
              <FaClock className="text-sm text-[#C8FF36]" />
              <p className="text-xs font-medium sm:text-sm">Minutes</p>
            </div>

            <p className="mt-3 text-2xl font-black sm:text-3xl">
              {ready ? totalMinutes : 0}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#14171D] p-4 sm:p-6">
            <div className="flex items-center gap-2 text-gray-400">
              <FaFire className="text-sm text-[#C8FF36]" />
              <p className="text-xs font-medium sm:text-sm">Calories</p>
            </div>

            <p className="mt-3 text-2xl font-black sm:text-3xl">
              {ready ? totalCalories : 0}
            </p>
          </div>
        </section>

        <div className="mb-5 mt-6 flex flex-wrap items-center justify-between gap-4">
          <div
            className="inline-flex rounded-lg border border-white/[0.06] bg-[#14171D] p-1"
            role="tablist"
            aria-label="Workout collection"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "today"}
              onClick={() => setActiveTab("today")}
              className={`rounded-md px-4 py-2 text-xs transition ${
                activeTab === "today"
                  ? "bg-[#222630] font-bold text-[#C8FF36]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-4 py-2 text-xs transition ${
                activeTab === "saved"
                  ? "bg-[#222630] font-bold text-[#C8FF36]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({ready ? saved.length : 0})
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-400">
            Sort By
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="rounded-lg border border-white/[0.08] bg-[#14171D] px-3 py-2 text-xs text-gray-300 outline-none focus:border-[#C8FF36]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>

        <section
          className="min-h-[250px]"
          aria-label={activeTab === "today" ? "Today's plan" : "Saved workouts"}
        >
          {!ready ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-4">
              <span className="loading loading-bars loading-lg text-[#C8FF36]" />
              <p className="text-sm text-gray-400">Loading workouts…</p>
            </div>
          ) : sortedWorkouts.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#14171D] px-6 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C8FF36]/10">
                <FaDumbbell className="text-2xl text-[#C8FF36]" />
              </div>

              <h2 className="text-xl font-black uppercase tracking-wide sm:text-2xl">
                NOTHING HERE YET
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8FF36] px-5 py-3 text-sm font-extrabold text-black transition hover:bg-lime-300"
              >
                <FaDumbbell />
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sortedWorkouts.map((workout) => {
                const isDone = doneIds.includes(workout.id);

                return (
                  <article
                    key={workout.id}
                    className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#14171E] p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <Link
                        href={`/Workout-Details/${workout.id}`}
                        className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-[#222630] sm:h-24 sm:w-36"
                        aria-label={`View ${workout.name} details`}
                      >
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      <div className="min-w-0">
                        <Link
                          href={`/Workout-Details/${workout.id}`}
                          className="text-base font-black uppercase leading-snug text-white hover:text-[#C8FF36] sm:text-lg"
                        >
                          {workout.name}
                        </Link>

                        <p className="mt-1 text-xs font-medium text-gray-400">
                          {workout.equipment}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-200">
                          <span className="flex items-center gap-1.5 text-lime-300">
                            <FaClock aria-hidden="true" />
                            <span>{workout.duration} min</span>
                          </span>

                          <span className="flex items-center gap-1.5 text-lime-300">
                            <FaFire aria-hidden="true" />
                            <span>{workout.caloriesBurned} kcal</span>
                          </span>

                          <span className="flex items-center gap-1.5 text-lime-300">
                            <FaStar aria-hidden="true" />
                            <span>{workout.rating}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
                      <Link
                        href={`/Workout-Details/${workout.id}`}
                        className="whitespace-nowrap rounded-full border border-sky-300 px-3 py-2 text-xs font-bold text-white transition hover:bg-sky-300/10 sm:px-4 sm:text-sm"
                      >
                        View Details
                      </Link>

                      {activeTab === "today" ? (
                        <button
                          type="button"
                          onClick={() => markAsDone(workout.id)}
                          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-extrabold transition sm:px-4 sm:text-sm ${
                            isDone
                              ? "bg-gray-600 text-white hover:bg-gray-500"
                              : "bg-[#C8FF36] text-black hover:bg-[#d8ff70]"
                          }`}
                        >
                          <FaCheck aria-hidden="true" />
                          {isDone ? "Undo" : "Mark as Done"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToPlan(workout)}
                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#C8FF36] px-3 py-2 text-xs font-extrabold text-black transition hover:bg-[#d8ff70] sm:px-4 sm:text-sm"
                        >
                          <FaDumbbell aria-hidden="true" />
                          Add to Plan
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => removeWorkout(workout.id)}
                        aria-label={`Remove ${workout.name}`}
                        title="Remove workout"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <span className="text-xl leading-none">×</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
