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
        <title>
          Welcome to ProgrammingSpot! Find Courses, Important Lectures and More
          at a Very Affordable Cost!
        </title>
      </Head>
      <section data-aos="fade-down" className="lg:w-5/6 mx-auto select-none">
        <div className="rounded-lg carousel h-64 overflow-hidden">
          <img
            alt="content"
            className="object-cover object-center h-full w-full"
            src="splash.jpg"
          />
          <div className="centered">
            <section className="text-gray-300 body-font">
              <section className="main-banner">
                <div className="container">
                  <div className="row">
                    <div className="header-text">
                      <h2 className="inter text-5xl uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                        PROGRAMMING SPOT
                      </h2>
                      <h2 className="inter text-md mt-2 text-green-300">
                        Committed to Excellence
                      </h2>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </section>
      <section data-aos="fade-down" className="text-white bg-gray-800 mt-12 mb-24 rounded-lg lg:w-5/6 mx-auto select-none">
        <h1 className="text-center py-8">
          <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
            Our Services
          </span>
        </h1>
        <div className="container px-12 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2">
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="p-6">
                  <h1 className="title-font inter text-lg font-medium text-white mb-2">
                    Web Development
                  </h1>
                  <p className="poppins text-gray-400 leading-relaxed mb-4">
                    This course is for absolute beginners. In this course, you
                    will be taught about HTML, CSS, JavaScript which are used to
                    code websites.
                  </p>
                  <div className="flex items-center flex-wrap">
                    <Link href="/services">
                      <a
                        style={{ background: "#3763f4" }}
                        className="text-white inter hover:shadow-xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-md text-base mt-4 md:mt-0"
                      >
                        Learn More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2">
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="p-6">
                  <h1 className="title-font inter text-lg font-medium text-white mb-2">
                    Python Beginner to Advance Course
                  </h1>
                  <p className="poppins text-gray-400 leading-relaxed mb-4">
                    This course is a paid course. <br /> In this course, you will learn about Python and some of its modules.
                  </p>
                  <div className="flex items-center flex-wrap">
                    <Link href="/services">
                      <a
                        style={{ background: "#3763f4" }}
                        className="text-white inter hover:shadow-xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-md text-base mt-4 md:mt-0"
                      >
                        Learn More
                      </a>
                    </Link>
                  </div>
                </div>
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
