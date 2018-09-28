import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

//@ts-ignore since it otherwise does not work wir import
momentDurationFormatSetup(moment);

export const formatTimeSince = (startTime: Date) => {
  let diff = moment.duration(moment().diff(startTime));
  return diff.format("hh:*mm:ss");
};

export const formatMinutes = (minutes: number) => {
  let diff = moment.duration(minutes, "minutes");
  return diff.format("dd [Tage] *hh:mm");
};
