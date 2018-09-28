import "firebase/firestore";
import firebase, { RNFirebase } from "react-native-firebase";
import { getUid } from "./users";

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
