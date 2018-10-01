import { UserState } from "../reducers/user";
import firebase, { RNFirebase } from "react-native-firebase";

export function signInAnonym() {
  return firebase
    .auth()
    .signInAnonymouslyAndRetrieveData()
    .then(credential => {
      if (credential) {
        return credential.user;
      }
    })
    .catch(reason => {
      console.error(reason);
    });
}

export function signInEmail(credentials: auth.LoginFormData) {
  return firebase
    .auth()
    .signInAndRetrieveDataWithEmailAndPassword(
      credentials.email,
      credentials.pwd
    )
    .then(credentials => {
      return credentials.user;
    });
}

export function signUpEmail(credentials: auth.LoginFormData) {
  return firebase
    .auth()
    .createUserAndRetrieveDataWithEmailAndPassword(
      credentials.email,
      credentials.pwd
    )
    .then(credentials => {
      return credentials.user;
    });
}

export function signOut() {
  const user = firebase.auth().currentUser;
  if (user && user.isAnonymous) {
    return (async function() {
      await deleteData();
      await user.delete();
      return;
    })();
  }
  return firebase.auth().signOut();
}

function deleteData() {
  const uid = getUid();
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .delete();
}

export function fetchUserData() {
  const uid = getUid();
  const userDoc = firebase
    .firestore()
    .collection("users")
    .doc(uid);

  return userDoc.get().then(doc => {
    console.log(doc);
    return doc.data();
  });
}

export function getUid() {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw "Must be logged in";
  }
  const uid = currentUser.uid;
  return uid;
}

export function generateInitialData(uid: string, userName?: string) {
  const userDoc = firebase
    .firestore()
    .collection("users")
    .doc(uid);

  const genData = async function() {
    await userDoc.set({
      name: userName ? userName : "New Name",
      dualStudent: false
    });
    return;
  };
  return genData();
}

export function saveUserSettings(user: UserState) {
  const uid = getUid();
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set(user, { merge: true });
}
