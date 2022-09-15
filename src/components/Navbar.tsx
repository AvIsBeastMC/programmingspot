import Link from "next/link";
import { NavLink } from "./NavLink";
import React from "react";
import { useGlobalState } from "../hooks/useGlobalState";

const Navbar: React.FC = () => {
  const { state, setState } = useGlobalState();
  return (
    <header
      className="text-gray-600 shadow-xl sticky sm:flex top-0 z-50 body-font transition-all mb-12"
      style={{ background: "#2d2c38" }}
    >
      <div className="container mx-auto px-14 flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="select-none flex title-font font-medium items-center mb-4 md:mb-0">
            <img src="/programmingspotlogo.png" width={50} alt="" />
            <span className="poppins ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400">
              ProgrammingSpot
            </span>
          </a>
        </Link>
        <nav className="text-gray-400 inter md:ml-auto flex flex-wrap items-center text-base justify-center">
          <NavLink href="/" title="Home" />
          <NavLink href="/services" title="Services" />
          <NavLink href="/pricing" title="Pricing" />
          <NavLink href="/contact" title="Contact" />
        </nav>
        {!state.loggedIn ? (
          <Link href="/auth/login">
            <a
              style={{ background: "#3763f4" }}
              className="text-white inter hover:shadow-xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-xl text-base mt-4 md:mt-0"
            >
              Login
            </a>
          </Link>
        ) : (
          <Link href="/dashboard">
            <a
              style={{ background: "#3763f4" }}
              className="text-white inter hover:shadow-xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-xl text-base mt-4 md:mt-0"
            >
              Welcome {state.account.name.split(" ")[0]}!
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
