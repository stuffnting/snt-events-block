/**
 * The SNTEvents class component is used as the `edit` function, and
 * deals with all attribute changes.
 */

import { GetInspectorControls, GetBlockControls } from "./get-controls";
import { GetEventDetails } from "./get-event-details";
import { useMetaData } from "./use-meta";
import { useEffectMetaCatCallback } from "./use-effect-meta-cat";
import {
  effectLockWarnCallback,
  effectLockWarningUnmount,
} from "./use-effect-lock-warn";

const { useEffect } = wp.element;
const { useBlockProps } = wp.blockEditor;

export { SNTEvents };

/**
 * Render the block
 *
 * @returns {React element}
 */
function SNTEvents() {
  const blockProps = useBlockProps();
  const metaData = useMetaData();

  useEffect(useEffectMetaCatCallback, []);
  useEffect(() => {
    effectLockWarnCallback(metaData);
    return effectLockWarningUnmount();
  }, [metaData.start]);

  return (
    <div {...blockProps}>
      <GetInspectorControls metaData={metaData} />
      <GetBlockControls metaData={metaData} />
      <GetEventDetails metaData={metaData} />
    </div>
  );
}
