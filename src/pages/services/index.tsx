import React, { useEffect, useState } from "react";

import Footer from "../../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { MongooseService } from "../../interfaces/Service";
import { NextPage } from "next";
import UseAnimations from "react-useanimations";
import getServices from "../../hooks/getServices";
import infinity from "react-useanimations/lib/infinity";
import { loggedIn } from "../../hooks/loggedIn";
import moment from "moment";
import { useGlobalState } from "../../hooks/useGlobalState";
import { useRouter } from "next/router";

const Services: NextPage = () => {
  const { state, setState } = useGlobalState();
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getServices(state, setState, setLoaded);
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
        <title>Services - Programming Spot</title>
      </Head>
      <h1 className="mt-12 text-center">
        <span className="font-bold inter text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-700">
          Our Services
        </span>
      </h1>
      <section className="text-gray-400 mt-4 mb-12 body-font mx-auto">
        <div className="container px-5 mx-auto">
          {loaded ? (
            <>
              {state.services.map((service, i) => (
                <>
                  {i % 2 ? (
                    <div
                      data-aos="fade-down"
                      className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col"
                    >
                      <div className="w-72 h-72 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 flex-shrink-0">
                        <img
                          className="rounded-md"
                          src={service.titleImage}
                          alt=""
                        />
                      </div>
                      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-black inter text-lg title-font font-medium mb-2 select-none">
                          {service.name}
                        </h2>
                        <p className="leading-relaxed text-gray-700 text-base select-none">
                          {service.description}
                        </p>
                        <div className="flex mt-4 items-center flex-wrap">
                          {checkAccountService(service) ? (
                            <Link href={`/services/${service._id}`}>
                              <a className="text-indigo-500 hover:text-indigo-600 inline-flex items-center ">
                                Learn
                                <svg
                                  className="w-4 h-4 ml-2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="M5 12h14"></path>
                                  <path d="M12 5l7 7-7 7"></path>
                                </svg>
                              </a>
                            </Link>
                          ) : (
                            <Link href="/pricing">
                              <a
                                style={{ background: "#3763f4" }}
                                className="text-white cursor-pointer inter hover:shadow-2xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-md text-base md:mt-0"
                              >
                                Buy Now (₹{service.price / 100}/year)
                              </a>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-black inter text-lg title-font font-medium mb-2 select-none">
                          {service.name}
                        </h2>
                        <p className="leading-relaxed text-gray-700 text-base select-none">
                          {service.description}
                        </p>
                        <div className="flex mt-4 items-center flex-wrap">
                        {checkAccountService(service) ? (
                            <Link href={`/services/${service._id}`}>
                              <a className="text-indigo-500 hover:text-indigo-600 inline-flex items-center ">
                                Learn
                                <svg
                                  className="w-4 h-4 ml-2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="M5 12h14"></path>
                                  <path d="M12 5l7 7-7 7"></path>
                                </svg>
                              </a>
                            </Link>
                          ) : (
                            <Link href="/pricing">
                              <a
                                style={{ background: "#3763f4" }}
                                className="text-white cursor-pointer inter hover:shadow-2xl inline-flex items-center border-0 py-2 px-5 focus:outline-none rounded-md text-base md:mt-0"
                              >
                                Buy Now (₹{service.price / 100}/year)
                              </a>
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="w-72 h-72 order-first sm:order-none sm:ml-10 inline-flex items-center justify-center rounded-full text-indigo-400 flex-shrink-0">
                        <img
                          className="rounded-md"
                          src={service.titleImage}
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </>
              ))}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UseAnimations className="mt-4" animation={infinity} size={40} />
            </div>
          )}
          {loaded && state.services.length === 0 ? (
            <h1 className="inter py-4 text-red-400 text-center text-xl">
              No Services Available for Purchase
            </h1>
          ) : (
            <></>
          )}
        </div>
      </section>
      {loaded ? <Footer /> : <></>}
    </>
  );
};

export default Services;
