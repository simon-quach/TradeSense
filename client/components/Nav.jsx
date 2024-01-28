"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Nav = () => {
  const [nav, setNav] = useState(false);

  return (
    <div className="z-10 flex justify-between items-center w-full h-20 px-4 text-black bg-white nav border-b">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-2xl font-signature ml-2 inline-block bg-gradient-to-r from-[#2865EC] to-[#5EA4F9] bg-clip-text text-transparent font-bold">
          <Link className="link-underline link-underline-black" href="/">
            TradeSense
          </Link>
        </h1>
      </div>
      <ul className="hidden md:flex">
        <p className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline">
          <Link href="/">Home</Link>
        </p>
        <p className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline">
          <Link className="link-underline link-underline-black" href="/">
            Model
          </Link>
        </p>
        <p className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline">
          <Link
            className="link-underline link-underline-black"
            href="https://github.com/simon-quach/TradeSense"
            target="_blank"
          >
            Github
          </Link>
        </p>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </ul>
    </div>
  );
};

export default Nav;
