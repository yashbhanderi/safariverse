import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-4 z-50">
      <div className="relative h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
        <Image
          src={logo}
          fill
          sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
          className="object-contain"
          quality={100}
          priority
          alt="SafariVerse logo"
        />
      </div>
      <span className="text-lg sm:text-xl font-semibold text-primary-100 whitespace-nowrap">
        SafariVerse
      </span>
    </Link>
  );
}

export default Logo;