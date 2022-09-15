import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <>
      <h1 className="text-center">
        <i className="bi bi-exclamation-triangle text-6xl text-white" />
      </h1>
      <div className="text-center text-5xl font-bold inter mt-3 text-gray-300">
        Error
      </div>
      <div className="text-center text-2xl font-bold inter mt-2 text-gray-400">
        Page not Found
      </div>
      <h1 className="text-center">
        <Link href="/">
          <a className="text-indigo-400 hover:text-indigo-300">Go back to Home Page</a>
        </Link>
      </h1>
    </>
  );
};

export default Custom404;
