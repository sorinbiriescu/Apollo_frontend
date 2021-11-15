import Dropdown from "react-bulma-components/lib/components/dropdown";
import React, { useState } from "react";

export default function ModalDropdown(props) {
 const [selected, setSelected] = useState("Select a value")

    function handleOnChange (val) {
        props.onChange(val)
        setSelected(val)
    }
  return (
    <Dropdown className={"fullwidth-option"} hoverable value={selected} onChange={handleOnChange} label="Selectionez un indicateur">
      {props.options.map((entry) => {return (
          <Dropdown.Item key={entry} value={entry}>
          {entry}
        </Dropdown.Item>
      )})}
    </Dropdown>
  );
}
