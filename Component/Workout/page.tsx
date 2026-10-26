"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaClock, FaFire, FaStar, FaRedoAlt, FaDumbbell } from "react-icons/fa";
import { toast } from "react-toastify";
import type { Workout } from "../../Types/type.js";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
const [workouts, setWorkouts] = useState<Workout[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

async function fetchWorkouts() {
try {
setLoading(true);
setError("");


  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts.");
  }

  const data: Workout[] = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The API returned an unexpected response.");
  }

  setWorkouts(data);
} catch {
  setError(
    "Unable to load workouts. Please check your connection and try again."
  );
  toast.error("Unable to load workouts. Please try again.");
} finally {
  setLoading(false);
}


}

useEffect(() => {
fetchWorkouts();
}, []);

return ( <section
   id="library"
   className="min-h-screen bg-[#17130F] px-5 py-14 text-white sm:px-8 lg:px-12"
 > <div className="mx-auto max-w-7xl"> <div className="mb-9"> <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
The Library </h2> <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
Twelve lifts covering every major muscle group. </p> </div>

    {loading && (
      <div
        className="flex min-h-64 items-center justify-center gap-3"
        role="status"
        aria-live="polite"
      >
        <span className="loading loading-spinner loading-lg text-[#C8FF36]" />
        <p className="text-sm text-gray-400">Loading workouts...</p>
      </div>
    )}

    {!loading && error && (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
        <FaDumbbell className="text-4xl text-[#C8FF36]" />
        <p className="max-w-md text-sm text-red-400">{error}</p>
        <button
          type="button"
          onClick={fetchWorkouts}
          className="inline-flex items-center gap-2 rounded-xl bg-[#C8FF36] px-5 py-3 text-sm font-bold text-[#17130F] transition hover:bg-lime-300"
        >
          <FaRedoAlt />
          Try Again
        </button>
      </div>
    )}

    {!loading && !error && workouts.length === 0 && (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
        <FaDumbbell className="text-4xl text-[#C8FF36]" />
        <p className="text-sm text-gray-400">
          No workouts are available right now.
        </p>
      </div>
    )}

    {!loading && !error && workouts.length > 0 && (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <Link
            key={workout.id}
            href={`/Workout-Details/${workout.id}`}
            aria-label={`View details for ${workout.name}`}
            className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF36]"
          >
            <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#211C18] transition duration-300 hover:-translate-y-1 hover:border-[#C8FF36]/50 hover:shadow-xl hover:shadow-black/20">
              <div className="relative aspect-video overflow-hidden bg-[#302820]">
                <img
                  src={workout.image}
                  alt={workout.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#17130F]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {workout.difficulty}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-[#C8FF36] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#17130F]"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-black uppercase leading-snug tracking-wide sm:text-xl">
                  {workout.name}
                </h3>

                <p className="mt-2 min-h-5 text-sm text-gray-400">
                  {workout.equipment}
                </p>

                <div className="my-5 border-t border-white/10" />

                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaClock
                      className="h-4 w-4 text-[#C8FF36]"
                      aria-hidden="true"
                    />
                    <span>{workout.duration} min</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaFire
                      className="h-4 w-4 text-[#C8FF36]"
                      aria-hidden="true"
                    />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <FaStar
                      className="h-4 w-4 text-[#C8FF36]"
                      aria-hidden="true"
                    />
                    <span>{workout.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-white/5 bg-[#17130F] px-4 py-3">
                  <span className="text-xs font-medium text-gray-400">
                    Sets
                  </span>

                  <span className="text-sm font-bold text-white">
                    {workout.sets}
                  </span>

                  <span className="mx-2 h-5 border-l border-white/10" />

                  <span className="text-xs font-medium text-gray-400">
                    Reps
                  </span>

                  <span className="text-sm font-bold text-[#C8FF36]">
                    {workout.reps}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    )}
  </div>
</section>


);
}
