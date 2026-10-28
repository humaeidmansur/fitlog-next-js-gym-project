import type { Workout } from "@/types/type";

export const PLAN_KEY = "fitlog-plan";
export const SAVED_KEY = "fitlog-saved";

export function getStoredWorkouts(key: string): Workout[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as Workout[]) : [];
  } catch {
    return [];
  }
}

export function addWorkout(
  key: string,
  workout: Workout
): Workout[] {
  const current = getStoredWorkouts(key);

  // Prevent duplicate workouts
  if (current.some((item) => item.id === workout.id)) {
    return current;
  }

  const updated = [...current, workout];

  localStorage.setItem(key, JSON.stringify(updated));

  window.dispatchEvent(new Event("fitlog-storage"));

  return updated;
}

export function removeWorkout(
  key: string,
  id: number
): Workout[] {
  const updated = getStoredWorkouts(key).filter(
    (workout) => workout.id !== id
  );

  localStorage.setItem(key, JSON.stringify(updated));

  window.dispatchEvent(new Event("fitlog-storage"));

  return updated;
}

export function isWorkoutStored(
  key: string,
  id: number
): boolean {
  return getStoredWorkouts(key).some(
    (workout) => workout.id === id
  );
}