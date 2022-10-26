import { Account, MongooseAccount } from "../interfaces/Account";
import { Dispatch, SetStateAction } from "react";
import { GlobalStateInterface, mongoApi } from "./useGlobalState";
import axios, { AxiosResponse } from "axios";

import CryptoJS from "crypto-js";
import moment from "moment";

export const loggedIn = async (
  state: GlobalStateInterface,
  setState: Dispatch<SetStateAction<GlobalStateInterface>>,
  needAuth: boolean
): Promise<boolean> => {
  if (state.loggedIn) return true;
  if (needAuth) return false;

  if (
    localStorage.getItem("ACCOUNT_EMAIL") &&
    localStorage.getItem("ACCOUNT_PASSWORD")
  ) {
    const response: AxiosResponse<MongooseAccount> = await axios.get(
      `${mongoApi}/auth`,
      {
        headers: {
          method: "login",
          email: localStorage.getItem("ACCOUNT_EMAIL"),
          password: localStorage.getItem("ACCOUNT_PASSWORD"),
        },
      }
    );

    if (response.status == 200) {
      setState({
        ...state,
        account: response.data,
        loggedIn: true,
        expiresOn: moment().add("24", "hours").toString(),
      });
    }
  }
};
