import React, { useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import { MongooseService } from "../../interfaces/Service";
import { NextPage } from "next";
import getAccount from "../../hooks/getAccount";
import { loggedIn } from "../../hooks/loggedIn";
import moment from "moment";
import { useGlobalState } from "../../hooks/useGlobalState";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const { state, setState } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    loggedIn(state, setState, true).then((res) => {
      if (!res) {
        router.push("/auth/login");
      }
      getAccount(state, setState, router);
    });
  }, [router.isReady]);

  const getService = (_id: string): MongooseService => {
    let service: MongooseService = null;
    const services = state.services;

    services.map((theService) =>
      theService._id == _id ? (service = theService) : null
    );

    return service;
  };

  if (state.loggedIn) {
    return (
      <>
        <Head>
          <title>{state.account.name} - Dashboard - ProgrammingSpot</title>
        </Head>
        <div
          className="text-center py-12"
          style={{
            backgroundImage:
              "url('https://wallpaperaccess.com/full/1091423.jpg')",
          }}
        >
          <span className="text-3xl inter bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-900">
            Services Purchased
          </span>
        </div>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-12 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              {state.account.services.map((service) => (
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    {getService(service.servId) ? (
                      <>
                        <span className="font-semibold title-font text-gray-700">
                          {getService(service.servId).lessons.length
                            ? `${getService(service.servId).lessons.length}`
                            : `No`}{" "}
                          Lessons
                        </span>
                      </>
                    ) : (
                      "Service no longer exists..."
                    )}
                    <span className="font-semibold title-font text-gray-700">
                      Purchased on <br />
                      <span className="font-normal">
                        {moment(service.boughtOn).format(
                          "Do MMMM YYYY hh:mm A"
                        )}
                      </span>
                    </span>
                    {service.transactionId !== "null" ? (
                      <span className="font-semibold title-font text-gray-700">
                        Transaction ID <br />
                        <span className="font-normal">
                          {service.transactionId}
                        </span>
                      </span>
                    ) : null}
                    <span className="font-semibold title-font text-gray-700">
                      {moment(service.expiresOn).isBefore() ? (
                        <span className="text-red-500">Expired</span>
                      ) : (
                        "Expires"
                      )}{" "}
                      on <br />
                      <span className="font-normal">
                        {moment(service.expiresOn).format("Do MMMM YYYY")}
                      </span>
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    {getService(service.servId) ? (
                      <>
                        <img
                          src={getService(service.servId).titleImage}
                          style={{ maxWidth: "120px" }}
                          className="rounded-md"
                          alt=""
                        />
                        <h2 className="text-2xl poppins font-medium text-gray-900 title-font mt-2">
                          {getService(service.servId).name}
                        </h2>
                        <p className="leading-relaxed">
                          <b>Cost</b>: ₹{getService(service.servId).price / 100}
                        </p>
                      </>
                    ) : (
                      "Service no longer exists..."
                    )}
                    <Link href={`/services/${service.servId}`}>
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
                  </div>
                </div>
              ))}
              {!state.account.services.length ? (
                <h1 className="inter py-4 text-red-400 text-center text-xl">
                  You have not purchased any service!
                </h1>
              ) : null}
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <></>;
  }
};

export default Dashboard;
