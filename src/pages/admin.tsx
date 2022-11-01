import { Lesson, MongooseService, Service } from "../interfaces/Service";
import React, { MutableRefObject, Ref, useEffect, useRef } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { mongoApi, useGlobalState } from "../hooks/useGlobalState";

import { FileUploader } from "react-drag-drop-files";
import Head from "next/head";
import { MongooseAccount } from "../interfaces/Account";
import { Order } from "../interfaces/Order";
import { ServerError } from "../interfaces/ServerError";
import UseAnimations from "react-useanimations";
import firebase from "../../firebase";
import getServices from "../hooks/getServices";
import handleAxiosError from "../hooks/handleAxiosError";
import infinity from "react-useanimations/lib/infinity";
import moment from "moment";
import stringReplaceAll from "string-replace-all";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Admin() {
  const router = useRouter();
  // Component Input Refs and State
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const serviceNameRef = useRef<HTMLInputElement>(null);
  const serviceDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const servicePriceRef = useRef<HTMLInputElement>(null);
  const [servicePoints, setServicePoints] = useState<string[]>([
    "Type a Point here",
  ]);
  const modifiedServiceNameRef = useRef<HTMLInputElement>(null);
  const modifiedServiceDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const modifiedServicePriceRef = useRef<HTMLInputElement>(null);
  const [modifiedServicePoints, setModifiedServicePoints] = useState<string[]>(
    []
  );
  const grantRevokeAdminEmailRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File>(null);
  const lessonTitleRef = useRef<HTMLInputElement>(null);
  const lessonDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const [lessonPoints, setLessonPoints] = useState<string[]>([
    "Type a Point here",
  ]);
  const [lessonVideoFile, setLessonVideoFile] = useState<File>(null);
  // State
  const { state, setState } = useGlobalState();
  const [isCreatingLesson, setIsCreatingLesson] = useState<boolean>(false);
  const [isCreatingService, setIsCreatingService] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isDeletingService, setIsDeletingService] = useState<boolean>(false);
  const [isGrantingRevokingAdmin, setIsGrantingRevokingAdmin] =
    useState<boolean>(false);
  const [isContentChanged, setIsContentChanged] = useState<boolean>(false);
  const [modifyReady, setModifyReady] = useState<boolean>(false);
  const [ordersLoaded, setOrdersLoaded] = useState<boolean>(false);
  const [servicesLoaded, setServicesLoaded] = useState<boolean>(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [admin, setAdmin] = useState<MongooseAccount>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedService, setSelectedService] = useState<MongooseService>(null);
  const [mode, setMode] = useState<Mode>("login");

  type Mode =
    | "login"
    | "dashboard"
    | "createService"
    | "modifyService"
    | "orders"
    | "grantRevokeAdmin"
    | "grantRevokeSub"
    | "contentEdit"
    | "addLesson";
  interface HeaderComponentProps {
    content: string;
  }

  const goBack = () => {
    setMode("dashboard");
    setServicePoints(["Type a Point here"]);
    setImageFile(null);
    setSelectedService(null);
    setModifyReady(false);
    setIsCreatingService(false);
    setIsGrantingRevokingAdmin(false);
    setIsLoggingIn(false);
    setIsCreatingLesson(false);
    setLessonVideoFile(null);
    setLessonPoints(["Type a Point Here"]);
    setOrdersLoaded(false);
    setImageFile(null);
    getServices(state, setState, null, true);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const setView = (mode: Mode) => {
    switch (mode) {
      case "dashboard":
        getServices(state, setState, null, true);
        setMode(mode);
        break;
      case "orders":
        getOrders();
        setMode(mode);
        break;
      case "modifyService":
        getServices(state, setState, setServicesLoaded, true);
        setMode(mode);
        break;
      case "contentEdit":
        getServices(state, setState, setServicesLoaded, true);
        setMode(mode);
        break;
      case "addLesson":
        setMode(mode);
        break;
      default:
        setMode(mode);
        break;
    }
  };

  const deleteService = (serviceId: string) => {
    setIsDeletingService(true);

    axios
      .get(`${mongoApi}/admin`, {
        headers: {
          method: "deleteService",
          id: serviceId,
        },
      })
      .then(() => {
        setIsDeletingService(false);
        alert("Success");
        getServices(state, setState, setServicesLoaded, true);
        goBack();
      })
      .catch((e: AxiosError<ServerError>) => {
        setIsDeletingService(false);
      });
  };

  const HeaderComponent = (props: HeaderComponentProps) => (
    <div
      className="text-center py-12"
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/1091423.jpg')",
      }}
    >
      <span
        className={
          mode == "login"
            ? "text-3xl inter text-black"
            : "text-3xl inter font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-700"
        }
      >
        {props.content}
      </span>{" "}
      {servicesLoaded ? (
        <>
          <br /> Total Number of Services: {state.services.length}
        </>
      ) : null}
      {mode !== "login" && !isCreatingService && !isGrantingRevokingAdmin ? (
        <>
          <br />
          <button
            onClick={goBack}
            className="text-indigo-500 hover:text-blue-800 inline-flex items-center ml-4"
          >
            Go back
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          {mode == "contentEdit" && selectedService ? (
            <button
              onClick={() => setView("addLesson")}
              className="text-blue-700 hover:text-blue-900 inline-flex items-center ml-4"
            >
              Add Lesson
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          ) : null}
          {mode == "modifyService" && selectedService && modifyReady ? (
            <button
              onClick={() => deleteService(selectedService._id)}
              className="text-red-700 hover:text-red-900 inline-flex items-center ml-4"
            >
              Delete this Service
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          ) : null}
          <button
            onClick={() =>
              getServices(state, setState, setServicesLoaded, true)
            }
            className="text-indigo-500 hover:text-blue-800 inline-flex items-center ml-4"
          >
            Refresh Services
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );

  function makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const getFile = (file: File) => {
    if (imageFile) alert("Replaced the previous image");
    setImageFile(file);
  };

  const getLessonVideo = (file: File) => {
    setLessonVideoFile(file);
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoggingIn(true);

    axios
      .get(`${mongoApi}/admin`, {
        headers: {
          method: "login",
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      })
      .then((response: AxiosResponse<MongooseAccount>) => {
        setAdmin(response.data);
        setIsLoggingIn(false);
        setAdminLoggedIn(true);
        setView("dashboard");
      })
      .catch((e: AxiosError<ServerError>) => {
        handleAxiosError(e);
        setIsLoggingIn(false);
        return;
      });

    getServices(state, setState, setServicesLoaded, true);
  };

  const createService = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile)
      return alert(
        "Please drag-and-drop or upload image file with the Input below!"
      );

    setIsCreatingService(true);

    const randomizedRef = `${moment().unix().toString()}_${makeid(10)}_${
      admin.email
    }`;

    const imageRef = firebase.storage().ref("serviceImages/" + randomizedRef);

    imageRef.put(imageFile).then(async (snp) => {
      const downloadUrl = await snp.ref.getDownloadURL();

      axios
        .get(`${mongoApi}/admin`, {
          headers: {
            method: "createService",
            name: serviceNameRef.current.value,
            description: serviceDescriptionRef.current.value,
            price: servicePriceRef.current.value,
            points: JSON.stringify(servicePoints),
            image: downloadUrl,
          },
        })
        .then(() => {
          alert("Successful!");
          setIsCreatingService(false);
          goBack();
        })
        .catch((error: AxiosError<ServerError>) => {
          handleAxiosError(error);
          setIsCreatingService(false);
          goBack();
        });
    });
  };

  const inputPoint = (value: string, i: number) => {
    const modifiedServices = servicePoints.map((service, sI) =>
      sI == i ? value : service
    );

    setServicePoints(modifiedServices);
  };

  const lessonInputPoint = (value: string, i: number) => {
    const modifiedLessonPoints = lessonPoints.map((lesson, sI) =>
      sI == i ? value : lesson
    );

    setLessonPoints(modifiedLessonPoints);
  };

  const modifiedInputPoint = (value: string, i: number) => {
    const modifiedServices = modifiedServicePoints.map((service, sI) =>
      sI == i ? value : service
    );

    setModifiedServicePoints(modifiedServices);
  };

  const selectService = (i: number) => {
    if (i == 0) return;

    const service = state.services[i - 1];

    setSelectedService(service);
    pushValuesToModifiedFields(service);
  };

  const selectServiceforContent = (i: number) => {
    if (i == 0) return;

    const service = state.services[i - 1];

    setSelectedService(service);
  };

  const addPoint = () => {
    const newServices = [...servicePoints, "Type a Point here"];

    setServicePoints(newServices);
  };

  const addLessonPoint = () => {
    const newLessonPoints = [...lessonPoints, "Type a Point here"];

    setLessonPoints(newLessonPoints);
  };

  const modifiedAddPoint = () => {
    const newServices = [...modifiedServicePoints, "Type a Point here"];

    setModifiedServicePoints(newServices);
  };

  const pushValuesToModifiedFields = (service: Service) => {
    // name, price, description, points, upload image
    const byHundred = (n: number): number => {
      return n / 100;
    };
    setTimeout(() => {
      modifiedServiceNameRef.current.value = service.name;
      modifiedServicePriceRef.current.value = byHundred(
        service.price
      ).toString();
      modifiedServiceDescriptionRef.current.value = service.description;
      setModifiedServicePoints(service.points);
      setModifyReady(true);
    }, 2800);
  };

  const changesToService = async (e: React.FormEvent) => {
    e.preventDefault();

    let newPictureUrl: string = null;

    if (imageFile) {
      setIsCreatingService(true);
      
      const randomizedRef = `${moment().unix().toString()}_${makeid(10)}_${
        admin.email
      }`;

      const imageRef = firebase.storage().ref("serviceImages/" + randomizedRef);

      imageRef.put(imageFile).then(async (snp) => {
        const downloadUrl = await snp.ref.getDownloadURL();
        newPictureUrl = downloadUrl;

        axios
          .get(`${mongoApi}/admin`, {
            headers: {
              method: "modifyService",
              name: modifiedServiceNameRef.current.value,
              description: modifiedServiceDescriptionRef.current.value,
              price: modifiedServicePriceRef.current.value,
              points: JSON.stringify(modifiedServicePoints),
              image: newPictureUrl ? newPictureUrl : selectedService.titleImage,
              id: selectedService._id,
            },
          })
          .then(() => {
            alert("Successful!");
            setIsCreatingService(false);
            goBack();
          })
          .catch((error: AxiosError<ServerError>) => {
            handleAxiosError(error);
            setIsCreatingService(false);
            goBack();
          });
      });
    } else {
      return alert("Image file has to be uploaded.");
    }
  };

  const getOrders = () => {
    axios
      .get(`${mongoApi}/admin`, {
        headers: {
          method: "getOrders",
        },
      })
      .then((response: AxiosResponse<Order[]>) => {
        setOrders(response.data);
        setOrdersLoaded(true);
      })
      .catch((error: AxiosError<ServerError>) => {
        handleAxiosError(error);
        goBack();
      });
  };

  const grantRevokeAdmin = (str: "grant" | "revoke") => {
    const email = grantRevokeAdminEmailRef.current.value;

    if (!email.length) return alert("Field is required.");

    setIsGrantingRevokingAdmin(true);

    axios
      .get(`${mongoApi}/admin`, {
        headers: {
          method: str == "grant" ? "grantAdmin" : "revokeAdmin",
          email,
        },
      })
      .then((res) => {
        alert("Success");
        goBack();
      })
      .catch((e: AxiosError<ServerError>) => {
        handleAxiosError(e);
        goBack();
      });

    setIsGrantingRevokingAdmin(false);
  };

  const newLesson = (e: React.FormEvent) => {
    e.preventDefault();

    const title = lessonTitleRef.current.value;
    const description = lessonDescriptionRef.current.value;
    let videoUrl: string = null;

    setIsCreatingLesson(true);

    if (!lessonVideoFile) {
      return alert("Video file has to be uploaded.");
    }

    const randomizedRef = `${selectedService._id}_${moment()
      .unix()
      .toString()}_${makeid(10)}_${admin.email}`;

    const videoRef = firebase.storage().ref("serviceVideos/" + randomizedRef);

    videoRef
      .put(lessonVideoFile)
      .then(async (snp) => {
        const downloadUrl = await snp.ref.getDownloadURL();
        videoUrl = downloadUrl;

        axios
          .get(`${mongoApi}/admin`, {
            headers: {
              method: "addLesson",
              id: selectedService._id,
              title,
              description: stringReplaceAll(description, '\n', '--n--'),
              video: videoUrl,
              points: JSON.stringify(lessonPoints),
            },
          })
          .then((res) => {
            alert("Success");
            setIsCreatingLesson(false);
            goBack();
          })
          .catch((err: AxiosError<ServerError>) => {
            setIsCreatingLesson(false);
            handleAxiosError(err);
            goBack();
          });
      })
      .catch((err) => {
        setIsCreatingLesson(false);
        alert("An Error occurred while uploading Video");
        goBack();
      });
  };

  const deleteLesson = (id: string, _id: string) => {
    axios
      .get(`${mongoApi}/admin`, {
        headers: {
          method: "deleteLesson",
          id,
          _id,
        },
      })
      .then((res) => {
        alert("Success");
        goBack();
      })
      .catch((err) => {
        handleAxiosError(err);
      });
  };

  switch (mode) {
    case "login":
      return (
        <>
          <Head>
            <title>Login - Admin Panel</title>
          </Head>
          <HeaderComponent content="Admin - Login" />
          <section className="text-gray-600 body-font relative">
            <div className="container px-5 mt-12 mx-auto">
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <form onSubmit={login}>
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          ref={emailRef}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="email"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          required
                          ref={passwordRef}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="mt-4 p-2 w-full">
                      <button
                        type="submit"
                        className="poppins flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      );
    case "dashboard":
      return (
        <>
          <Head>
            <title>{admin.name} - Admin Dashboard - ProgrammingSpot</title>
          </Head>
          <HeaderComponent content={`Welcome ${admin.name}!`} />
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-wrap -m-4">
                <button
                  onClick={() => setView("contentEdit")}
                  className="mb-4 bg-gray-300 lg:w-full hover:bg-gray-400 md:w-1/2 p-4 w-full"
                >
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Add Content to Service (Lessons w/ Title, Description and
                    most importantly, Video!)
                  </h2>
                </button>
                <button
                  onClick={() => setView("createService")}
                  className="bg-gray-300 lg:w-1/4 hover:bg-gray-400 md:w-1/2 p-4 w-full"
                >
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    New Service
                  </h2>
                </button>
                <button
                  onClick={() => setView("modifyService")}
                  className="bg-gray-300 lg:w-1/4 hover:bg-gray-400 md:w-1/2 p-4 w-full"
                >
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Modify Service <br />{" "}
                    <small>
                      (Change Name or Price, Add/Remove Lesson(s), Check Views,
                      etc...)
                    </small>
                  </h2>
                </button>
                <button
                  onClick={() => setView("orders")}
                  className="bg-gray-300 lg:w-1/4 hover:bg-gray-400 md:w-1/2 p-4 w-full"
                >
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Orders
                  </h2>
                </button>
                <button
                  onClick={() => setView("grantRevokeAdmin")}
                  className="bg-gray-300 lg:w-1/4 hover:bg-gray-400 md:w-1/2 p-4 w-full"
                >
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Grant/Revoke Admin to an Account
                  </h2>
                </button>
              </div>
            </div>
          </section>
        </>
      );
    case "createService":
      return (
        <>
          <Head>
            <title>{admin.name} - Admin Dashboard - ProgrammingSpot</title>
          </Head>
          <HeaderComponent content="Create new Service" />
          <section className="text-gray-600 body-font relative">
            <div className="container px-5 mt-12 mx-auto">
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <form onSubmit={createService}>
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label className="leading-7 text-sm text-gray-600">
                          Name
                        </label>
                        <input
                          required
                          ref={serviceNameRef}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label className="leading-7 text-sm text-gray-600">
                          Price (in ₹)
                        </label>
                        <input
                          required
                          type="number"
                          ref={servicePriceRef}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label className="leading-7 text-sm text-gray-600">
                          Description
                        </label>
                        <textarea
                          required
                          ref={serviceDescriptionRef}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label className="leading-7 text-sm text-gray-600">
                          Points
                        </label>
                        {!(7 <= servicePoints.length) ? (
                          <button onClick={addPoint} type="button">
                            <i className="ml-1 bi bi-plus-circle text-md" />
                          </button>
                        ) : null}
                        {servicePoints.map((service, i) => (
                          <input
                            required
                            defaultValue={service}
                            onInput={(e) =>
                              inputPoint(e.currentTarget.value, i)
                            }
                            className={
                              "mt-2 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <div className="py-2 ml-2">
                      <label className="leading-7 text-sm text-gray-600">
                        Upload an Image (only one, required)
                      </label>
                      <FileUploader
                        handleChange={(file) => getFile(file)}
                        name="file"
                        types={["JPG", "PNG"]}
                      />
                    </div>
                    <div className="mt-4 p-2 w-full">
                      <button
                        type="submit"
                        className="poppins flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      );
    case "modifyService":
      return (
        <>
          <Head>
            <title>{admin.name} - Admin Dashboard - ProgrammingSpot</title>
          </Head>
          {selectedService ? (
            <>
              <HeaderComponent
                content={`Modifying - ${selectedService.name}`}
              />
              <section
                className={
                  modifyReady ? "text-gray-600 body-font relative" : "hidden"
                }
              >
                <div className="container px-5 mt-12 mx-auto">
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <form onSubmit={changesToService}>
                      <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                          <div className="relative">
                            <label className="leading-7 text-sm text-gray-600">
                              Name
                            </label>
                            <input
                              required
                              ref={modifiedServiceNameRef}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-1/2">
                          <div className="relative">
                            <label className="leading-7 text-sm text-gray-600">
                              Price (in ₹)
                            </label>
                            <input
                              required
                              type="number"
                              ref={modifiedServicePriceRef}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label className="leading-7 text-sm text-gray-600">
                              Description
                            </label>
                            <textarea
                              required
                              ref={modifiedServiceDescriptionRef}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label className="leading-7 text-sm text-gray-600">
                              Points
                            </label>
                            {!(7 <= modifiedServicePoints.length) ? (
                              <button onClick={modifiedAddPoint} type="button">
                                <i className="ml-1 bi bi-plus-circle text-md" />
                              </button>
                            ) : null}
                            {modifiedServicePoints.map((service, i) => (
                              <input
                                required
                                defaultValue={service}
                                onInput={(e) =>
                                  modifiedInputPoint(e.currentTarget.value, i)
                                }
                                className={
                                  "mt-2 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <div className="py-2 ml-2">
                          <label className="leading-7 text-sm text-gray-600">
                            Upload an Image (only if you want to replace
                            previously set picture)
                          </label>
                          <FileUploader
                            handleChange={(file: File) => getFile(file)}
                            name="file"
                            types={["JPG", "PNG"]}
                          />
                        </div>

                        <div className="mt-4 p-2 w-full">
                          <button
                            type="submit"
                            className="poppins flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                          >
                            Set Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <UseAnimations
                  className={modifyReady ? "hidden" : "flex"}
                  size={40}
                  animation={infinity}
                />
              </div>
            </>
          ) : (
            <>
              <HeaderComponent content="Modify a Service" />
              <div
                className="mt-2 p-2 w-full"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Select Service
                  </label>
                  <select
                    required
                    onChange={(e) => selectService(parseInt(e.target.value))}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value={0}>Select</option>
                    {state.services.map((service, i) => (
                      <option value={i + 1}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </>
      );
    case "orders":
      return (
        <>
          <HeaderComponent content="Orders" />
          {ordersLoaded && !orders.length ? (
            <h1 className="inter py-4 text-red-400 text-center text-xl">
              No orders have been placed.
            </h1>
          ) : null}
          {ordersLoaded ? (
            <>
              <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-12 mx-auto">
                  <div className="-my-8 divide-y-2 divide-gray-100">
                    {orders.map((order) => (
                      <div className="py-8 flex flex-wrap md:flex-nowrap">
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                          <span className="mt-1 text-gray-500 text-sm">
                            <b>Purchased by</b> <br /> {order.by}
                          </span>
                          <span className="mt-1 text-gray-500 text-sm">
                            <b>Purchased on</b> <br />
                            {moment(order.purchasedOn).format(
                              "Do MMMM YYYY hh:mm A"
                            )}
                          </span>
                        </div>
                        <div className="md:flex-grow">
                          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                            {order.service.name}
                          </h2>
                          <p className="leading-relaxed">
                            ₹{order.service.price / 100}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UseAnimations className="mt-4" size={40} animation={infinity} />
            </div>
          )}
        </>
      );
    case "grantRevokeAdmin":
      return (
        <>
          <HeaderComponent content="Grant or Revoke Admin from User" />
          {!isGrantingRevokingAdmin ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="p-2 w-1/5 mt-4">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    ref={grantRevokeAdminEmailRef}
                    type="email"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <br />
                <button
                  onClick={() => grantRevokeAdmin("grant")}
                  className="text-indigo-500 hover:text-blue-800 inline-flex items-center"
                >
                  Grant
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <button
                  onClick={() => grantRevokeAdmin("revoke")}
                  className="ml-4 text-red-700 hover:text-red-900 inline-flex items-center"
                >
                  Revoke
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UseAnimations className="mt-4" size={40} animation={infinity} />
            </div>
          )}
        </>
      );
    case "contentEdit":
      return (
        <>
          {!selectedService ? (
            <>
              <HeaderComponent content="Content for Service" />
              <div
                className="mt-2 p-2 w-full"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Select Service
                  </label>
                  <select
                    required
                    onChange={(e) =>
                      selectServiceforContent(parseInt(e.target.value))
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value={0}>Select</option>
                    {state.services.map((service, i) => (
                      <option value={i + 1}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <HeaderComponent
                content={`Content - ${selectedService.name} - ${selectedService.lessons.length} Lessons`}
              />

              {!selectedService.lessons.length ? (
                <h1 className="inter py-4 text-red-400 text-center text-xl">
                  Service does not have any Lessons! Add from the above options
                </h1>
              ) : null}
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-12 mx-auto">
                  <div className="flex flex-wrap -m-4">
                    {selectedService.lessons.map((lesson, i) => (
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
                              {lesson.description}
                            </p>
                            <p className="leading-relaxed mb-1">
                              {lesson.points.length} Points
                            </p>
                            <div className="flex items-center">
                              <div className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0">
                                Date of Creation
                              </div>
                              <span className="text-red-400">{moment(lesson.dateCreated)
                                  .local()
                                  .format("Do MMMM YYYY hh:mm A")}</span>
                              <button
                                onClick={() =>
                                  router.push(`/services/${selectedService._id}`)
                                }
                                className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0"
                              >
                                View Service
                              </button>
                              <button
                                onClick={() =>
                                  deleteLesson(selectedService._id, lesson.id)
                                }
                                className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0"
                              >
                                Delete Lesson
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      );
    case "addLesson":
      return (
        <>
          <HeaderComponent
            content={`Add Lesson - ${selectedService.name} - ${selectedService.lessons.length} Lessons`}
          />
          {!isCreatingLesson ? (
            <section className="text-gray-600 body-font relative">
              <div className="container px-5 mt-12 mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                  <form onSubmit={newLesson}>
                    <div className="flex flex-wrap -m-2">
                      <div className="p-2 w-full">
                        <div className="relative">
                          <label className="leading-7 text-sm text-gray-600">
                            Title
                          </label>
                          <input
                            required
                            ref={lessonTitleRef}
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <label className="leading-7 text-sm text-gray-600">
                            Description
                          </label>
                          <textarea
                            required
                            ref={lessonDescriptionRef}
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="p-2 w-full">
                        <div className="relative">
                          <label className="leading-7 text-sm text-gray-600">
                            Points
                          </label>
                          <button onClick={addLessonPoint} type="button">
                            <i className="ml-1 bi bi-plus-circle text-md" />
                          </button>
                          {lessonPoints.map((lessonPt, i) => (
                            <input
                              required
                              key={i}
                              defaultValue={lessonPt}
                              onInput={(e) =>
                                lessonInputPoint(e.currentTarget.value, i)
                              }
                              className={
                                "mt-2 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <div className="py-2 ml-2">
                        <label className="leading-7 text-sm text-gray-600">
                          Upload a Video
                        </label>
                        <FileUploader
                          handleChange={(file: File) => getLessonVideo(file)}
                          name="file"
                          types={["MP4"]}
                        />
                      </div>

                      <div className="mt-4 p-2 w-full">
                        <button
                          type="submit"
                          className="poppins flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                          Add Lesson
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UseAnimations className="mt-4" size={40} animation={infinity} />
            </div>
          )}
        </>
      );
  }
}
