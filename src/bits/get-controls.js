/**
 * The block's controls.
 *  # Block inspector:
 *    # Event Settings:
 *      # Status (schema)
 *      # Location - online or real-world (schema)
 *      # Online location website name - online only (schema)
 *      # Online location url- online only (schema)
 *      # Venue name - real-world only (schema)
 *      # Venue address - real-world only (schema)
 *      # Performers (schema)
 *      # Ignore times (e.g. Exhibition across several days)
 *      # Clear dates button
 *    # Start time date picker
 *    # Finish time date picker
 *  # Toolbar:
 *    # Clear dates button
 */

import {
  onDateChange,
  onChangeDetails,
  toggleIgnoreTime,
  clearDates,
} from "./set-attribute-functions";

const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor;
/**
 * *** NOTE: DateTimePicker causes warnings in console.
 */
const {
  DateTimePicker,
  PanelBody,
  SelectControl,
  TextControl,
  Button,
  ToolbarGroup,
  ToolbarButton,
  ToggleControl,
} = wp.components;

export { GetInspectorControls, GetBlockControls };

/**
 * Sets out the Block Inspector controls.
 *
 * @param   {object}  props   Destructured `props` from React component call in edit.js.
 *
 * @returns {React element}   Containing the Block Inspector controls.
 */
function GetInspectorControls({ metaData }) {
  const { start, finish, ignoreTime, details, meta, setMeta } = metaData;

  return (
    <InspectorControls>
      <PanelBody
        title={__("Event Settings", "sntEvents")}
        initialOpen={false}
        icon="admin-settings"
        className="snt-events-event-settings"
      >
        <p>
          These settings are used to set up the{" "}
          <a
            href="https://developers.google.com/search/docs/data-types/event"
            target="_blank"
          >
            Event schema data
          </a>{" "}
          (i.e. will be hidden), and will not appear within the events block. To
          add an address and performers that will be visible inside the block,
          add paragraph, heading, or list blocks to bottom of the event block.
        </p>
        <h3>Status</h3>
        <SelectControl
          label={__("Select an events status:", "sntEvents")}
          value={details.status}
          onChange={(newVal) => onChangeDetails(newVal, "status", metaData)}
          options={[
            { value: null, label: "Select a status" },
            { value: "EventScheduled", label: "Scheduled as normal" },
            { value: "EventRescheduled", label: "Rescheduled" },
            { value: "EventMovedOnline", label: "Moved online" },
            { value: "EventPostponed", label: "Postponed" },
            { value: "EventCancelled", label: "Cancelled" },
          ]}
        />
        <h3>Location</h3>
        <SelectControl
          label={__("Select a location type:", "sntEvents")}
          value={details.attendance_mode}
          onChange={(newVal) =>
            onChangeDetails(newVal, "attendance_mode", metaData)
          }
          options={[
            { value: null, label: "Select a location type" },
            { value: "OfflineEventAttendanceMode", label: "Real-world venue" },
            { value: "OnlineEventAttendanceMode", label: "Online" },
            {
              value: "MixedEventAttendanceMode",
              label: "Mixed (real-world and online)",
            },
          ]}
        />
        {(details.attendance_mode === "OfflineEventAttendanceMode" ||
          details.attendance_mode === "MixedEventAttendanceMode") && (
          <>
            <h4>Venue Location</h4>
            <TextControl
              label={__("Venue name", "sntEvents")}
              value={details.venue_location_name || ""}
              placeholder={__("Venue name...", "sntEvents")}
              onChange={(newVal) =>
                onChangeDetails(newVal, "venue_location_name", metaData)
              }
            />
            <TextControl
              label={__("Venue Address", "sntEvents")}
              value={details.venue_location_address || ""}
              placeholder={__("Venue address...", "sntEvents")}
              onChange={(newVal) =>
                onChangeDetails(newVal, "venue_location_address", metaData)
              }
            />
          </>
        )}
        {(details.attendance_mode === "OnlineEventAttendanceMode" ||
          details.attendance_mode === "MixedEventAttendanceMode") && (
          <>
            <h3>Online Location</h3>
            <TextControl
              label={__("Online location name", "sntEvents")}
              value={details.online_location_name || ""}
              placeholder={__("Website name...", "sntEvents")}
              onChange={(newVal) =>
                onChangeDetails(newVal, "online_location_name", metaData)
              }
            />
            <TextControl
              label={__(
                "Online location (paste full URL including https://)",
                "sntEvents"
              )}
              value={details.online_location_url || ""}
              placeholder={__("https://...", "sntEvents")}
              onChange={(newVal) =>
                onChangeDetails(newVal, "online_location_url", metaData)
              }
            />
          </>
        )}
        <h3>Performers</h3>
        <TextControl
          label={__("A comma separated list of performers", "sntEvents")}
          value={details.performers || ""}
          placeholder={__("Comma separated list...", "sntEvents")}
          onChange={(newVal) => onChangeDetails(newVal, "performers", metaData)}
        />
        <h3>Ignore Event Times</h3>
        <p>
          {__(
            "Use this switch to ignore start and finish times, so that your events will have dates only. Daily opening times can be added in the event block, under the dates.",
            "sntEvents"
          )}
        </p>
        <ToggleControl
          label={__("Ignore event times?", "sntEvents")}
          help={
            ignoreTime
              ? __("Ignore times, event has dates only.", "sntEvents")
              : __("Event has dates and times.", "sntEvents")
          }
          checked={ignoreTime}
          onChange={() => toggleIgnoreTime(metaData)}
        />
        <h3>Clear Dates and Times</h3>
        <Button
          isSecondary
          label={__("Clear dates and times", "sntEvents")}
          icon={__("dismiss", "sntEvents")}
          className="snt-clear-meta-button"
          onClick={() => clearDates(meta, setMeta)}
        >
          {__(" Clear dates", "sntEvents")}
        </Button>
      </PanelBody>
      <PanelBody
        title={__("Event Start", "sntEvents")}
        initialOpen={false}
        icon="calendar-alt"
      >
        <DateTimePicker
          currentDate={start}
          onChange={(newDate) => onDateChange(newDate, "start", metaData)}
          is12Hour={false}
        />
      </PanelBody>
      <PanelBody
        title={__("Event Finish", "sntEvents")}
        initialOpen={false}
        icon="calendar-alt"
      >
        <DateTimePicker
          currentDate={finish}
          onChange={(newDate) => onDateChange(newDate, "finish", metaData)}
          is12Hour={false}
        />
      </PanelBody>
    </InspectorControls>
  );
}

/**
 * Adds a clear dates button to the block's toolbar.
 *
 * @param   {object} props  Destructured props from the React Component call in edit.js.
 *
 * @returns {React element} Add a button the block toolbar.
 */
function GetBlockControls({ metaData: { meta, setMeta } }) {
  return (
    <BlockControls>
      <ToolbarGroup>
        <ToolbarButton
          label={__("Clear dates", "sntEvents")}
          icon="dismiss"
          className="snt-clear-meta-button"
          onClick={() => clearDates(meta, setMeta)}
        />
      </ToolbarGroup>
    </BlockControls>
  );
}
