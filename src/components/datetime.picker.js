import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DatePicker,
  Dropdown,
  DatePickerInput,
  Checkbox,
  Row,
  Column,
  Button,
  ButtonSet,
  Form,
} from "carbon-components-react";

const _hours_range = [
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

const _minutes_range = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

/**
 * Creates a form for the user to select or change the date of the intervention.
 *
 * @param {Timestamp}    props.intervention_datetime If an intervention already has
 *  a date previously selected, the form will set state to this date. Must be in timestamp
 * format
 * @param {Bool} props.allday_event Marks if the event in question is an all day event
 * @param {Function} props.onDateChange Date change handler to transmit the new values
 *
 * @return {React} Returns a react component form.
 */
export default function InterventionDatetimePicker(props) {
  const today = new Date();
  today.setHours(0, 0, 0);

  const [eventDate, setEventDate] = useState(
    props.intervention_datetime
      ? Date(props.intervention_datetime).setSeconds(0)
      : null
  );
  const [invalidDate, setinvalidDate] = useState(false);
  const [hoursDropdown, setHoursDropdown] = useState(
    props.intervention_datetime
      ? Date(props.intervention_datetime).getHours()
      : null
  );
  const [minutesDropdown, setMinutesDropdown] = useState(
    props.intervention_datetime
      ? Date(props.intervention_datetime).getMinutes()
      : null
  );
  const [eventTimeEnabled, seteventTimeEnabled] = useState(
    props.allday_event ? !props.allday_event : false
  );
  const [allDayEvent, setAllDayEvent] = useState(
    props.allday_event ? props.allday_event : true
  );

  function handleDateStateChange(el) {
    const new_date = new Date(el);

    if (eventDate) {
      const old_date_hours = eventDate.getHours();
      const old_date_minutes = eventDate.getMinutes();

      new_date.setHours(old_date_hours, old_date_minutes);
    }

    setEventDate(new_date);
    setinvalidDate(false);
  }

  function handleHourChange(el) {
    const new_date = eventDate;

    new_date.setHours(parseInt(el["selectedItem"]));
    setHoursDropdown(el["selectedItem"]);
    setEventDate(new_date);
  }

  function handleMinutesChange(el) {
    const new_date = eventDate;

    new_date.setMinutes(parseInt(el["selectedItem"]));
    setMinutesDropdown(el["selectedItem"]);
    setEventDate(new_date);
  }

  function handleAllDayEventChange(el) {
    setAllDayEvent(!allDayEvent);
    seteventTimeEnabled(!eventTimeEnabled);

    if (eventDate) {
      const new_date = eventDate;
      new_date.setHours(0, 0);
      setEventDate(new_date);
    }
  }

  function handleFormReset() {
    const new_date = props.intervention_date
      ? Date(props.intervention_datetime).setSeconds(0)
      : null;
    setEventDate(new_date);
    seteventTimeEnabled(props.allday_event ? props.allday_event : true);
    setAllDayEvent(props.allday_event ? props.allday_event : true);
  }

  function handleDatetimeChange() {
    if (eventDate) {
      setinvalidDate(false);
      console.log(eventDate);
    } else {
      setinvalidDate(true);
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Column>
          <DatePicker
            datePickerType="single"
            allowInput={false}
            locale="fr"
            dateFormat="d/m/Y"
            value={eventDate}
            onChange={handleDateStateChange}
            type="inline"
          >
            <DatePickerInput
              placeholder="jj/mm/aaaa"
              labelText="Date de l'intervention"
              invalid={invalidDate}
              invalidText="Pas de date choisi"
              id={"date-picker-single_" + uuidv4()}
            />
          </DatePicker>
        </Column>
        <Column>
          <Row>
            <Dropdown
              id={"timepicker_hour_" + uuidv4()}
              type="inline"
              disabled={!((eventDate ? true : false) && eventTimeEnabled)}
              items={_hours_range}
              label="HH"
              initialSelectedItem={hoursDropdown}
              onChange={handleHourChange}
            ></Dropdown>
            <Dropdown
              id={"timepicker_minute_" + uuidv4()}
              type="inline"
              disabled={!((eventDate ? true : false) && eventTimeEnabled)}
              items={_minutes_range}
              label="MM"
              initialSelectedItem={minutesDropdown}
              onChange={handleMinutesChange}
            ></Dropdown>
          </Row>
          <Row>
            <Column>
              <Checkbox
                id={"checkbox-all_day_" + uuidv4()}
                labelText={`Toute la journée`}
                checked={allDayEvent}
                onChange={handleAllDayEventChange}
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        <Column>
          <ButtonSet>
            <Button kind="danger" type="reset" onClick={handleFormReset}>
              Delete
            </Button>
            <Button onClick={handleDatetimeChange}>Submit</Button>
          </ButtonSet>
        </Column>
      </Row>
    </React.Fragment>
  );
}
