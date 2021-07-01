const { select, dispatch } = wp.data;
const createErrorNotice = wp.data.dispatch("core/notices").createErrorNotice;
const removeErrorNotice = wp.data.dispatch("core/notices").removeNotice;

export function effectLockWarnCallback(metaData) {
  const getNotices = select("core/notices").getNotices();

  if (!metaData.start) {
    console.warn("The event need a start time.");

    dispatch("core/editor").lockPostSaving("noStartMeta");

    if (
      !getNotices.some(
        (notice) => notice.id === "snt-events-block-missing-start"
      )
    ) {
      createErrorNotice("The Events Block needs to have a start date", {
        id: "snt-events-block-missing-start",
      });
    }
  } else if (metaData.start) {
    dispatch("core/editor").unlockPostSaving("noStartMeta");
    removeErrorNotice("snt-events-block-missing-start");
  }
}

export function effectLockWarningUnmount() {
  return () => {
    dispatch("core/editor").unlockPostSaving("noStartMeta");
    removeErrorNotice("snt-events-block-missing-start");
  };
}
