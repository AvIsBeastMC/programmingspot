import React, { useEffect } from "react";

import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import firebase from "../../firebase";
import { loggedIn } from "../hooks/loggedIn";
import moment from "moment";
import { useGlobalState } from "../hooks/useGlobalState";
import { useRouter } from "next/router";

const auth = firebase.auth();
const db = firebase.firestore();

const Home: NextPage = () => {
  const { state, setState } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    loggedIn(state, setState, auth);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>Services - Programming Spot</title>
      </Head>
      <h1 className="text-center">
        <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Pricing
        </span>
      </h1>
      <section data-aos="fade-down" className="text-gray-400 mb-24 body-font overflow-hidden">
        <div className="container px-5 mt-2 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <p className="lg:w-2/3 px-5 mx-auto leading-relaxed text-base">
              Choose a course which you would like to enroll in. It is
              recommended to start with Web Development Course if you are a
              complete beginner.
            </p>
          </div>
          <div className="px-2 flex flex-wrap -m-4">
            <div className="p-4 xl:w-1/2 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-700 flex flex-col relative overflow-hidden">
                <h2 className="poppins text-sm tracking-widest text-gray-400 title-font font-medium">
                  Free Lifetime
                </h2>
                <h1 className="text-5xl inter text-white my-4 border-b border-gray-800 leading-none">
                  Web Development
                </h1>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  Includes Videos as well as Notes of the Concepts.
                </p>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  Live 1:1 Online Class can be done if required.
                </p>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  HTML, CSS, JavaScript are the languages you will learn in this Course.
                </p>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  Projects Included at the end of every course section.
                </p>
                <button className="inter flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                  Buy for ₹0
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 xl:w-1/2 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                <span className="bg-indigo-500 text-white uppercase inter px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  Recommended
                </span>
                <h2 className="poppins text-sm tracking-widest text-gray-400 title-font font-medium">
                  30 Days Free Trial Included
                </h2>
                <h1 className="text-5xl inter text-white my-4 border-b border-gray-800 leading-none">
                  Python Beginner to Advance Course
                </h1>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  Includes Videos as well as Notes of the Concepts.
                </p>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  Live 1:1 Online Class can be done if required.
                </p>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  Python is the language you learn in this course.
                </p>
                <p className="flex items-center text-gray-300 mb-2">
                  <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                  Some Concepts about AI and Machine Learning are also taught.
                </p>
                <button className="inter flex items-center mt-4 text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                  Buy for ₹200/year
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
