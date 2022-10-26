import { AxiosError } from "axios";
import { ServerError } from "../interfaces/ServerError";

export default function handleAxiosError(e: AxiosError<ServerError>) {
  const data = e.response.data;

  switch (data?.type) {
    case "client":
      alert(`An Application Error has Occurred - ${data.message}`);
      break;
    case "server":
      alert(`An Application Error has Occurred - ${data.message}`);
      break;
    case "user":
      alert(`Error - ${data.message}`);
      break;
  }
}
