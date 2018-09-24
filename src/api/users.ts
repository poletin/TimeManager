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

export function signOut() {
  return firebase.auth().signOut();
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
  const userDoc = firebase
    .firestore()
    .collection("users")
    .doc(uid);
  const workDoc = userDoc.collection("categories").doc("work");
  const timeDoc = workDoc.collection("times").doc(new Date().toUTCString());

  const genData = async function() {
    await userDoc.set({ name: "New Name" });
    await workDoc.set({ total: 21, weeklyTarget: 42 });
    await timeDoc.set({ hours: 2 });
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
    .set({ name: user.name }, { merge: true });
}
