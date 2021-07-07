/**
 * The `save` function only deals with the inner-blocks, and has
 * nothing to do with the meta values, which are stored separately.
 * Metadata can not be used in the `save` function.
 *
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
