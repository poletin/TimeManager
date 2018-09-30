import firebase, { RNFirebase } from "react-native-firebase";
import { getUid } from "./users";
import moment from "moment";

export function fetchCategoryData() {
  const uid = getUid();

  return new Promise((resolve: (x: object | void) => void, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("categories")
      .get()
      .then((querySnapshot: RNFirebase.firestore.QuerySnapshot) => {
        resolve(querySnapshot.docs);
      })
      .catch(reject);
  });
}

export function fetchTimesOfCategory(category: string) {
  console.log("api");
  const uid = getUid();
  return (
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("categories")
      .doc(category)
      .collection("times")
      // Example how to filter
      // .where(
      //   "started",
      //   "<=",
      //   moment()
      //     .subtract(10, "day")
      //     .toDate()
      // )
      .get()
      .then((querySnapshot: RNFirebase.firestore.QuerySnapshot) =>
        querySnapshot.docs.map(doc => doc.data())
      )
  );
}

export function updateCategory(
  id: string,
  category: Partial<categories.Single>
) {
  const uid = getUid();
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("categories")
    .doc(id)
    .set(category, { merge: true });
}

export function uploadTimeRecordings(recordings: categories.Recording[]) {
  const uid = getUid();
  const categories = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("categories");

  const promises = recordings.map(recording => {
    return categories
      .doc(recording.categoryId)
      .collection("times")
      .doc(recording.started.toISOString())
      .set({
        started: recording.started,
        stopped: recording.stopped,
        minutes: recording.minutes
      });
  });
  return Promise.all(promises);
}
