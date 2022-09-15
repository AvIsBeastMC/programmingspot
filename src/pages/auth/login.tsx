import React, { useEffect, useRef } from "react";

import { Account } from "../../interfaces/Account";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import firebase from "../../../firebase";
import { loggedIn } from "../../hooks/loggedIn";
import moment from "moment";
import { useGlobalState } from "../../hooks/useGlobalState";
import { useRouter } from "next/router";

const auth = firebase.auth();
const db = firebase.firestore();

const Login: NextPage = () => {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loggedIn(state, setState, auth);

    if (state.loggedIn) {
      router.push("/");
    }
  }, [router.pathname]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        db.collection("accounts")
          .doc(user.email)
          .get()
          .then((account) => {
            setState({
              account: account.data() as Account,
              expiresOn: moment(Date()).add(24, "hours").toString(),
              loggedIn: true,
            });
            return router.push("/");
          })
          .catch((e) => {
            alert(e);
          });
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Head>
        <title>Login - Programming Spot</title>
      </Head>
      <h1 className="text-center">
        <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Login
        </span>
      </h1>
      <form onSubmit={login}>
        <section
          data-aos="fade-down"
          className="text-gray-400 mt-4 mb-12 body-font mx-auto"
        >
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    autoComplete="email"
                    required
                    type="email"
                    ref={emailRef}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    ref={passwordRef}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="poppins flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Login
                </button>
                <h1 className="text-center mt-2">
                  <Link href="/auth/signup">
                    <a className="text-indigo-300 hover:text-indigo-400">Go to Signup</a>
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Login;
