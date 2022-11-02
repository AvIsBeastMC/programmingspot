import React, { useCallback, useEffect, useState } from "react";

import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { MongooseService } from "../interfaces/Service";
import { NextPage } from "next";
import Script from "next/script";
import UseAnimations from "react-useanimations";
import getServices from "../hooks/getServices";
import infinity from "react-useanimations/lib/infinity";
import { loggedIn } from "../hooks/loggedIn";
import moment from "moment";
import { useGlobalState } from "../hooks/useGlobalState";
import { useNewOrder } from "../hooks/order";
import { useRouter } from "next/router";

const Pricing: NextPage = () => {
  const { state, setState } = useGlobalState();
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getServices(state, setState, setLoaded, true);
  }, [router.pathname]);

  const checkAccountService = (service: MongooseService): boolean => {
    if (!state.loggedIn) return false;

    const accountServicesId = state.account.services.map(
      (accService) => accService.servId
    );

    const i = accountServicesId.findIndex((x) => x === service._id);

    if (i !== -1 && moment(state.account.services[i].expiresOn).isAfter()) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Head>
        <title>Pricing - Programming Spot</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" />
      </Head>
      <h1 className="mt-12 text-center">
        <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-700">
          Pricing
        </span>
      </h1>
      <section className="text-gray-700 mb-24 body-font overflow-hidden">
        <div className="container px-5 mt-2 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <p className="lg:w-2/3 px-5 mx-auto leading-relaxed text-base">
              Choose a course which you would like to enroll in. It is
              recommended to start with Web Development Course if you are a
              complete beginner.
            </p>
          </div>
          {!loaded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UseAnimations animation={infinity} size={40} />
            </div>
          ) : null}
          {loaded ? (
            <div className="px-2 flex flex-wrap -m-4">
              <>
                {state.services.map((service, i) => (
                  <div key={i} data-aos="fade-down" className="p-4 w-full">
                    <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                      <span className="bg-indigo-500 text-white uppercase inter px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                        Recommended
                      </span>
                      <h1 className="text-5xl inter text-black my-4 leading-none">
                        {service.name}
                      </h1>
                      <p className="flex items-center text-gray-700 mb-2">
                        {service.description}
                      </p>
                      {service.points.map((point) => (
                        <p className="flex items-center text-gray-700 mb-2">
                          <i className="bi bi-check2-circle mr-2 text-blue-500"></i>
                          {point}
                        </p>
                      ))}
                      {checkAccountService(service) ? (
                        <h1>You already have this!</h1>
                      ) : (
                        <button
                          onClick={() =>
                            useNewOrder(service, state, setState, router)
                          }
                          className="inter flex items-center mt-4 text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
                        >
                          Buy for ₹{service.price / 100}
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
                      )}
                    </div>
                  </div>
                ))}
              </>
            </div>
          ) : null}
        </div>
        {state.services.length === 0 ? (
                  <h1 className="inter py-4 text-red-400 text-center text-xl">
                    No Services Available for Purchase
                  </h1>
                ) : (
                  <></>
                )}
      </section>
      {loaded && state.services.length ? <Footer /> : null}
    </>
  );
};

export default Pricing;
