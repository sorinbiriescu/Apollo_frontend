import React, { useState } from "react";
import DataTableFilterDropdown from "./datatable.dropdown.component";
import Level from "react-bulma-components/lib/components/level";
import Button from "react-bulma-components/lib/components/button";
import { cloneDeep } from "lodash"

const inter_types_list = [
  "Pas classé",
  "Hotline",
  "Proxi - Autres",
  "Proxi - DepMat",
  "Proxi - InstMat",
  "Proxi - RemplMat",
  "Proxi - RemplTabl",
  "Proxi - LivrMat",
  "Proxi - RecMat",
  "Proxi - PretMat",
  "Proxi - Demenag",
  "Proxi - NouvArr",
  "Proxi - Depart",
  "Proxi - VIP",
  "Proxi - InterPSens",
  "Proxi - DepMatIndus",
];

const ticket_type_list = ["Incident", "Demande"];

const location_list = [
  "DHR Belley",
  "DHR Bregnier-Cordon",
  "DHR Genissiat",
  "DHR Sault Brenaz",
  "DHR Seyssel",
  "DM Siege",
  "DM Paris",
  "DM CACOH",
  "DM PLEH",
  "DM Pierre Benite",
  "DRS Vienne",
  "DRS Jean Bart",
  "DRS Gervans",
  "DRS Sablons",
  "DRS Vaugris",
  "DRI Valence",
  "DRI Bourg-les-Valences",
  "DRI Logis-Neuf",
  "DRI CH9",
  "DRI Beauchastel",
  "DRM Avignon",
  "DRM Usine Avignon",
  "DRM Beaucaire",
  "DRM Bollene",
  "DRM Caderousse",
  "DRM Barcarin",
  "Pas de location"
];

const rdv_list = [
  "Pas de RDV",
  "RDV - date invalide",
  "RDV - en retard",
  "RDV - en cours"
];

const filter_list = [
  {
    data_target: "Inter_Type",
    label: "Perimetre",
    list: inter_types_list,
  },
  {
    data_target: "C_TICKET_TYPE_STRING_FR",
    label: "Type",
    list: ticket_type_list,
  },
  {
    data_target: "Location",
    label: "Location",
    list: location_list,
  },
  {
    data_target: "C_RDV_STATE",
    label: "Etat RDV",
    list: rdv_list,
  },
];

function _generateDefaultfilterState(filter_list) {
  const state = [];
  filter_list.map((filter) => {
    const data_target = filter.data_target;
    const value = [];
    filter.list.map((filter_el) => {
      value.push({
        name: filter_el,
        checked: true,
      });
      return true
    });

    state.push({
      data_target: data_target,
      value: value,
    });
    return true
  });

  return state;
}

function _generateSingleFilterState(filter_name, checked_status) {
    const filter = filter_list.filter((el) => el.data_target === filter_name)[0]
    const value = []
    filter.list.map((filter_el) => {
      value.push({
        name: filter_el,
        checked: checked_status,
      });
      return true
    });

    return value
}

export default function DataTableFilterBar(props) {
  const [filter_state, setFilterState] = useState(
    _generateDefaultfilterState(filter_list)
  );

  const handleFilterChange = (changed_el, state = filter_state) => {
    const new_state = cloneDeep(state)
    const filter_to_change = new_state.find(
      (filter_el) =>
        filter_el.data_target === changed_el.target.dataset.data_target
    );
    filter_to_change.value.splice(
      filter_to_change.value.findIndex(
        (filter_el) => filter_el.name === changed_el.target.name
      ),
      1,
      {
        name: changed_el.target.name,
        checked: changed_el.target.checked,
      }
    );
    setFilterState(new_state);
  };

  const handleApplyFilter = () => {
    props.onApplyFilter(filter_state);
  };

  const handleResetFilter = () => {
    setFilterState(_generateDefaultfilterState(filter_list));
    props.onApplyFilter(_generateDefaultfilterState(filter_list));
  };

  const handleSelectAll = (el, state = filter_state) => {
    const new_state = cloneDeep(state)
    const filter_to_change = new_state.find(
      (filter_el) =>
        filter_el.data_target === el.target.dataset.data_target
    );
    filter_to_change.value =  _generateSingleFilterState(el.target.dataset.data_target, true)
    setFilterState(new_state);
  }

  const handleSelectNone = (el, state = filter_state) => {
    const new_state = cloneDeep(state)
    const filter_to_change = new_state.find(
      (filter_el) =>
        filter_el.data_target === el.target.dataset.data_target
    );
    filter_to_change.value =  _generateSingleFilterState(el.target.dataset.data_target, false)
    setFilterState(new_state);
  }

  const dropdown_list = [];
  dropdown_list.push(
    filter_list.map((filter) => {
      return (
        <Level.Item key={filter.data_target}>
          <DataTableFilterDropdown
            label={filter.label}
            items={
              filter_state.filter(
                (el) => el.data_target === filter.data_target
              )[0].value
            }
            data_target={filter.data_target}
            onChange={handleFilterChange}
            onSelectAll={handleSelectAll}
            onSelectNone={handleSelectNone}
          />
        </Level.Item>
      );
    })
  );

  return (
    <Level renderAs="nav">
      <Level.Side align="left">
        {dropdown_list}
        <Level.Item>
          <Button renderAs="a" color="success" onClick={handleApplyFilter}>
            Appliquer
          </Button>
        </Level.Item>
        <Level.Item>
          <Button renderAs="a" color="danger" onClick={handleResetFilter}>
            Reset filtre
          </Button>
        </Level.Item>
        <Level.Item>
          <Button renderAs="a" color="info" onClick={props.handleExportCSV}>
            Export to CSV
          </Button>
        </Level.Item>
      </Level.Side>

      {/* <Level.Side align="right">
        <Field kind="addons">
          <Control>
            <Input placeholder="Rechercher" />
          </Control>
        </Field>
      </Level.Side> */}
    </Level>
  );
}
