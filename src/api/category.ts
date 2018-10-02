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
        const categories = querySnapshot.docs.reduce(
          (categoryMap: categories.CategoryMap, category) => {
            const data = category.data() as categories.Single;
            categoryMap[category.id || "none"] = {
              name: data.name || category.id || "",
              total: data.total,
              recordingData: data.recordingData || {
                started: null,
                recordingRunning: false
              },
              weeklyTarget: data.weeklyTarget + "",
              activeDays: data.activeDays,
              resetIntervall: {
                unit: data.resetIntervall.unit,
                amount: data.resetIntervall.amount
              },
              lastUpdate: data.lastUpdate,
              isIntervall: data.isIntervall
            };
            return categoryMap;
          },
          {}
        );

        resolve(categories);
      })
      .catch(reject);
  });
}

export function fetchTimesOfCategory(category: string) {
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
  const adaptedCategory = { ...category };
  if (adaptedCategory.times) {
    delete adaptedCategory.times;
  }
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("categories")
    .doc(id)
    .set(category, { merge: true });
}

export function addCategory(category: Partial<categories.Single>) {
  const uid = getUid();
  category.total = 0;
  category.lastUpdate = moment().format("DD.MM.YYYY");
  category.recordingData = {
    recordingRunning: false,
    started: null
  };
  category.activeDays = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    ...category.activeDays
  };
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("categories")
    .add(category)
    .then(categoryDocument => {
      return {
        category: category,
        id: categoryDocument.id || "noId"
      };
    });
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
