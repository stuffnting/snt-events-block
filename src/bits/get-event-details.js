import { InfoBox } from "./info-box";
import { SNT_ALLOWED_BLOCKS } from "./constants";

const { InnerBlocks } = wp.blockEditor;

/**
 * Puts together the event details when the block is displayed in the editor.
 *
 * @see InfoBox in info-box.js
 *
 * @param {object} props  Destructured props from the React component call.
 */
export function GetEventDetails({
  metaData: { start, finish, ignoreTime, dateString, timeString },
}) {
  const startObj = Date.parse(start);
  const finishObj = Date.parse(finish);

  return (
    <div className="event-details-wrapper">
      <p className="event-details-title">Event Details</p>
      {(!start || finishObj < startObj) && (
        <InfoBox start={start} finish={finish} />
      )}
      <p className="event-detail-date">{dateString}</p>
      {!ignoreTime && <p className="event-details-time">{timeString}</p>}
      <InnerBlocks allowedBlocks={SNT_ALLOWED_BLOCKS} />
    </div>
  );
}
