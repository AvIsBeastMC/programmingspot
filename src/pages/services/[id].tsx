import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { mongoApi, useGlobalState } from "../../hooks/useGlobalState";

import Head from "next/head";
import { MongooseService } from "../../interfaces/Service";
import { ServerError } from "../../interfaces/ServerError";
import UseAnimations from "react-useanimations";
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

  useEffect(() => {
    if (!state.loggedIn && router.isReady) {
      router.push("/auth/login");
      return;
    }

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

    if (checkAccountService(serviceId)) {
      axios
        .get(`${mongoApi}/services`, {
          headers: { method: "get", sid: serviceId },
        })
        .then((response: AxiosResponse<MongooseService>) => {
          setService(response.data);
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
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-3xl text-2xl inter font-medium title-font mb-4 text-gray-900">
              {service.name} - {service.lessons.length} Lessons
            </h1>
            <p className="lg:w-2/3 poppins mx-auto leading-relaxed text-base">
              Find the lessons of this course below! Have a great time!
            </p>
          </div>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-wrap -m-2">
              {service.lessons.map((lesson) => (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium">
                        {lesson.title}
                      </h2>
                      <p className="text-gray-500">{lesson.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
