import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

//@ts-ignore since it otherwise does not work wir import
momentDurationFormatSetup(moment);

export const formatTimeSince = (startTime: Date) => {
  const diff = moment().diff(startTime, "seconds") / 60;
  return formatMinutes(diff);
};

export const calculateDiff = (minutes: number, startTime: Date) => {
  const duration = moment.duration(moment().diff(startTime)).asSeconds();
  return minutes * 60 + duration;
};

export const formatMinutes = (
  minutes: number,
  startTime?: Date,
  colonAsDelimiter = true
) => {
  const diff = startTime ? calculateDiff(minutes, startTime) : minutes * 60;
  let time = moment.duration(diff, "seconds");
  const days = Math.abs(time.asDays());
  if (days >= 10) {
    return time.format("dd[d]");
  }
  if (days > 1.5) {
    return time.format("dd[d] hh[h]");
  }
  if (colonAsDelimiter) {
    return time.format("hh:*mm:ss");
  } else {
    const hours = Math.abs(time.asHours());
    if (hours >= 10) {
      return time.format("*hh[h] mm[m]");
    }
    return time.format("hh[h] *mm[m] ss[s]");
  }
};

export const formatDate = (date: Date) => moment(date).format("DD.MM.YYYY");

export const formatDateTime = (date: Date) =>
  moment(date).format("DD.MM.YYYY HH:mm");

export const calculateFinishedTime = (minutes: number) => {
  return moment()
    .add(minutes, "minutes")
    .toDate();
};
