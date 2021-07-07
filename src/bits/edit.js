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

/**
 * The SNTEvents component is used as the block's `edit` function.
 */
export { SNTEvents };

/**
 * Render the events block
 *
 * @returns {React element} Constructed from three components:
 *                          GetInspectorControls, GetBlockControls,
 *                          and GetEventDetails. Each is passed the metadata
 *                          including the setter function.
 */
function SNTEvents() {
  const blockProps = useBlockProps();
  const metaData = useMetaData();

  // Check add/remove events cat. Also, wipe meta on block deletion
  useEffect(useEffectMetaCatCallback, []);

  // Check save-lock and warning. CB only used when metaDate.start changes.
  useEffect(() => {
    effectLockWarnCallback(metaData);
    // Returned clean up function.
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
