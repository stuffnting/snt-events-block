// Constants contain meta-keys
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

/**
 * Set up the metadata.
 *
 * The meta object is detructured here for ease of use later, and to allow defaults
 * to be set. The meta keys might not exist if they have never been set.
 * The original meta object is included so that it can be spread when
 * setMeta is used in set-attribute-functions.js
 *
 * @link https://developer.wordpress.org/block-editor/how-to-guides/metabox/meta-block-3-add/
 *
 * @returns {object}  Original meta object, detructured meta values
 *                    and the WP setMeta function
 */
export const useMetaData = () => {
  const postType = useSelect(
    (select) => select("core/editor").getCurrentPostType(),
    []
  );

  // meta contains all metadata from the post, not just events metadata
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
