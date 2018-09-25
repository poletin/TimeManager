declare namespace auth {
  export type Status =
    | "checking"
    | "logging in"
    | "logging out"
    | "logged in"
    | "logged out";
  export interface LoginFormData {
    email: string;
    pwd: string;
    pressedButton?: "signIn" | "signUp";
  }
}

declare namespace categories {
  export interface Single {
    name: string;
    total: number;
    currentRecording: null | any; //technically RNFirebase.firestore.FieldValue but this requires import and refactoring;
    recordingRunning: boolean;
  }
}
