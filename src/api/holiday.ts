import firebase, { RNFirebase } from "react-native-firebase";
import { getUid } from "./users";
import moment from "moment";

export async function fetchPublicHolidays(state: string, year: string) {
  try {
    const response = await fetch(
      `https://feiertage-api.de/api/?jahr=${year}&nur_land=${state}`
    );
    const responseJson = (await response.json()) as {
      [key: string]: { datum: string; hinweis: string };
    };
    const holidays: holidays.Holiday[] = Object.keys(responseJson)
      .map(key => {
        const publicHoliday = responseJson[key];
        return {
          name: key,
          date: moment(publicHoliday.datum, "YYYY-MM-DD").toDate(),
          hint: publicHoliday.hinweis
        };
      })
      .filter(entry => entry.hint === "")
      .map(entry => ({
        name: entry.name,
        isFullDay: true,
        startDay: entry.date,
        endDay: entry.date
      }));
    return holidays;
  } catch (error) {
    console.error(error);
  }
}

export function batchSaveHolidays(holidays: holidays.Holiday[]) {
  const uid = getUid();
  const holidaysCollection = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("holidays");

  return Promise.all(holidays.map(holiday => holidaysCollection.add(holiday)));
}

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
