import { Account, MongooseAccount } from "../../interfaces/Account";
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { mongoApi, useGlobalState } from "../../hooks/useGlobalState";

import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { ServerError } from "../../interfaces/ServerError";
import UseAnimations from "react-useanimations";
import handleAxiosError from "../../hooks/handleAxiosError";
import loading2 from "react-useanimations/lib/loading";
import { loggedIn } from "../../hooks/loggedIn";
import moment from "moment";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // loggedIn(state, setState, auth);
    // if (state.loggedIn) {
    //   router.push("/");
    // }
  }, [router.pathname]);

  const signup = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    setLoading(true);

    axios
      .get(`${mongoApi}/auth`, {
        headers: {
          method: "signup",
          email,
          password,
          name,
        },
      })
      .then((res) => {
        return router.push("/auth/login");
      })
      .catch((e: AxiosError<ServerError>) => {
        return handleAxiosError(e);
      });
  };

  return (
    <>
      <Head>
        <title>Services - Programming Spot</title>
      </Head>
      <h1 className="mt-12 text-center">
        <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Signup
        </span>
      </h1>
      <form onSubmit={signup}>
        <section
          data-aos="fade-down"
          className="text-gray-400 mt-8 mb-12 body-font mx-auto"
        >
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/3">
                <div className="relative">
                  <input
                    type="name"
                    required
                    ref={nameRef}
                    placeholder="Name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    ref={emailRef}
                    placeholder="Email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/3">
                <div className="relative">
                  <input
                    type="password"
                    required
                    ref={passwordRef}
                    placeholder="Password"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 mt-4 w-full">
            <button
              type="submit"
              className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Signup
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/auth/login">
              <span className="cursor-pointer text-blue-600 poppins mt-2">
                Go to Login
              </span>
            </Link>
          </div>
        </section>
      </form>
    </>
  );
};

export default Signup;
