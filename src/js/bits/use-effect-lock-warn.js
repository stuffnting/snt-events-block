/**
 * These functions control the block's error warnings and save-lock
 */
const { select, dispatch } = wp.data;
const createErrorNotice = wp.data.dispatch("core/notices").createErrorNotice;
const removeErrorNotice = wp.data.dispatch("core/notices").removeNotice;

export function effectLockWarnCallback(metaData) {
  // Gets an array of current notices
  const getNotices = select("core/notices").getNotices();

  /**
   * If the event has no start date/time lock post and add warning.
   * If the start date/time exists remove lock and warning notice.
   */
  if (!metaData.start) {
    console.warn("The event need a start time.");

    // Put on a save-lock with ID noStartMeta
    dispatch("core/editor").lockPostSaving("noStartMeta");

    // Check for existing warning notice with ID snt-events-block-missing-start
    if (
      !getNotices.some(
        (notice) => notice.id === "snt-events-block-missing-start"
      )
    ) {
      // Notice is missing, so create it.
      createErrorNotice("The Events Block needs to have a start date", {
        id: "snt-events-block-missing-start",
      });
    }
  } else if (metaData.start) {
    dispatch("core/editor").unlockPostSaving("noStartMeta");
    removeErrorNotice("snt-events-block-missing-start");
  }
}

/**
 * When the block is unmounted, remove lock and warning.
 */
export function effectLockWarningUnmount() {
  return () => {
    dispatch("core/editor").unlockPostSaving("noStartMeta");
    removeErrorNotice("snt-events-block-missing-start");
  };
}
