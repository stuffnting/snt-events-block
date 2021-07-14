import {
  SNT_META_START,
  SNT_META_FINISH,
  SNT_META_DF_FINISH,
  SNT_META_DATES,
  SNT_META_TIMES,
  SNT_META_IGNORE,
} from "./constants";

const { select, dispatch } = wp.data;

/**
 * Callback function for useEffect. Runs when the block mounts and unmounts.
 * It adds and removes the events category, and resets the metadata when the
 * block is deleted.
 *
 * @returns {function}  Called on re-render and unmount (block deletion). It removes
 *                      the events cat and clears the metadata.
 */
export function useEffectMetaCatCallback() {
  // from_php_object from inline script added by wp_add_inline_script() in plugin.php
  const eventCatID = parseInt(from_php_object.events_cat_ID);

  const catIDs =
    select("core/editor").getEditedPostAttribute("categories") || [];
  // Cat ID 1 is WP default "uncategorised"
  const newCatIDs = catIDs.filter((el) => el != 1).concat([eventCatID]);

  dispatch("core/editor").editPost({
    categories: newCatIDs,
  });

  return () => {
    // from_php_object from inline script added by wp_add_inline_script() in plugin.php
    const eventCatID = parseInt(from_php_object.events_cat_ID);

    const catIDs =
      select("core/editor").getEditedPostAttribute("categories") || [];
    const newCatIDs = catIDs.filter((el) => el != eventCatID);

    // Cat ID 1 is WP default "uncategorised"
    dispatch("core/editor").editPost({
      categories: newCatIDs.length > 0 ? newCatIDs : [1],
    });

    // Sent sent empty meta values to the store.
    dispatch("core/editor").editPost({
      meta: {
        [SNT_META_START]: "",
        [SNT_META_FINISH]: "",
        [SNT_META_DF_FINISH]: "",
        [SNT_META_IGNORE]: false,
        [SNT_META_DATES]: "",
        [SNT_META_TIMES]: "",
      },
    });
  };
}
