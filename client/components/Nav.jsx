'use client';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Nav = () => {
    const [nav, setNav] = useState(false);
    const links = [
      {
        id: 1,
        link: "About",
        path: "/"
      },
      {
        id: 2,
        link: "Model",
        path: "/stock"
      },
      {
        id: 3,
        link: "Github",
        path: "/"
      }
    ];
  
    return (
      <div className="z-10 flex justify-between items-center w-full h-20 px-4 text-black bg-white fixed nav">
        <div>
          {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
          <h1 className="text-2xl font-signature ml-2 inline-block bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent font-bold">
            <a
              className="link-underline link-underline-black"
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              TradeSense
            </a>
          </h1>
        </div>
        <ul className="hidden md:flex">
        <p className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline">
          <a
            className="link-underline link-underline-black"
            href="/"
            rel="noreferrer"
          >
            Home
          </a>
        </p>
        <p className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline">
          <a
            className="link-underline link-underline-black"
            href="/stock"
            rel="noreferrer"
          >
            Model
          </a>
        </p>
        <p className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline">
          <a
            className="link-underline link-underline-black"
            href="/stock"
            rel="noreferrer"
          >
            Github
          </a>
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