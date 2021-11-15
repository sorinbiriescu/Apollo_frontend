import React from "react";
import InterventionDatetimePicker from "./datetime.picker";
import "../App.scss";

export default {
  title: "Components/Intervention Datetime Picker",
  component: InterventionDatetimePicker,
};

export const Usage = () => (
  <InterventionDatetimePicker
    intervention_date={null}
    intervention_time={null}
    allday_event={null}
  ></InterventionDatetimePicker>
);
