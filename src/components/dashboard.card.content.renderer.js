import React from "react";
import Heading from "react-bulma-components/lib/components/heading";
import Level from "react-bulma-components/lib/components/level";
import Table from "react-bulma-components/lib/components/table";

function _render_suspended_not_recontacted_table(card_name, data) {
  const table_data = data[0].indicator_data;
  const cols = table_data.columns.map((el) => el.col_order);
  const cols_sorted = cols.sort();

  const card_table_header = [];
  cols_sorted.map((order) => {
    const col = table_data.columns.filter(
      (column) => column.col_order === order
    )[0];
    card_table_header.push(<th key={col.id}>{col.name}</th>);
    return null;
  });

  const card_table_data = [];
  if (table_data.data.length > 0) {
    table_data.data.map((entry) => {
      const row_data = [];
      cols_sorted.map((order) => {
        const col = table_data.columns.filter(
          (column) => column.col_order === order
        )[0];
        const value = Object.entries(entry).filter(
          (el) => el[0] === col.id
        )[0][1];
        if (order === 3) {
          row_data.push(
            <a
              href={"/datatable/all_flow_ticket_datatable/".concat(value)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          );
        } else {
          row_data.push(value);
        }

        return null;
      });
      card_table_data.push(
        <tr key={entry.AP_SD_RFC_NUMBER}>
          {row_data.map((el, index) => (
            <td key={`${entry.AP_SD_RFC_NUMBER}_${index}`}>{el}</td>
          ))}
        </tr>
      );

      return null;
    });
  }

  return (
    <React.Fragment>
      <Heading size={6}>{card_name}</Heading>
      <div className={"grid-table-overflow"}>
        <Table className={"no-drag"}>
          <thead>
            <tr>{card_table_header}</tr>
          </thead>
          <tbody>{card_table_data}</tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

function _render_requests_expiration_table(card_name, data) {
  const table_data = data[0].indicator_data;
  const cols = table_data.columns.map((el) => el.col_order);
  const cols_sorted = cols.sort();

  const card_table_header = [];
  cols_sorted.map((order) => {
    const col = table_data.columns.filter(
      (column) => column.col_order === order
    )[0];
    card_table_header.push(<th key={col.id}>{col.name}</th>);

    return null;
  });

  const card_table_data = [];
  if (table_data.data.length > 0) {
    table_data.data.map((entry) => {
      const row_data = [];
      cols_sorted.map((order) => {
        const col = table_data.columns.filter(
          (column) => column.col_order === order
        )[0];
        const value = Object.entries(entry).filter(
          (el) => el[0] === col.id
        )[0][1];
        if (order === 3) {
          row_data.push(
            <a
              href={"/datatable/ticket_flow_datatable/?tech_filter=".concat(
                value
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          );
        } else {
          row_data.push(value);
        }

        return null;
      });
      card_table_data.push(
        <tr key={entry.AP_SD_RFC_NUMBER}>
          {row_data.map((el, index) => (
            <td key={`${entry.AP_SD_RFC_NUMBER}_${index}`}>{el}</td>
          ))}
        </tr>
      );

      return null;
    });
  }

  return (
    <React.Fragment>
      <Heading size={6}>{card_name}</Heading>
      <div className={"grid-table-overflow"}>
        <Table className="no-drag">
          <thead>
            <tr>{card_table_header}</tr>
          </thead>
          <tbody>{card_table_data}</tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

function _render_tickets_by_tech_table(card_name, data) {
  const table_data = data[0].indicator_data;
  const cols = table_data.columns.map((el) => el.col_order);
  const cols_sorted = cols.sort();

  const card_table_header = [];
  cols_sorted.map((order) => {
    const col = table_data.columns.filter(
      (column) => column.col_order === order
    )[0];
    card_table_header.push(<th key={col.col_id}>{col.name}</th>);

    return null;
  });

  const card_table_data = [];
  if (table_data.data.length > 0) {
    table_data.data.map((entry) => {
      const row_data = [];
      cols_sorted.map((order) => {
        const col = table_data.columns.filter(
          (column) => column.col_order === order
        )[0];
        const value = Object.entries(entry).filter(
          (el) => el[0] === col.col_id
        )[0][1];
        if (order === 0) {
          row_data.push(
            <a
              href={"/datatable/ticket_flow_datatable/?tech_filter=".concat(
                value
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          );
        } else {
          row_data.push(value);
        }

        return null;
      });
      card_table_data.push(
        <tr key={entry.AP_SD_RFC_NUMBER}>
          {row_data.map((el, index) => (
            <td key={`${entry.AP_SD_RFC_NUMBER}_${index}`}>{el}</td>
          ))}
        </tr>
      );

      return null;
    });
  }

  return (
    <React.Fragment>
      <Heading size={6}>{card_name}</Heading>
      <Table className="no-drag">
        <thead>
          <tr>{card_table_header}</tr>
        </thead>
        <tbody>{card_table_data}</tbody>
      </Table>
    </React.Fragment>
  );
}

function _render_total_no_header(card_name, data, drilldown) {
  let total_tickets;

  try {
    total_tickets = data.filter(
      (el) => el.indicator_name === "Total tickets"
    )[0].indicator_data;
  } catch (e) {
    total_tickets = "No data";
  }

  return (
    <div className="no-drag">
      {card_name && total_tickets && (
        <React.Fragment>
          <Level>
            <Level.Side align="left">
              <Level.Item>
                <Heading
                  size={5}
                  renderAs="a"
                  href={"/datatable/" + drilldown}
                  target="_blank"
                >
                  {card_name}
                </Heading>
              </Level.Item>
            </Level.Side>
            <Level.Side align="right">
              <Level.Item>
                <Heading size={4}>{total_tickets}</Heading>
              </Level.Item>
            </Level.Side>
          </Level>
        </React.Fragment>
      )}
    </div>
  );
}

function _render_total_score(card_name, data, drilldown) {
  let total_tickets;
  let total_score;

  try {
    total_tickets = data.filter(
      (el) => el.indicator_name === "Total tickets"
    )[0].indicator_data;
  } catch (e) {
    total_tickets = "No data";
  }

  try {
    total_score = data.filter((el) => el.indicator_name === "Total score")[0]
      .indicator_data;
  } catch (e) {
    total_score = "No data";
  }

  return (
    <div className="no-drag">
      {card_name && (
        <React.Fragment>
          <Heading
            size={6}
            renderAs="a"
            href={"/datatable/" + drilldown}
            target="_blank"
          >
            {card_name}
          </Heading>
        </React.Fragment>
      )}
      {total_tickets && (
        <React.Fragment>
          <Heading size={3}>{total_tickets}</Heading>
        </React.Fragment>
      )}

      {total_score && (
        <React.Fragment>
          <Heading subtitle size={6}>
            Score: {total_score}
          </Heading>
        </React.Fragment>
      )}
    </div>
  );
}

function RenderNothing() {
  return <div></div>;
}

export default function CardContentRenderer(props) {
  switch (props.renderer) {
    case "Indicator_Total_Score":
      return _render_total_score(props.card_name, props.data, props.drilldown);

    case "Indicator_Total":
      return _render_total_no_header(
        props.card_name,
        props.data,
        props.drilldown
      );

    case "Requests_Expiration_Table":
      return _render_requests_expiration_table(props.card_name, props.data);

    case "Suspended_Not_Recontacted_Table":
      return _render_suspended_not_recontacted_table(
        props.card_name,
        props.data
      );

    case "Total_Requests_By_Tech_Table":
      return _render_tickets_by_tech_table(props.card_name, props.data);

    default:
      return RenderNothing();
  }
}
