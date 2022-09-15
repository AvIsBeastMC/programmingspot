import { Dispatch, SetStateAction } from "react"

import { Account } from "../interfaces/Account"
import { GlobalStateInterface } from "./useGlobalState"
import firebase from "../../firebase"
import moment from "moment"

const db = firebase.firestore()

export const loggedIn = (state: GlobalStateInterface, setState: Dispatch<SetStateAction<GlobalStateInterface>>, auth: firebase.auth.Auth) => {
    if (state.loggedIn) return;
    
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('accounts').doc(user.email).get()
            .then((account) => {
                setState({
                    account: account.data() as Account,
                    loggedIn: true,
                    expiresOn: moment(Date()).add(24, 'hours').toString()
                })
            })
        } else {
            setState({
                account: null,
                loggedIn: false,
                expiresOn: null
            })
        }
    })
}