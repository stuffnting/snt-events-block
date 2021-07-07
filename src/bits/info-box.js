export { InfoBox };

/**
 * Lays out the info boxes that provide warnings during date entry.
 *
 * @see DateInfoBox below.
 *
 * @param {object}  Destructured props from React component call.
 *                  includes the start and finish date strings.
 *
 * @returns {React element} Contains an info box.
 */
const InfoBox = function ({ start, finish }) {
  const startObj = Date.parse(start);
  const finishObj = Date.parse(finish);

  if (!startObj && !finishObj)
    return (
      <DateInfoBox className="event-date-instruction">
        Enter event date and time.
      </DateInfoBox>
    );

  if (finishObj && !startObj)
    return (
      <DateInfoBox className="event-date-warning">
        The event must have a start date/time
      </DateInfoBox>
    );

  if (finishObj < startObj)
    return (
      <DateInfoBox className="event-date-warning">
        The finish date/time must be after the finish date/time.
      </DateInfoBox>
    );
};

/**
 * Lays out the info box content.
 *
 * @param {object} Destructured props from React component call
 *                 in get-event-details.js.
 */
function DateInfoBox({ className, children }) {
  return (
    <div className={className}>
      <span className="dashicons dashicons-info-outline"></span> {children}
    </div>
  );
}
