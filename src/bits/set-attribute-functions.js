import { eventDates, eventTimes } from "./date-time-strings";
import {
  SNT_META_START,
  SNT_META_FINISH,
  SNT_META_DF_FINISH,
  SNT_META_DATES,
  SNT_META_TIMES,
  SNT_META_IGNORE,
  SNT_META_DETAILS,
} from "./constants";

export { onDateChange, onChangeDetails, toggleIgnoreTime, clearDates };

/**
 * Calculate the deFactoFinish newDate string.
 *
 * @param   {string} newDate   The newDate sent from the newDate picker as yyyy-mm-ddThh:mm:ss
 *
 * @returns {string}        The deFactoFinish newDate in the format yyyy-mm-ddT23:59:59
 */
function calcDeFactoFinish(newDate) {
  return newDate ? newDate.slice(0, -8).concat("23:59:59") : "";
}

/**
 * Sets the attributes: start, finish, deFactoFinish, dateString,
 * timeString, dateStringSave and timeStringSave.
 *
 * @see eventTimes in newDate-time-strings.js
 * @see eventDates in newDate-time-strings.js
 *
 * @param {string} newDate    The newDate string sent from the newDate picker
 *                         as yyyy-mm-ddThh:mm:ss.
 * @param {string} picker  The name of the newDate picker: `start` or `finish`.
 */

function onDateChange(newDate, picker, metaData) {
  const { start, finish, deFactoFinish, meta, setMeta } = metaData;

  if (picker == "start") {
    const dateString = eventDates({ start: newDate, finish });
    const timeString = eventTimes({ start: newDate, finish });

    setMeta({
      ...meta,
      [SNT_META_START]: newDate,
      [SNT_META_DF_FINISH]: finish ? deFactoFinish : calcDeFactoFinish(newDate),
      [SNT_META_DATES]: dateString,
      [SNT_META_TIMES]: timeString,
    });
  } else if (picker == "finish") {
    const dateString = start ? eventDates({ start, finish: newDate }) : "";
    const timeString = start ? eventTimes({ start, finish: newDate }) : "";

    setMeta({
      ...meta,
      [SNT_META_FINISH]: newDate,
      [SNT_META_DF_FINISH]: calcDeFactoFinish(newDate),
      [SNT_META_DATES]: dateString,
      [SNT_META_TIMES]: timeString,
    });
  }
}

/**
 * Sets event details.
 */
function onChangeDetails(newValue, fieldName, { meta, setMeta }) {
  const newDetailsObj = Object.assign({}, meta[SNT_META_DETAILS], {
    [fieldName]: newValue,
  });

  setMeta({ ...meta, [SNT_META_DETAILS]: newDetailsObj });
}

/**
 * Sets the attributes: ignoreTime.
 */
function toggleIgnoreTime({ start, finish, ignoreTime, meta, setMeta }) {
  const timeString = eventTimes({ start, finish });

  setMeta({
    ...meta,
    [SNT_META_IGNORE]: !ignoreTime,
    [SNT_META_TIMES]: !ignoreTime ? "" : timeString,
  });
}

/**
 * Clears all the meta attributes.
 */
function clearDates(meta, setMeta) {
  setMeta({
    ...meta,
    [SNT_META_START]: "",
    [SNT_META_FINISH]: "",
    [SNT_META_DF_FINISH]: "",
    [SNT_META_DATES]: "",
    [SNT_META_TIMES]: "",
    [SNT_META_IGNORE]: false,
  });
}
