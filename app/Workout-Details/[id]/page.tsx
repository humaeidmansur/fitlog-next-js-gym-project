"use client";

import { Suspense, useEffect, useState } from "react";
import {
  addWorkout,
  isWorkoutStored,
  PLAN_KEY,
  SAVED_KEY,
} from "@/lib/workStorage";
import { notFound, useParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  FaCheck,
  FaClock,
  FaDumbbell,
  FaFire,
  FaStar,
  FaBookmark,
} from "react-icons/fa";
import type { Workout } from "../../../Types/type.js";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export default function WorkoutDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#17130F]" />}>
      <WorkoutDetailsContent />
    </Suspense>
  );
}

function WorkoutDetailsContent() {
  const params = useParams();
  const id = String(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToPlan, setAddedToPlan] = useState(false);
  const [savedForLater, setSavedForLater] = useState(false);

  useEffect(() => {
    let active = true;

    async function getWorkout() {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (response.status === 404) {
          if (active) setWorkout(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const foundWorkout: Workout = await response.json();

        if (
          !foundWorkout ||
          String(foundWorkout.id) !== id
        ) {
          if (active) setWorkout(null);
          return;
        }

        if (!active) return;

        setWorkout(foundWorkout);
        setAddedToPlan(isWorkoutStored(PLAN_KEY, foundWorkout.id));
        setSavedForLater(isWorkoutStored(SAVED_KEY, foundWorkout.id));
      } catch {
        if (active) {
          toast.error("Unable to load workout details.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    setLoading(true);
    setWorkout(null);
    getWorkout();

    return () => {
      active = false;
    };
  }, [id]);

  function handleAddToPlan() {
    if (!workout) return;

    if (isWorkoutStored(PLAN_KEY, workout.id)) {
      setAddedToPlan(true);
      toast.info("Workout is already in your plan!");
      return;
    }

    addWorkout(PLAN_KEY, workout);
    setAddedToPlan(true);
    toast.success("Workout added to your plan!");
  }

  function handleSaveForLater() {
    if (!workout) return;

    if (isWorkoutStored(SAVED_KEY, workout.id)) {
      setSavedForLater(true);
      toast.info("Workout is already saved!");
      return;
    }

    addWorkout(SAVED_KEY, workout);
    setSavedForLater(true);
    toast.success("Workout saved for later!");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#17130F] text-[#C8FF36]">
        <div className="flex items-center gap-3">
          <span className="loading loading-spinner loading-lg" />
          <span className="text-sm font-bold">
            Loading workout details...
          </span>
        </div>
      </main>
    );
  }

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#17130F] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#211C18]">
            <img
              src={workout.image}
              alt={workout.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C8FF36]">
              <FaDumbbell />
              Workout Details
            </p>

            <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
              {workout.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#C8FF36] px-4 py-1.5 text-xs font-black uppercase text-[#17130F]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#211C18]">
              <DetailRow
                icon={<FaDumbbell />}
                label="Equipment"
                value={workout.equipment}
              />

              <DetailRow
                icon={<FaDumbbell />}
                label="Difficulty"
                value={workout.difficulty}
              />

              <DetailRow
                icon={<FaCheck />}
                label="Sets"
                value={String(workout.sets)}
              />

              <DetailRow
                icon={<FaCheck />}
                label="Reps"
                value={workout.reps}
              />

              <DetailRow
                icon={<FaClock />}
                label="Duration"
                value={`${workout.duration} min`}
              />

              <DetailRow
                icon={<FaFire />}
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <DetailRow
                icon={<FaStar />}
                label="Rating"
                value={workout.rating.toFixed(1)}
                highlight
                last
              />
            </div>

            <section className="mt-7">
              <h2 className="text-lg font-black uppercase tracking-wide">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions?.map((instruction, index) => (
                  <li
                    key={`${index}-${instruction}`}
                    className="flex gap-3 text-sm leading-6 text-gray-300"
                  >
                    <span className="mt-1 text-[#C8FF36]">
                      <FaCheck size={12} />
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToPlan}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8FF36] px-5 py-3 text-sm font-extrabold text-[#17130F] transition hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF36]"
              >
                {addedToPlan ? <FaCheck /> : <FaDumbbell />}
                Add to today's plan
              </button>

              <button
                type="button"
                onClick={handleSaveForLater}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#C8FF36] hover:text-[#C8FF36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF36]"
              >
                {savedForLater ? <FaCheck /> : <FaBookmark />}
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailRow({
  icon,
  label,
  value,
  highlight = false,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-5 py-4 ${
        last ? "" : "border-b border-white/5"
      }`}
    >
      <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-gray-400">
        <span className="text-[#C8FF36]">{icon}</span>
        {label}
      </span>

      <span
        className={`text-right text-sm font-semibold ${
          highlight ? "text-[#C8FF36]" : "text-gray-200"
        }`}
      >
        {value}
      </span>
    </div>
  );
}