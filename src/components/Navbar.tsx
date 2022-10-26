import Link from "next/link";
import { NavLink } from "./NavLink";
import React from "react";
import { useGlobalState } from "../hooks/useGlobalState";

const Navbar: React.FC = () => {
  const { state, setState } = useGlobalState();
  return (
    <header
      className=" bg-blue-200 shadow-xl sticky sm:flex top-0 z-50 body-font transition-all"
    >
      <div className="container transition-all mx-auto px-14 flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="select-none flex title-font font-medium items-center mb-4 md:mb-0">
            <img src="/programmingspotlogo.png" width={50} alt="" />
            <span className="poppins ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-700">
              ProgrammingSpot
            </span>
          </a>
        </Link>
        <nav className="text-gray-800 inter md:ml-auto flex flex-wrap items-center text-base justify-center">
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
