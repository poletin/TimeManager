import firebase, { RNFirebase } from "react-native-firebase";
import { getUid } from "./users";
import moment from "moment";

export function fetchHolidays() {
  const uid = getUid();

  return new Promise((resolve: (x: object | void) => void, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("holidays")
      .get()
      .then((querySnapshot: RNFirebase.firestore.QuerySnapshot) => {
        const holidays = querySnapshot.docs.reduce(
          (holidayMap: holidays.HolidayMap, holiday) => {
            const data = holiday.data() as holidays.Holiday;
            holidayMap[holiday.id || "none"] = {
              name: data.name || holiday.id || "",
              startDay: data.startDay,
              endDay: data.endDay,
              hours: data.hours,
              isFullDay: data.isFullDay
            };
            return holidayMap;
          },
          {}
        );

        resolve(holidays);
      })
      .catch(reject);
  });
}

export function saveHoliday(holiday: holidays.Holiday) {
  const uid = getUid();
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("holidays")
    .add(holiday)
    .then(docRef => {
      return docRef.id;
    });
}
