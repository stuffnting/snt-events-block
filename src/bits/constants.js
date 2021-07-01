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
