import {
  SNT_META_START,
  SNT_META_FINISH,
  SNT_META_DF_FINISH,
  SNT_META_DATES,
  SNT_META_TIMES,
  SNT_META_IGNORE,
  SNT_META_DETAILS,
} from "./constants";

const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;

export const useMetaData = () => {
  const postType = useSelect(
    (select) => select("core/editor").getCurrentPostType(),
    []
  );

  const [meta, setMeta] = useEntityProp("postType", postType, "meta");

  const start = meta[SNT_META_START] || "";
  const finish = meta[SNT_META_FINISH] || "";
  const deFactoFinish = meta[SNT_META_DF_FINISH] || "";
  const ignoreTime = meta[SNT_META_IGNORE] || false;
  const dateString = meta[SNT_META_DATES] || "";
  const timeString = meta[SNT_META_TIMES] || "";
  const details = meta[SNT_META_DETAILS] || {};

  return {
    start,
    finish,
    deFactoFinish,
    ignoreTime,
    dateString,
    timeString,
    details,
    meta,
    setMeta,
  };
};
