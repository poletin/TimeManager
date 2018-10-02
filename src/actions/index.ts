import { UserAction } from "./users";
import { AuthAction } from "./auth";
import { CategoryAction } from "./categories";
import { HolidayAction } from "./holiday";

export * from "./users";
export * from "./auth";
export * from "./categories";
export * from "./holiday";

export type ALL_ACTIONS =
  | UserAction
  | AuthAction
  | CategoryAction
  | HolidayAction;
