import firebase from "firebase";
import store from "../store";
import { userSignInSuccess, userSignOutSuccess } from "../actions";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZuPXiYld1BIFprp_LVSbNZKCpYXRUJGg",
  authDomain: "timemanager-372a6.firebaseapp.com",
  databaseURL: "https://timemanager-372a6.firebaseio.com",
  projectId: "timemanager-372a6",
  storageBucket: "timemanager-372a6.appspot.com",
  messagingSenderId: "371301877277"
};

export const FirebaseApp = getApp();

function getApp() {
  return firebase.apps.length
    ? firebase.apps[0]
    : firebase.initializeApp(firebaseConfig);
}

export * from "./users";

export const checkLoggedIn = function() {
  getApp();
  // Check if user is already signed in
  const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    unsubscribe();
    if (user) {
      console.log(user);
      // Logged in
      store.dispatch(userSignInSuccess(user.uid));
    } else {
      store.dispatch(userSignOutSuccess());
    }
  });
};
