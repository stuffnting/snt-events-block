/**
 * The attributes are stored in ./bits/attributes.json.
 * Because the block saves values to meta fields and
 * has a `save` function to layout HTML the attributes
 * are doubled up, one for the meta and one for the
 * `save` function.
 *
 * Trying to use the meta values in the `save` function
 * did not work, and caused unpredictable block errors.
 *
 * The attributes are in ./bits/attributes.JSON, and are:
 * + start—The start time string stored in meta. Format: yyyy-mm-ddThh:mm:ss
 * + finish—The finish time string stored in meta. Format: yyyy-mm-ddThh:mm:ss
 * + deFactoFinish—A time string for the end of the day on which the event
 *   finishes. Stored in meta. Format yyyy-mm-ddT23:59:59.
 * + dateString—A human friendly string with the start and finish dates. Stored in meta
 * + timeString—A human friendly string with the start and finish times. Stored in meta
 * + ignoreTime—A boolean ,when true no times are used for the event. Stored in meta.
 * + dateStringSave—Same as `start` but saved as a normal attribute.
 * + timeStringSave—Same as `finish` but saved as a normal attribute.
 * + ignoreTimeSave—Same as `deFactoFinish` but saved as a normal attribute.
 *
 */

import { SNTEvents as edit } from "./bits/edit";
import { save } from "./bits/save";
import { SNT_BLOCK_TITLE } from "./bits/constants";

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

/**
 * *** NOTE ***
 * from_php_object set by wp_localize_script in plugin.php
 */

if (from_php_object.post_type === "post") {
  registerBlockType(SNT_BLOCK_TITLE, {
    apiVersion: 2,
    title: __("SNT Events Block", "sntEvents"),
    icon: "calendar-alt",
    category: "text",
    supports: {
      multiple: false,
    },
    edit,
    save,
  });
}
