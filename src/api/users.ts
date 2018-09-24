import "firebase/firestore";
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
    });
}

export function signOut() {
  var promise = new Promise(
    (resolve: () => void, reject: (error: Object) => void) => {
      firebase.auth().signOut();
      const unsubscribe = firebase
        .auth()
        .onAuthStateChanged((user: RNFirebase.User | null) => {
          unsubscribe();
          if (user) {
            reject(user);
          } else {
            resolve();
          }
        });
    }
  );
  return promise;
}

export function fetchUserData() {
  const uid = getUid();

  return new Promise((resolve: (x: object | void) => void, reject) => {
    const userDoc = firebase
      .firestore()
      .collection("users")
      .doc(uid);
    userDoc.get().then(doc => {
      if (doc.exists) {
        resolve(doc.data());
      } else {
        reject("Document does not Exist");
      }
    });
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

  const updateFunction = async (
    transaction: RNFirebase.firestore.Transaction
  ) => {
    transaction.set(userDoc, { name: "New Name" });
    transaction.set(workDoc, { total: 21, weeklyTarget: 42 });
    transaction.set(timeDoc, { hours: 2 });
  };

  // run the transaction
  return firebase.firestore().runTransaction(updateFunction);
}

export function saveUserSettings(user: UserState) {
  const uid = getUid();
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set({ name: user.name }, { merge: true });
}
