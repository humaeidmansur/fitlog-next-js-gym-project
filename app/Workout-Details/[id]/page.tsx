import Link from "next/link";
import { notFound } from "next/navigation";
import type { Workout } from "../../../Types/type.js";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

async function getWorkout(id: string): Promise<Workout | null> {
try {
const response = await fetch(API_URL, {
cache: "no-store",
});

 
if (!response.ok) {
  throw new Error("Failed to fetch workouts.");
}

const workouts: Workout[] = await response.json();

if (!Array.isArray(workouts)) {
  throw new Error("Invalid workout data.");
}

return workouts.find((workout) => String(workout.id) === id) ?? null;
 

} catch {
return null;
}
}

export default async function WorkoutDetailsPage({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const workout = await getWorkout(id);

if (!workout) {
notFound();
}

return ( <main className="min-h-screen bg-[#17130F] px-5 py-10 text-white sm:px-8 lg:px-12"> <div className="mx-auto max-w-7xl">
 


 
    {/* Main layout */}
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
     
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#211C18]">
        <img
          src={workout.image}
          alt={workout.name}
          className="aspect-square w-full object-cover"
        />
      </div>

      {/* Workout information */}
      <div className="min-w-0">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C8FF36]">
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
          <DetailRow label="Equipment" value={workout.equipment} />
          <DetailRow label="Difficulty" value={workout.difficulty} />
          <DetailRow label="Sets" value={String(workout.sets)} />
          <DetailRow label="Reps" value={workout.reps} />
          <DetailRow label="Duration" value={`${workout.duration} min`} />
          <DetailRow
            label="Calories"
            value={`${workout.caloriesBurned} kcal`}
          />
          <DetailRow
            label="Rating"
            value={`★ ${workout.rating.toFixed(1)}`}
            highlight
            last
          />
        </div>

        {/* Instructions */}
        <section className="mt-7">
          <h2 className="text-lg font-black uppercase tracking-wide">
            Instructions
          </h2>

          {workout.instructions?.length ? (
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex gap-3 text-sm leading-6 text-gray-300"
                >
                  <span className="font-black text-[#C8FF36]">
                    {index + 1}.
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm text-gray-400">
              Instructions are not available for this workout yet.
            </p>
          )}
        </section>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/my-plan"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C8FF36] px-5 py-3 text-sm font-extrabold text-[#17130F] transition hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF36]"
          >
            Add to today&apos;s plan
          </Link>

          <Link
            href="/saved"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#C8FF36] hover:text-[#C8FF36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF36]"
          >
            ♧ Save for later
          </Link>
        </div>
      </div>
    </div>
  </div>
</main>
 

);
}

function DetailRow({
label,
value,
highlight = false,
last = false,
}: {
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
> <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
{label} </span>

 
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
