import "firebase/firestore";
import firebase, { RNFirebase } from "react-native-firebase";
import { getUid } from "./users";

export function fetchCategoryData() {
  const uid = getUid();

  return new Promise((resolve: (x: object | void) => void, reject) => {
    console.log(uid);
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
