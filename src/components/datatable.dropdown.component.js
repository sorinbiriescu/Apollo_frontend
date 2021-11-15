import React from "react";
import Dropdown from "react-bulma-components/lib/components/dropdown";
import { Label, Checkbox } from "react-bulma-components/lib/components/form";
import Button from "react-bulma-components/lib/components/button";
import Level from "react-bulma-components/lib/components/level";

export default function DataTableFilterDropdown(props) {
  const dropdown_options = [];
  dropdown_options.push(
    <Dropdown.Item key="select-all" value="">
      <Level>
        <Level.Item>
          <Button
            color="info"
            data-data_target={props.data_target}
            onClick={props.onSelectAll}
            className="is-small"
          >
            Tous
          </Button>
        </Level.Item>
        <Level.Item>
          <Button
            color="danger"
            data-data_target={props.data_target}
            onClick={props.onSelectNone}
            className="is-small"
          >
            None
          </Button>
        </Level.Item>
      </Level>
    </Dropdown.Item>
  );

  dropdown_options.push(
    <Dropdown.Divider key="divider"/>
  );

  props.items.map((item) => {
    dropdown_options.push(
      <Dropdown.Item key={item.name} value="">
        <Label className="checkbox">
          <Checkbox
            name={item.name}
            data-data_target={props.data_target}
            checked={item.checked}
            onChange={props.onChange}
          ></Checkbox>
          <span className="has-text-weight-normal is-size-6">{item.name}</span>
        </Label>
      </Dropdown.Item>
    );
    return true;
  });

  return (
    <Dropdown hoverable value="Select a value" label={props.label}>
      {dropdown_options}
    </Dropdown>
  );
}
