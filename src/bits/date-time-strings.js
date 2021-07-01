const { format: formatDate } = wp.date;

export { eventDates, eventTimes };

/**
 * Create the time string.
 *
 * @param {object} Destructured. Contain the start and finish date strings.
 */
function eventTimes({ start, finish }) {
  if (!start) {
    return null;
  }

  const timeFormat = "g:i A";

  const startTime = formatDate(timeFormat, start);
  const finishTime = finish ? formatDate(timeFormat, finish) : false;

  return `At ${startTime}${finishTime ? " until " + finishTime : ""}`;
}

/**
 * Create the date string.
 *
 * @param {object} Destructured. Contain the start and finish date strings.
 */
const eventDates = ({ start, finish }) => {
  if (!start) {
    return null;
  }

  const dateFormat = "l j F";
  const yearFormat = "Y";

  const startDate = formatDate(dateFormat, start);
  const startYear = formatDate(yearFormat, start);

  const finishDate =
    finish && formatDate("l F j Y", finish) != formatDate("l F j Y", start)
      ? finish && formatDate(dateFormat, finish)
      : false;
  const finishYear =
    finish && formatDate("Y", finish) != formatDate("Y", start)
      ? formatDate(yearFormat, finish)
      : false;

  return `${startDate}${finishYear ? ", " + startYear : ""}${
    finishDate ? " to " : ""
  }${finishDate ? finishDate : ""}${
    finishYear ? ", " + finishYear : ", " + startYear
  }`;
};
