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
        <h1 className="text-center mt-4 inter text-3xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-700">
            {service.name}
          </span>
        </h1>
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
        {/* <UseAnimations size={40} animation={infinity} /> */}
      </div>
    );
  }
}
