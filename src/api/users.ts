import firebase from "firebase";
import "firebase/firestore";
import { UserState } from "../reducers/user";

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export function signInAnonym() {
  var promise = new Promise(
    (
      resolve: (user: firebase.User) => void,
      reject: (error: Object) => void
    ) => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL) //Keep the user signed in
        .then(() => {
          firebase
            .auth()
            .signInAnonymously()
            .catch(reject);
        })
        .catch(reject);

      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject({ error: "No User" });
        }
      });
    }
  );
  return promise;
}

export function signOut() {
  var promise = new Promise(
    (resolve: () => void, reject: (error: Object) => void) => {
      firebase.auth().signOut();
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
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

  return new Promise((resolve, reject) => {
    const docRef = db.collection("users").doc(uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject("Document does not Exist");
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

function getUid() {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw "Must be logged in";
  }
  const uid = currentUser.uid;
  return uid;
}

export function generateTestData(uid: string) {
  const genUser = db
    .collection("users")
    .doc(uid)
    .set({ name: "Dummy" });
  const genWork = genUser.then(() => {
    return db
      .collection("users")
      .doc(uid)
      .collection("categories")
      .doc("work")
      .set({
        total: 21,
        weeklyTarget: 42
      });
  });
  const genTime = genWork.then(() => {
    return db
      .collection("users")
      .doc(uid)
      .collection("categories")
      .doc("work")
      .collection("times")
      .doc(new Date().toUTCString())
      .set({
        hours: 2
      });
  });

  return genTime;
}

export function saveUserSettings(user: UserState) {
  const uid = getUid();
  return db
    .collection("users")
    .doc(uid)
    .set({ name: user.name }, { merge: true });
}
