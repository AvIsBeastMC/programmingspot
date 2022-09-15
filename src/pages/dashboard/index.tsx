import React, { useEffect } from "react";

import { NextPage } from "next";
import firebase from "../../../firebase";
import { loggedIn } from "../../hooks/loggedIn";
import { useGlobalState } from "../../hooks/useGlobalState";
import { useRouter } from "next/router";

const auth = firebase.auth();
const db = firebase.firestore();

const Dashboard: NextPage = () => {
  const { state, setState } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    loggedIn(state, setState, auth);

    if (!state.loggedIn) {
      if (!router.isReady) return;

      router.push("/auth/login");
    }
  });

  if (state.loggedIn) {
    return <></>;
  } else {
    return <></>;
  }
};

export default Dashboard;
