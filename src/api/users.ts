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

export function generateTestData(uid: string) {
  const currentTime = new Date();
  const startedTime = new Date(currentTime.getMilliseconds() - 3600000);
  const userDoc = firebase
    .firestore()
    .collection("users")
    .doc(uid);
  const workDoc = userDoc.collection("categories").doc("work");
  const timeDoc = workDoc.collection("times").doc(startedTime.toISOString());

  const genData = async function() {
    await userDoc.set({ name: "New Name" });
    await workDoc.set({ total: 21, weeklyTarget: 42 });
    await timeDoc.set({
      minutes: 60,
      started: startedTime,
      stopped: currentTime
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
