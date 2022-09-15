import React, { useEffect, useRef, useState } from "react";

import { Account } from "../../interfaces/Account";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import UseAnimations from "react-useanimations";
import firebase from "../../../firebase";
import loading2 from "react-useanimations/lib/loading";
import { loggedIn } from "../../hooks/loggedIn";
import { useGlobalState } from "../../hooks/useGlobalState";
import { useRouter } from "next/router";

const auth = firebase.auth();
const db = firebase.firestore();

const Signup: NextPage = () => {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loggedIn(state, setState, auth);

    if (state.loggedIn) {
      router.push("/");
    }
  }, [router.pathname]);

  const signup = (e: React.FormEvent) => {
    e.preventDefault()
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    setLoading(true);

    try {
      auth.createUserWithEmailAndPassword(email, password).then((user) => {
        const account: Account = {
          name,
          createdOn: Date(),
          services: [],
          orders: [],
        };

        db.collection("accounts")
          .doc(email)
          .set(account)
          .then(() => {
            setLoading(false);
            return router.push("/auth/login");
          });
      });
    } catch (e) {
      setLoading(false);
      alert("An Error Occurred" + e);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Services - Programming Spot</title>
      </Head>
      <h1 className="text-center">
        <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Signup
        </span>
      </h1>
      <form onSubmit={signup}>
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
                    type="password"
                    minLength={6}
                    ref={passwordRef}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full mb-4">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    ref={nameRef}
                    autoComplete="name"
                    maxLength={40}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                {!loading ? (
                  <>
                    <button
                      type="submit"
                      className="poppins flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Signup
                    </button>
                    <h1 className="text-center mt-2">
                      <Link href="/auth/login">
                        <a className="text-indigo-300 hover:text-indigo-400">
                          Go to Login
                        </a>
                      </Link>
                    </h1>
                  </>
                ) : (
                  <>
                    <UseAnimations
                      animation={loading2}
                      size={56}
                      style={{ padding: 100 }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Signup;
