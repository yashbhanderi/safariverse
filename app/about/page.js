import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to SafariVerse
        </h1>

        <div className="space-y-8">
          <p>
            Where untamed wilderness meets sustainable adventure. Hidden deep
            within nature&apos;s embrace, SafariVerse offers an immersive escape
            into the heart of the wild. But it&apos;s not just about the safari
            lodges—it&apos;s about the experience of reconnecting with nature,
            witnessing majestic wildlife, and embracing the rhythms of the
            natural world.
          </p>
          <p>
            Our eco-friendly lodges provide a comfortable retreat, but the real
            magic lies beyond their walls. Embark on guided safaris through
            breathtaking landscapes, hear the distant roar of a lion at dusk,
            and gaze at a sky ablaze with stars from the warmth of a bonfire.
          </p>
          <p>
            This is where unforgettable moments are made—surrounded by the
            wonders of nature, where every sunrise brings new adventures and
            every nightfall tells a story of the wild.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={image1}
          alt="safari"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="relative aspect-square col-span-2">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover"
          alt="Family that manages SafariVerse"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          A Legacy of Conservation & Hospitality since 2002
        </h1>

        <div className="space-y-8">
          <p>
            Since its founding, SafariVerse has been more than just a
            destination—it&apos;s been a family-driven mission to preserve and
            share the beauty of the wild. What began as a humble safari retreat
            has evolved into a sanctuary dedicated to responsible tourism and
            conservation.
          </p>
          <p>
            Through generations, we have upheld our commitment to protecting
            wildlife while offering travelers an authentic and enriching
            experience. Here, you&apos;re not just a visitor; you&apos;re part of a
            journey to explore, respect, and safeguard the natural world. Join
            us at SafariVerse, where adventure, sustainability, and heartfelt
            hospitality come together for an experience like no other.
          </p>

          <div>
            <Link
              href="/camps"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury camps
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
