/**
 * These functions are used by the onChange attributes of
 * the fields in get-controls.js
 *
 * ***  NOTE: The `meta` object, created in use-meta.js and
 *      passed via edit.js and get-controls, contains all the
 *      metadata for the post - not just the events metadata - and
 *      must be used to spread the existing meta into setMeta().
 *      If this is not done, metadata will be lost.
 */

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
 * Calculate the deFactoFinish, 23:59:59 the date passed.
 *
 * @param   {string}  newDate   The newDate sent from the newDate picker as
 *                              yyyy-mm-ddThh:mm:ss
 *
 * @returns {string}  The deFactoFinish newDate in the format yyyy-mm-ddT23:59:59
 */
function calcDeFactoFinish(newDate) {
  return newDate ? newDate.slice(0, -8).concat("23:59:59") : "";
}

/**
 * Sets the date and time related meta for changes
 * in both start and finish date pickers.
 *
 * @see eventTimes in newDate-time-strings.js
 * @see eventDates in newDate-time-strings.js
 *
 * @param {string}  newDate The newDate string sent from the newDate picker
 *                          as yyyy-mm-ddThh:mm:ss.
 * @param {string}  picker  The name of the newDate picker: `start` or `finish`.
 * @param {object}  metaData  The current metadata and metaSet function.
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
 * Sets non-date/time related text meta when text fields change.
 *
 * @param {string}  newValue  The updated value of the field.
 * @param {string}  fieldName The name of the field that has updated.
 * @param {object}  metaData  Desructured object with the current
 *                            metadata and the metaSet function.
 */
function onChangeDetails(newValue, fieldName, { meta, setMeta }) {
  const newDetailsObj = Object.assign({}, meta[SNT_META_DETAILS], {
    [fieldName]: newValue,
  });

  setMeta({ ...meta, [SNT_META_DETAILS]: newDetailsObj });
}

/**
 * Sets the ignoreTime meta value.
 *
 * @param {objects} metaData  destructured object with current
 *                            metadata and the metaSet function.
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
 *
 * @param {object}   The meta data.
 * @param {function} The WP metaSet function.
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
