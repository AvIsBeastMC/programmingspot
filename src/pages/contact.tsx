import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import firebase from "../../firebase";
const Contact: NextPage = () => {
  useEffect(() => {
    firebase.analytics().logEvent('page_view')
  }, [])
  return (
    <>
      <Head>
        <title>
          Contact Us - ProgrammingSpot
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
                      <h2 className="inter text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                        Contact Us
                      </h2>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </section>
      <section data-aos="fade-in" className="text-gray-600 body-font overflow-hidden">
        <div className="container lg:w-5/6 px-5 mt-12 mb-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold text-xl title-font text-gray-700">
                <i className="bi bi-instagram mr-1" /> Instagram
                </span>
              </div>
              <div className="md:flex-grow">
              <h2 className="text-xl font-medium text-gray-900 title-font mb-2">@spotprogramming</h2>
                <a href="https://instagram.com/spotprogramming" className="text-indigo-500 inline-flex items-center">
                  Visit
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
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold text-xl title-font text-gray-700">
                <i className="bi bi-facebook mr-1" /> Facebook
                </span>
              </div>
              <div className="md:flex-grow">
              <h2 className="text-xl font-medium text-gray-900 title-font mb-2">Ansh Shawrikar</h2>
                <a href="https://www.facebook.com/profile.php?id=100087250854360" className="text-indigo-500 inline-flex items-center">
                  Visit
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
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold text-xl title-font text-gray-700">
                <i className="bi bi-twitter mr-1" /> Twitter
                </span>
              </div>
              <div className="md:flex-grow">
              <h2 className="text-xl font-medium text-gray-900 title-font mb-2">@programmingspot</h2>
                <a href="https://twitter.com/programingspot" className="text-indigo-500 inline-flex items-center">
                  Visit
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
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold text-xl title-font text-gray-700">
                <i className="bi bi-discord mr-1" /> Discord
                </span>
              </div>
              <div className="md:flex-grow">
              <h2 className="text-xl font-medium text-gray-900 title-font mb-2">Official Discord Server</h2>
                <a href="https://discord.gg/U4zgsUgrM6" className="text-indigo-500 inline-flex items-center">
                  Visit
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
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold text-xl title-font text-gray-700">
                <i className="bi bi-envelope mr-1" /> Email
                </span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-xl font-medium text-gray-900 title-font mb-2">programmingspotbiz@gmail.com</h2>
                <a href="mailto:programmingspotbiz@gmail.com" className="text-indigo-500 inline-flex items-center">
                  Mail
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
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold text-xl title-font text-gray-700">
                <i className="bi bi-telephone mr-1" /> Phone
                </span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-xl font-medium text-gray-900 title-font mb-2">+91 8800237331</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
