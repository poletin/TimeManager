import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

//@ts-ignore since it otherwise does not work wir import
momentDurationFormatSetup(moment);

export const formatTimeSince = (startTime: Date) => {
  const diff = moment.duration(moment().diff(startTime));
  return diff.format("hh:*mm:ss");
};

export const calculateDiff = (minutes: number, startTime: Date) => {
  const duration = moment.duration(moment().diff(startTime)).asSeconds();
  return minutes * 60 + duration;
};

export const formatMinutes = (minutes: number, startTime?: Date) => {
  const diff = startTime ? calculateDiff(minutes, startTime) : minutes * 60;
  let time = moment.duration(diff, "seconds");
  return time.format("dd [Tage] *hh:mm:ss");
};

export const formatDate = (date: Date) => moment(date).format("DD.MM.YYYY");

export const formatDateTime = (date: Date) =>
  moment(date).format("DD.MM.YYYY HH:mm");

export const calculateFinishedTime = (minutes: number) => {
  return moment()
    .subtract(minutes, "minutes")
    .toDate();
};
