import Modal from "react-bulma-components/lib/components/modal";
import React, { useState, useEffect } from "react";
import ModalDropdown from "../components/card.modal.dropdown";
import Button from "react-bulma-components/lib/components/button";
import {
  Field,
  Control,
  Label,
  Input,
} from "react-bulma-components/lib/components/form";

import card_list from "../config/card.list.json";

export default function CardConfigModal(props) {
  const [card_name, setName] = useState(null);
  const [key, setKey] = useState(null);
  const [indicator_list, setIndicator] = useState(null);
  const [tech_filter, setTechFilter] = useState("");
  const [drilldown, setDrilldown] = useState(null);
  const [renderer, setRenderer] = useState(null);

  function handleUserFilterChange(evt) {
    setTechFilter(evt.target.value)
  }

  function handleSaveConfig() {
    const config = {
      card_name: tech_filter ? `${card_name} (U)` : card_name,
      key: key,
      indicator_list: indicator_list,
      tech_filter: tech_filter,
      drilldown: drilldown,
      renderer: renderer,
    };
    props.onSave(config);
    props.onClose();
  }

  useEffect(() => {
    if (card_name === null) {
      return;
    }

    const card_config = card_list.filter((option) => option.card_name === card_name)[0]
    setKey(card_config.key)
    setIndicator(card_config.indicator_list)
    
    let drilldown_url = card_config.drilldown

    const drilldown_query_str = []
    if (card_config.indicator_list[0].inter_type) {
      drilldown_query_str.push(`inter_type=${encodeURIComponent(card_config.indicator_list[0].inter_type)}`)
    }

    if (tech_filter) {
      drilldown_query_str.push(`tech_filter=${encodeURIComponent(tech_filter)}`)
    }

    if (drilldown_query_str.length >0) {
      drilldown_url = drilldown_url.concat("?")
      drilldown_query_str.map((query_item, index) => {
        if (index === 0) {
          drilldown_url = drilldown_url.concat(query_item)
        }
        
        else {
          drilldown_url = drilldown_url.concat(`&${query_item}`)
        }

        return null
      })
    }

    setDrilldown(drilldown_url);
    setRenderer(card_config.renderer)
  }, [card_name, tech_filter]);

  return (
    <Modal show={props.show} onClose={props.onClose} {...props.modal}>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Config</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Field>
            <Label>Indicator</Label>
            <ModalDropdown
              options={card_list.map((el) => el.card_name)}
              onChange={setName}
            ></ModalDropdown>
          </Field>

          {card_name && (
            <React.Fragment>
              <Field>
                <Label>Technicien</Label>
                <Control>
                  <Input onChange={handleUserFilterChange} value={tech_filter}/>
                </Control>
              </Field>
            </React.Fragment>
          )}
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button renderAs="a" color="success" onClick={handleSaveConfig}>
            Save config
          </Button>
          <Button renderAs="a" color="danger" onClick={props.onClose}>
            Cancel
          </Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
}
