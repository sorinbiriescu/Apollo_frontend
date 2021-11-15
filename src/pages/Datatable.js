import React, { useState, useEffect } from "react";
import { Section, Container, Heading } from "react-bulma-components";
import { useParams } from "react-router-dom";
import { SelfBuildingSquareSpinner } from "react-epic-spinners";
import Columns from "react-bulma-components/lib/components/columns";
import Content from "react-bulma-components/lib/components/content";
import DataTableFilterBar from "../components/datatable.filterbar.component";
import { cloneDeep } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import RTDatatable from "../components/datatable.rt.component";
import {
  fetchDataAPI,
  updateRequestInterventionType,
} from "../services/apollo.api.connector";
import { useHistory, useLocation } from "react-router-dom";
import datatable_list from "../config/datatable.list.json";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function filterData(current_state) {
  if (!(Array.isArray(current_state.filters) && current_state.filters.length)) {
    return current_state.data;
  }

  const boolean_masks = [];
  current_state.filters.map((filter) => {
    const active_filters = filter.value.filter((el) => el.checked === true);

    const result = current_state.data.map((entry) =>
      active_filters
        .map((el) => el.name)
        .some((el) => el.includes(entry[filter["data_target"]]))
    );
    boolean_masks.push(result);
    return true;
  });

  const boolean_result = boolean_masks.reduce((array1, array2) =>
    array1.map((value, index) => array2[index] && value)
  );

  const filtered_data = current_state.data.filter(
    (entry, index) => boolean_result[index]
  );

  return filtered_data;
}

function packForCSV(data) {
  const columnDelimiter = ";";
  const lineDelimiter = "\r\n";

  const keys = Object.keys(data[0]);

  let result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.map((item) => {
    let ctr = 0;

    keys.map((key) => {
      if (ctr > 0) result += columnDelimiter;
      const delim = '"';

      if (key === "C_RDV_DATE") {
        const options = { dateStyle: "short" };
        const new_val = new Date(parseInt(item[key])).toLocaleString(
          "fr-FR",
          options
        );
        result += delim.concat(new_val).concat(delim);

        ctr++;
        return true;
      }

      if (typeof item[key] === "string") {
        const new_val = item[key].replace(/"/g, "'");
        result += delim.concat(new_val).concat(delim);
      } else {
        result += delim.concat(item[key]).concat(delim);
      }

      ctr++;
      return true;
    });

    result += lineDelimiter;
    return true;
  });

  return result;
}

function exportToCSV(data) {
  const FileSaver = require("file-saver");
  const file = new Blob(["\ufeff" + data], {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(file, "apollo_datatable.csv");
}

function filterColumns(data) {
  const export_columns = [
    "SPOT",
    "Beneficiaire",
    "Location",
    "Statut",
    "Priorite",
    "Description",
    "Score",
    "C_RDV_STATE",
    "C_RDV_DATE",
  ];

  const result = data.map((entry) => {
    const filtered_entry = {};
    export_columns.map((allowed) => {
      filtered_entry[allowed] = entry[allowed];
      return true;
    });
    return filtered_entry;
  });

  return result;
}

function DatatableList() {
  const result_list = [];
  datatable_list.map((datatable) => {
    let datatable_url;
    if (datatable.inter_type) {
      datatable_url = `/${
        datatable.api_target
      }/?inter_type=${encodeURIComponent(datatable.inter_type)}`;
    } else {
      datatable_url = `/${datatable.api_target}`;
    }

    result_list.push(
      <li>
        <Heading
          size={6}
          renderAs="a"
          href={`/datatable${datatable_url}`}
          target="_blank"
        >
          {datatable.datatable_name}
        </Heading>
      </li>
    );
    return null;
  });
  return result_list;
}

export default function Datatable(props) {
  const history = useHistory();
  let { datatable_type } = useParams();
  const query_str = useQuery();

  const [state, setState] = useState({
    data: [],
    filters: [],
  });

  function handleExportCSV() {
    const filtered_data = filterData(state);
    const filter_columns = filterColumns(filtered_data);
    const csv_data = packForCSV(filter_columns);
    exportToCSV(csv_data);
  }

  function handleFilterChange(filters) {
    const new_state = cloneDeep(state);
    new_state.filters = filters;
    setState(new_state);
  }

  function handleCellChange(index, id, value, req_id, current_state = state) {
    if (id !== "Inter_Type") {
      return;
    }

    const payload = {
      AP_SD_REQUEST_ID: req_id,
      Type: value,
    };

    updateRequestInterventionType(payload).then((result) => {
      if (result.status === 401) {
        history.push({
          pathname: "/login",
        });
      }

      if (result.status === 200) {
        const new_state = cloneDeep(current_state);
        const idx = new_state.data.findIndex(
          (old_row) => old_row.AP_SD_REQUEST_ID === req_id
        );
        new_state.data[idx].Inter_Type = value;
        setState(new_state);

        toast.success("MAJ OK", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeButton: "hide",
        });
      } else {
        toast.error("Echec MAJ", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeButton: "hide",
        });
        console.log("update failed");
      }
    });
  }

  useEffect(() => {
    const result = async () => {
      const table_data = await Promise.allSettled([
        fetchDataAPI(datatable_type + "?" + query_str),
      ]);

      const new_state = cloneDeep(state);
      new_state.data = table_data[0].value;
      setState(new_state);
    };

    result();
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <Section>
        <Container fluid>
          <Heading>Datatable</Heading>
          {props.dt_list && <DatatableList />}
          {!(Array.isArray(state.data) && state.data.length) && !props.dt_list && (
            <Columns className="is-centered">
              <Columns.Column>
                <div>
                  <SelfBuildingSquareSpinner color="red" />
                </div>
              </Columns.Column>
            </Columns>
          )}
          {Array.isArray(state.data) && state.data.length && !props.dt_list && (
            <React.Fragment>
              <DataTableFilterBar
                onApplyFilter={handleFilterChange}
                handleExportCSV={handleExportCSV}
              />
              <RTDatatable
                data={filterData(state)}
                onCellChange={handleCellChange}
              />
            </React.Fragment>
          )}
        </Container>
      </Section>
    </React.Fragment>
  );
}
