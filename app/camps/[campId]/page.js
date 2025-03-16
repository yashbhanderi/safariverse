import Camp from "@/app/_components/Camp";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCamp, getCamps } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateStaticParams() {
  const camps = await getCamps();
  return camps.map((camp) => ({ campId: String(camp.id) }));
}

export async function generateMetadata(context) {
  const params = await context.params;
  const { campId } = params;
  const camp = await getCamp(campId);
  return { title: `Camp ${camp.name}` };
}

export default async function Page(context) {
  const params = await context.params;
  const { campId } = params;
  const camp = await getCamp(campId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Camp camp={camp} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {camp.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation camp={camp} />
        </Suspense>
      </div>
    </div>
  );
}
