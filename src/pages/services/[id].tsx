import { Lesson, MongooseService } from "../../interfaces/Service";
import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { mongoApi, useGlobalState } from "../../hooks/useGlobalState";

import Head from "next/head";
import { ServerError } from "../../interfaces/ServerError";
import StringReplaceAll from "string-replace-all";
import UseAnimations from "react-useanimations";
import firebase from "../../../firebase";
import handleAxiosError from "../../hooks/handleAxiosError";
import infinity from "react-useanimations/lib/infinity";
import moment from "moment";
import { useRouter } from "next/router";

export default function () {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const { id } = router.query;
  const serviceId = id?.toString();
  const [service, setService] = useState<MongooseService>(null);
  const [lesson, setLesson] = useState<Lesson>(null);

  const checkAccountService = (serviceId: string): boolean => {
    if (!state.loggedIn) return false;

    const accountServicesId = state.account.services.map(
      (accService) => accService.servId
    );

    const i = accountServicesId.findIndex((x) => x === serviceId);

    if (i !== -1 && moment(state.account.services[i].expiresOn).isAfter()) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!state.loggedIn && router.isReady) {
      router.push("/auth/login");
      return;
    }

    if (checkAccountService(serviceId)) {
      axios
        .get(`${mongoApi}/services`, {
          headers: { method: "get", sid: serviceId },
        })
        .then((response: AxiosResponse<MongooseService>) => {
          setService(response.data);
          firebase.analytics().logEvent('page_view')
        })
        .catch((e: AxiosError<ServerError>) => {
          handleAxiosError(e);
          router.push("/");
        });
    } else router.push("/");
  }, []);

  if (state.loggedIn && service) {
    return (
      <>
        <Head>
          <title>
            {service.name} - {service.lessons.length} Lessons
          </title>
        </Head>
        <div
          className="text-center py-12"
          style={{
            backgroundImage:
              "url('https://wallpaperaccess.com/full/1091423.jpg')",
          }}
        >
          {!lesson ? (
            <div className="flex flex-col text-center w-full">
              <h1 className="sm:text-3xl text-2xl inter font-medium title-font mb-4 text-gray-900">
                {service.name} - {service.lessons.length} Lessons
              </h1>
              <p className="lg:w-2/3 poppins mx-auto leading-relaxed text-base">
                Find the lessons of this course below! Have a great time!
              </p>
            </div>
          ) : (
            <div className="flex flex-col text-center w-full">
              <h1 className="sm:text-3xl text-2xl inter font-medium title-font text-gray-900">
                {lesson.title} - {service.name}
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <button
                  onClick={() => setLesson(null)}
                  className="text-indigo-800 hover:text-indigo-600 inline-flex items-center "
                >
                  Go Back to Lessons Section
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
                </button>
              </div>
            </div>
          )}
        </div>
        {!lesson ? (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-wrap -m-4">
                {service.lessons.map((lesson, i) => (
                  <div className="p-4 md:w-1/3">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <video
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={lesson.videoUrl}
                        key={i}
                      />
                      <div className="p-6">
                        <h1 className="title-font text-lg font-medium text-gray-900">
                          {lesson.title}
                        </h1>
                        <p className="leading-relaxed my-1">
                          {StringReplaceAll(lesson.description, '--n--', " ")}
                        </p>
                        <p className="leading-relaxed mb-1">
                          {lesson.points.length} Points
                        </p>
                        <div className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0">
                          Date of Creation
                        </div>
                        <br />
                        <span className="text-red-400">
                          {moment(lesson.dateCreated)
                            .local()
                            .format("Do MMMM YYYY hh:mm A")}
                        </span>{" "}
                        <br />
                        <button
                          onClick={() => setLesson(lesson)}
                          className="text-blue-900 inline-flex items-center md:mb-2 lg:mb-0"
                        >
                          Check out this Lesson!
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-col px-5 py-12 justify-center items-center">
              <video
                className="md:w-2/3 mb-6 object-cover object-center rounded"
                src={lesson.videoUrl}
                controls
              />
              <div className="w-full md:w-2/3 flex flex-col mb-16">
                <p
                  className="my-2 leading-relaxed poppins"
                  dangerouslySetInnerHTML={{
                    __html: StringReplaceAll(
                      lesson.description,
                      "--n--",
                      "<br />"
                    ),
                  }}
                />
                <b>Points to be noted</b>
                {lesson.points.map((point) => (
                  <li className="poppins">{point}</li>
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4px",
        }}
      >
        <UseAnimations size={40} animation={infinity} />
      </div>
    );
  }
}
