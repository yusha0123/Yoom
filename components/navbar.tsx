import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobile-nav";

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex justify-between items-center w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          YOOM
        </p>
      </Link>
      <div className="flex gap-5">
        {/* clerk user auth */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
