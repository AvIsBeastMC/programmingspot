import firebase from "firebase/app";

require('firebase/firestore')
require('firebase/auth')
require('firebase/analytics')

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_api,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;