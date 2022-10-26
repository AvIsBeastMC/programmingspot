import { GlobalStateInterface, mongoApi } from "./useGlobalState";
import { NextRouter, useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { MongooseAccount } from "../interfaces/Account";
import { ServerError } from "../interfaces/ServerError";
import handleAxiosError from "./handleAxiosError";
import moment from "moment";

export default function getAccount (state: GlobalStateInterface, setState: Dispatch<SetStateAction<GlobalStateInterface>>, router: NextRouter) {

    if (!localStorage.getItem('ACCOUNT_EMAIL') || !localStorage.getItem('ACCOUNT_PASSWORD')) return router.reload();
    
    axios
      .get(`${mongoApi}/auth`, {
        headers: {
          method: "login",
          email: localStorage.getItem('ACCOUNT_EMAIL'),
          password: localStorage.getItem('ACCOUNT_PASSWORD'),
        },
      })
      .then((res: AxiosResponse<MongooseAccount>) => {
        setState({
          ...state,
          account: res.data,
          loggedIn: true,
          expiresOn: moment().add("24", "hours").toString(),
        })
      })
      .catch((e: AxiosError<ServerError>) => {
        return router.reload()
      });
}