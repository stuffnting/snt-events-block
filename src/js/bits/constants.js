/**
 * Defines constants for:
 *  # the block title
 *  # the meta keys
 *  # the blocks allowed as inner-blocks
 *
 * SNT_BLOCK_TITLE      The block title with namespace. Set here so that the
 *                      name can be easily changed.
 * SNT_META_START       The start date in date picker format yyyy-mm-ddThh:mm:ss.
 * SNT_META_FINISH      The finish date in date picker format yyyy-mm-ddThh:mm:ss.
 * SNT_META_DF_FINISH   23:59:59 on finish date, or start date is no finish date.
 * SNT_META_DATES       The readable date string for rendering.
 * SNT_META_TIMES       The readable time string for rendering.
 * SNT_META_IGNORE      Toggle to ignore the time string, e.g. for multi-day exhibitions.
 * SNT_META_DETAILS     An object containing the Event schema details.
 * SNT_ALLOWED_BLOCKS   An array of blocks that are allowed for the inner-blocks.
 */

export {
  SNT_BLOCK_TITLE,
  SNT_META_START,
  SNT_META_FINISH,
  SNT_META_DF_FINISH,
  SNT_META_DATES,
  SNT_META_TIMES,
  SNT_META_IGNORE,
  SNT_META_DETAILS,
  SNT_ALLOWED_BLOCKS,
};

const SNT_BLOCK_TITLE = "snt/events-block";

const SNT_META_START = "_snt_event_start";
const SNT_META_FINISH = "_snt_event_finish";
const SNT_META_DF_FINISH = "_snt_event_de_facto_finish";
const SNT_META_DATES = "_snt_event_date_string";
const SNT_META_TIMES = "_snt_event_time_string";
const SNT_META_IGNORE = "_snt_event_ignore_time";
const SNT_META_DETAILS = "_snt_event_details";

const SNT_ALLOWED_BLOCKS = ["core/paragraph", "core/heading", "core/list"];
