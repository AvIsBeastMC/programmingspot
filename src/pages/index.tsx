import React, { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { MongooseService } from "../interfaces/Service";
import { NextPage } from "next";
import UseAnimations from "react-useanimations";
import firebase from "../../firebase";
import getServices from "../hooks/getServices";
import infinity from "react-useanimations/lib/infinity";
import { loggedIn } from "../hooks/loggedIn";
import moment from "moment";
import { useGlobalState } from "../hooks/useGlobalState";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getServices(state, setState, setLoaded);
    // firebase.analytics().logEvent('page_view')
  }, []);

  return (
    <>
      <Head>
        <title>
          Welcome to ProgrammingSpot! Find Courses, Important Lectures and More
          at a Very Affordable Cost!
        </title>
      </Head>
      <section
        data-aos="fade-down"
        className="mt-12 lg:w-5/6 mx-auto select-none"
      >
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
                        Promoting Computer Literacy
                      </h2>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </section>
      <section
        data-aos="fade-down"
        className="text-white bg-blue-200 mt-12 mb-24 rounded-lg lg:w-5/6 mx-auto select-none"
      >
        <h1 className="text-center py-8">
          <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-700">
            Our Services
          </span>
        </h1>
        <div className="container px-12 mx-auto">
          {!loaded ? (
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UseAnimations className="mb-8" animation={infinity} size={40} />
          </div>
          ) : <></>}
          <div className="flex flex-wrap -m-4 pb-8">
            {loaded ? (
              <>
                {state.services.map((service) => (
                  <div className="p-4 md:w-1/2">
                    <div className="h-full rounded-lg overflow-hidden">
                      <div className="p-6">
                        <h1 className="title-font inter text-lg font-medium text-black mb-2">
                          {service.name}
                        </h1>
                        <p className="poppins text-gray-700 leading-relaxed mb-4">
                          {service.description}
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
                ))}
                {state.services.length === 0 ? (
                  <h1 className="inter py-4 text-red-400 text-center text-xl">
                    No Services Available for Purchase
                  </h1>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
