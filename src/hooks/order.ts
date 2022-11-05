import {
  GlobalStateInterface,
  mongoApi,
  useGlobalState,
} from "./useGlobalState";
import { NextRouter, useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import axios, { AxiosError } from "axios";

import { MongooseService } from "../interfaces/Service";
import { ServerError } from "../interfaces/ServerError";
import firebase from "../../firebase";
import getAccount from "./getAccount";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useNewOrder = (
  service: MongooseService,
  state: GlobalStateInterface,
  setState: Dispatch<SetStateAction<GlobalStateInterface>>,
  router: NextRouter
) => {
  if (!state.loggedIn) return router.push("/auth/login");

  const axiosHandler = ({ response, serviceId }) => {
    axios
      .get(`${mongoApi}/orders`, {
        headers: {
          method: "new",
          acc: state.account._id,
          serv: serviceId,
          tid: response?.razorpay_payment_id ? response.razorpay_payment_id : null
        },
      })
      .then((res) => {
        alert('Successful!')
        firebase.analytics().logEvent('purchase')
        router.push("/dashboard");
      })
      .catch((error: AxiosError<ServerError>) => {
        alert(
          response
            ? `An Error has Occurred while processing your payment (${error.response.data.message})... Unfortunately the money has been deducted from your account, please immediately save your payment ID for contacting administrators - ${response.razorpay_payment_id}`
            : `An Error has Occurred while processing your payment (${error.response.data.message})... Please immediately screenshot this prompt and your bank statement if the money has been deducted and send to [an email]`
        );
      });
  };

  firebase.analytics().logEvent('begin_checkout')

  if (service.price !== 0) {
    var options1 = {
      key: process.env.NEXT_PUBLIC_razorpayKey, // Enter the Key ID generated from the Dashboard
      amount: service.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: `${service.name} - ProgrammingSpot`,
      image: "http://localhost:3000/programmingspotlogo.png",
      description: "Test Transaction",
      prefill: {
        email: state.account.email,
      },
      handler: (response) => axiosHandler({ response, serviceId: service._id }),
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options1);
    rzp1.open();
  } else {
    axiosHandler({ response: null, serviceId: service._id })
  }
};
