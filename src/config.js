import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { getAuth } from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyCfRvVpATOc9ne20haTkKYAd2fPMq1SwWQ",
    authDomain: "multi-tool-e6ca5.firebaseapp.com",
    projectId: "multi-tool-e6ca5",
    storageBucket: "multi-tool-e6ca5.appspot.com",
    messagingSenderId: "305926988605",
    appId: "1:305926988605:web:4693954e4eaa717fdf9b54"
};

initializeApp(firebaseConfig)
//init services

const db = getFirestore()
const auth = getAuth()


export { db, auth }