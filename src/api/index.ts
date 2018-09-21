import firebase from "firebase";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZuPXiYld1BIFprp_LVSbNZKCpYXRUJGg",
  authDomain: "timemanager-372a6.firebaseapp.com",
  databaseURL: "https://timemanager-372a6.firebaseio.com",
  projectId: "timemanager-372a6",
  storageBucket: "timemanager-372a6.appspot.com",
  messagingSenderId: "371301877277"
};

export const FirebaseApp = firebase.initializeApp(firebaseConfig);
export * from './users';