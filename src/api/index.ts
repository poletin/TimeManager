import store from "../store";
import { userSignInSuccess, userSignOutSuccess } from "../actions";
import firebase, { RNFirebase } from "react-native-firebase";

export * from "./users";
export * from "./category";
export * from "./holiday";

export const checkLoggedIn = function() {
  // Check if user is already signed in
  firebase.auth().onAuthStateChanged(function(user: RNFirebase.User | null) {
    if (user) {
      // Logged in
      store.dispatch(userSignInSuccess(user));
    } else {
      store.dispatch(userSignOutSuccess());
    }
  });
};
