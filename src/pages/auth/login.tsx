import { Account, MongooseAccount } from "../../interfaces/Account";
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { mongoApi, useGlobalState } from "../../hooks/useGlobalState";

import CryptoJS from "crypto-js";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { ServerError } from "../../interfaces/ServerError";
import firebase from "firebase";
import handleAxiosError from "../../hooks/handleAxiosError";
import { loggedIn } from "../../hooks/loggedIn";
import moment from "moment";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { state, setState } = useGlobalState();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loggedIn(state, setState, false);
  }, [router.pathname]);

  if (state.loggedIn) {
    router.push("/");
  }

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLoading(true);

    axios
      .get(`${mongoApi}/auth`, {
        headers: {
          method: "login",
          email,
          password,
        },
      })
      .then((res: AxiosResponse<MongooseAccount>) => {
        setState({
          ...state,
          account: res.data,
          loggedIn: true,
          expiresOn: moment().add("24", "hours").toString(),
        });

        localStorage.setItem("ACCOUNT_EMAIL", res.data.email);
        localStorage.setItem("ACCOUNT_PASSWORD", res.data.password);

        firebase.analytics().logEvent('login')
      })
      .catch((e: AxiosError<ServerError>) => {
        setLoading(false);
        return handleAxiosError(e);
      });
  };

  return (
    <>
      <Head>
        <title>Login - Programming Spot</title>
      </Head>
      <h1 className="mt-12 text-center">
        <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Login
        </span>
      </h1>
      <form onSubmit={login}>
        <section
          data-aos="fade-down"
          className="text-gray-400 mt-8 mb-12 body-font mx-auto"
        >
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
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
              <div className="p-2 w-1/2">
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
            <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Login
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/auth/signup">
              <span className="cursor-pointer text-blue-600 poppins mt-2">
                Go to Signup
              </span>
            </Link>
          </div>
        </section>
      </form>
    </>
  );
};

export default Login;
