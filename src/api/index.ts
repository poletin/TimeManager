import store from "../store";
import { userSignInSuccess, userSignOutSuccess } from "../actions";
import firebase, { RNFirebase } from "react-native-firebase";

export * from "./users";

export const checkLoggedIn = function() {
  // Check if user is already signed in
  const unsubscribe = firebase.auth().onAuthStateChanged(function(user: RNFirebase.User|null) {
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
