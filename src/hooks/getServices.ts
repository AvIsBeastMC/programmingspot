import { Dispatch, SetStateAction } from "react";
import { GlobalStateInterface, mongoApi } from "./useGlobalState";
import axios, { AxiosResponse } from "axios";

import { MongooseService } from "../interfaces/Service";
import getAccount from "./getAccount";

export default async function getServices(
  state: GlobalStateInterface,
  setState: Dispatch<SetStateAction<GlobalStateInterface>>,
  setLoaded?: Dispatch<SetStateAction<boolean>>,
  boolean?: boolean
) {
  if (!boolean && state.services.length) {
    if (setLoaded) setLoaded(true);
    return;
  }
  
  if (setLoaded) setLoaded(false);
  
  axios
    .get(`${mongoApi}/services`, {
      headers: {
        method: "getAll",
      },
    })
    .then((response: AxiosResponse<MongooseService[]>) => {
      setState({
        ...state,
        services: response.data,
      });
      if (setLoaded) setLoaded(true);
    });
}
