import React, { useEffect } from "react";

import Footer from "../../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import firebase from "../../../firebase";
import { loggedIn } from "../../hooks/loggedIn";
import { useGlobalState } from "../../hooks/useGlobalState";
import { useRouter } from "next/router";

const auth = firebase.auth();
const db = firebase.firestore();

const Services: NextPage = () => {
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
          Our Services
        </span>
      </h1>
      <section
        data-aos="fade-down"
        className="text-gray-400 mt-4 mb-12 body-font mx-auto"
      >
        <div className="container px-5 mx-auto">
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
            <div className="w-72 h-72 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 flex-shrink-0">
              <img className="rounded-md" src="javascript.jpg" alt="" />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-white inter text-lg title-font font-medium mb-2 select-none">
                Web Development
              </h2>
              <p className="leading-relaxed text-base select-none">
                This course is for absolute beginners. In this course, you will
                be taught about HTML, CSS, JavaScript which are used to code
                websites. You will make some projects and at the last you will
                make your own portfolio website.
              </p>
              <div className="flex mt-4 items-center flex-wrap">
                <Link href="/pricing">
                  <a
                    style={{ background: "#3763f4" }}
                    className="text-white cursor-pointer inter hover:shadow-2xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-md text-base md:mt-0"
                  >
                    Buy Now
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-white inter text-lg title-font font-medium mb-2 select-none">
                Python Beginner to Advance Course
              </h2>
              <p className="leading-relaxed text-base select-none">
                This course is a paid course. In this course, you will learn
                about Python and some of its modules.
              </p>
              <div className="flex mt-4 items-center flex-wrap">
                <Link href="/pricing">
                  <a
                    style={{ background: "#3763f4" }}
                    className="text-white cursor-pointer inter hover:shadow-2xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-md text-base md:mt-0"
                  >
                    Buy Now
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-72 h-72 order-first sm:order-none sm:ml-10 inline-flex items-center justify-center rounded-full text-indigo-400 flex-shrink-0">
              <img className="rounded-md" src="python.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
