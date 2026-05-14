import Link from "next/link";
import Navbar from "./Navbar";
import {
  Globe,
  Search,
  CircleHelp,
  User,
} from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-14">
          <Link href="/">
            <Image
              src="/svgs/logo.svg"
              alt="Logo"
              width={120}
              height={80}
            />
          </Link>

          <Navbar />
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="bg-blue cursor-pointer rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Contact
          </Link>

          {/* <Search
            size={18}
            color="black"
          /> */}
          {/* 
          <Globe
            size={18}
            color="black"
          /> */}

          <Link href="/support">
            <CircleHelp
              size={18}
              color="black"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
