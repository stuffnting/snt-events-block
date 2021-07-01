import {
  SNT_META_START,
  SNT_META_FINISH,
  SNT_META_DF_FINISH,
  SNT_META_DATES,
  SNT_META_TIMES,
  SNT_META_IGNORE,
} from "./constants";

const { select, dispatch } = wp.data;

export function useEffectMetaCatCallback() {
  const eventCat = parseInt(from_php_object.events_cat);
  const cats = select("core/editor").getEditedPostAttribute("categories") || [];
  const newCats = cats.filter((el) => el != 1).concat([eventCat]);

  dispatch("core/editor").editPost({
    categories: newCats,
  });

  return () => {
    const eventCat = parseInt(from_php_object.events_cat);
    const cats =
      select("core/editor").getEditedPostAttribute("categories") || [];
    const newCats = cats.filter((el) => el != eventCat);

    dispatch("core/editor").editPost({
      categories: newCats.length > 0 ? newCats : [1],
    });

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
