import emailjs from "@emailjs/browser";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { mongoApi, useGlobalState } from "../hooks/useGlobalState";

export default function ForgotPass() {
  const [sent, setSent] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [code, setCode] = useState<number>(null);
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const { state, setState } = useGlobalState();
  const [userCode, setUserCode] = useState<number>(null);
  const router = useRouter();

  useEffect(() => {
    emailjs.init("wCAZsA07pFkaBi2Nd");

    setState({
      ...state,
      account: null,
      loggedIn: false,
      expiresOn: null,
    });
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get(`${mongoApi}/auth`, {
        headers: {
          method: "forgotPass",
          email,
        },
      })
      .then(() => {
        sendToEmail(Math.floor(1000 + (9999 - 1000) * Math.random()));
      });
  };

  const sendToEmail = (code: number) => {
    setCode(code);

    emailjs
      .send("service_276nnkn", "template_qi47qdm", {
        email,
        code,
      })
      .then((res) => setSent(true))
      .catch(() => alert("An Internal Server Occurred while sending"));
  };

  const checkCode = (e: React.FormEvent) => {
    e.preventDefault();

    if (userCode !== code) return alert("Incorrect Code Entered");

    setValidated(true);
  };

  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .get(`${mongoApi}/auth`, {
        headers: {
          method: "updatePassword",
          email,
          password,
        },
      })
      .then(() => {
        alert("Successfully updated password!");

        router.push("/auth/login");
      })
      .catch(() => alert("An Internal Server Occurred while updating..."));
  };

  return (
    <>
      <Head>
        <title>Forgot Password - ProgrammingSpot</title>
      </Head>
      {!sent ? (
        <form onSubmit={check}>
          <section
            data-aos="fade-down"
            className="text-gray-400 my-12 body-font mx-auto"
          >
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      onInput={(e) => setEmail(e.currentTarget.value)}
                      placeholder="Enter your Email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 mt-4 w-full">
              <button
                type="submit"
                className="inter flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Send Password Reset Code
              </button>
            </div>
          </section>
        </form>
      ) : (
        <>
          {!validated ? (
            <>
              <h1 className="mt-12 inter text-xl text-center font-bold">
                Successfully sent email to {email}!
              </h1>
              <form onSubmit={checkCode}>
                <section
                  data-aos="fade-down"
                  className="text-gray-400 mt-4 mb-12 body-font mx-auto"
                >
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                      <div className="p-2 w-full">
                        <div className="relative">
                          <input
                            type="number"
                            required
                            onInput={(e) =>
                              setUserCode(parseInt(e.currentTarget.value))
                            }
                            placeholder="Enter Code"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 mt-4 w-full">
                    <button
                      type="submit"
                      className="inter flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Code
                    </button>
                  </div>
                </section>
              </form>
            </>
          ) : (
            <form onSubmit={updatePassword}>
              <section className="text-gray-400 my-12 body-font mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-full">
                      <div className="relative">
                        <input
                          type="password"
                          required
                          onInput={(e) => setPassword(e.currentTarget.value)}
                          placeholder="Set Password"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 mt-4 w-full">
                  <button
                    type="submit"
                    className="inter flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Set Password
                  </button>
                </div>
              </section>
            </form>
          )}
        </>
      )}
    </>
  );
}
