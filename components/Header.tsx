"use client";

import { Link, animateScroll as scroll } from "react-scroll";
import Image from "next/image";
import Nav from "./navbar";
import MobileNav from "./Mobilenav";

const Header = () => {
  return (
    <header className="fixed z-50 w-full bg-transparent py-6 xl:py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* logo */}
        <Link to="/" spy={true} smooth={true} className="cursor-pointer">
          <Image
            src="/icons8-heart-cross-96.png"
            height={54.53}
            width={41.35}
            alt="logo"
          />
        </Link>

        {/* disktop nav */}
        <div className="hidden items-center gap-x-8 xl:flex">
          <Nav />
          <Link
            to="/"
            spy={true}
            smooth={true}
            className="text-md rounded-full bg-blue px-6 py-2 font-medium text-white transition-all hover:bg-blue/80"
          >
            Hire me
          </Link>
        </div>
        {/* mobile nav */}
        <div className="z-50 xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
