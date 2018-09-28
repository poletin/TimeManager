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
  export interface SingleSettings {
    name: string;
    // weeklyTarget: number;
  }
  export interface Single extends SingleSettings {
    total: number;
    recordingData: {
      started: Date | null;
      recordingRunning: boolean;
    };
  }
  export interface Recording {
    categoryId: string;
    started: Date;
    stopped: Date;
    minutes: number;
  }
  export interface SettingsView {
    selectedCategory: string;
  }
}
