import firebase from "firebase";

export function signInAnonym() {
    var promise = new Promise((resolve: () => void, reject: (error:Object) => void) => {
      firebase
        .auth()
        .signInAnonymously()
        .catch((error)=>{
          reject(error);
        });
  
      firebase.auth().onAuthStateChanged(resolve);
    });
 return promise;
}