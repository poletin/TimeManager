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
    name?: string;
  }
}

declare namespace user {
  export interface User {
    name: string;
    dualStudent: boolean;
  }
}

declare namespace times {
  export interface DisplayTime {
    date: string;
    minutes: number;
  }
  export interface Single {
    minutes: number;
    started: Date;
    stopped: Date;
  }
}

declare namespace categories {
  export type CategoryMap = { [key: string]: categories.Single };
  export interface SingleSettings {
    name: string;
    weeklyTarget: string;
    activeDays: ActiveDays;
    resetIntervall: {
      unit: string;
      amount: string;
    };
  }
  export type ActiveDays = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  export interface Single extends SingleSettings {
    total: number;
    recordingData: {
      started: Date | null;
      recordingRunning: boolean;
    };
    times?: times.Single[];
    lastUpdate: string;
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
