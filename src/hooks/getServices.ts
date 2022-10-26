import { Dispatch, SetStateAction } from "react";
import { GlobalStateInterface, mongoApi } from "./useGlobalState";
import axios, { AxiosResponse } from "axios";

import { MongooseService } from "../interfaces/Service";

export default async function getServices(
  state: GlobalStateInterface,
  setState: Dispatch<SetStateAction<GlobalStateInterface>>,
  setLoaded?: Dispatch<SetStateAction<boolean>>
) {
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
      console.log(state)
      if (setLoaded) setLoaded(true);
    });
}
