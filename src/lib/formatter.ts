import moment from "moment";

export function formatDuration(d: Date, now: Date) {
  const diff = moment.duration(moment(now).diff(moment(d)));
  return (
    (diff.years() ? diff.years() + "Y " : "") +
    (diff.months() ? diff.months() + "M " : "") +
    (diff.days() ? diff.days() + "D " : "") +
    (diff.hours() ? diff.hours() + "hr " : "") +
    (diff.minutes() ? diff.minutes() + "min " : "") +
    (diff.seconds() + " sec")
  );
}
