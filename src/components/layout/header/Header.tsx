import Link from "next/link";
import Navbar from "./Navbar";
import { Globe, Search, CircleHelp, User } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto flex h-18 items-center justify-between">
        <div className="flex items-center gap-14">
          <Link href="/" >
            <Image src="/svgs/logo.svg" alt="Logo" width={120} height={80} />
          </Link>

          <Navbar />
        </div>

        <div className="flex items-center gap-6">
          <button className="cursor-pointer rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
            Contact
          </button>

          <Search size={18} color="black" />

          <Globe size={18} color="black" />

          <CircleHelp size={18} color="black" />

         
        </div>
      </div>
    </header>
  );
}