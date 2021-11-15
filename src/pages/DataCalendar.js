import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Container, Heading } from "react-bulma-components";
import { SelfBuildingSquareSpinner } from "react-epic-spinners";
import Columns from "react-bulma-components/lib/components/columns";
import { cloneDeep } from "lodash";
import FCDatatable from "../components/datacalendar.component";
import OpenModal from "../components/datacalendar.modal.component";
import Table from "react-bulma-components/lib/components/table";
import { fetchDataAPI } from "../services/apollo.api.connector";

const _generate_modal_content = (event_details, datacalendar_type) => {
  let table_el;
  switch (datacalendar_type) {
    case "employee_mouvement_calendar":
      table_el = [
        "SPOT",
        "Nom",
        "Prenom",
        "Location",
        "Contract",
        "Arrivée",
        "PC",
        "Telephone",
      ];
      break;
    case "rdv_calendar":
      table_el = [
        "SPOT",
        "Nom",
        "Location",
        "Ticket type",
        "Description"
      ];
      break;
    default:
      table_el = ["No_data"];
      break;
  }

  return (
    <Table>
      <tbody>
        {table_el.map((entry) => {
          return (
            <tr key={entry}>
              <th>{entry}</th>
              <td>{event_details[entry]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default function DataCalendar() {
  let { datacalendar_type } = useParams();

  const [state, setState] = useState({
    data: [],
    modal: {
      show: false,
      content: null,
    },
  });

  const handleShowModal = (el) => {
    const new_state = cloneDeep(state);
    new_state.modal.show = true;
    new_state.modal.content = _generate_modal_content(el, datacalendar_type);
    setState(new_state);
  };

  const handleCloseModal = () => {
    const new_state = cloneDeep(state);
    new_state.modal.show = false;
    new_state.modal.content = null;
    setState(new_state);
  };

  useEffect(() => {
    const result = async () => {
      const table_data = await Promise.allSettled([
        fetchDataAPI(datacalendar_type),
      ]);

      let new_state = cloneDeep(state);
      new_state.data = table_data[0].value;
      setState(new_state);
    };

    result();
  }, []);

  if (!(Array.isArray(state.data) && state.data.length)) {
    return (
      <React.Fragment>
        <Section>
          <Container fluid>
            <Heading>Data Calendar</Heading>
            <Columns className="is-centered">
              <Columns.Column>
                <div>
                  <SelfBuildingSquareSpinner color="red" />
                </div>
              </Columns.Column>
            </Columns>
          </Container>
        </Section>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Section>
          <Container fluid>
            <Heading>Datatable</Heading>
            <FCDatatable data={state.data} modalShow={handleShowModal} />
            <OpenModal
              show={state.modal.show}
              onClose={handleCloseModal}
              modal={{ closeOnBlur: true, showClose: false }}
            >
              {state.modal.content}
            </OpenModal>
          </Container>
        </Section>
      </React.Fragment>
    );
  }
}
