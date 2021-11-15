import React, { useState } from "react";
import { useTable, usePagination, useSortBy, useExpanded } from "react-table";
import Dropdown from "react-bulma-components/lib/components/dropdown";
import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bulma-components/lib/components/table";
import Pagination from "react-bulma-components/lib/components/pagination";
import Level from "react-bulma-components/lib/components/level";
import Button from "react-bulma-components/lib/components/button";

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

const InterDropdown = (props) => {
  const dropdown_options = [];
  const [state, setState] = useState(props.value);

  function interChange(selected) {
    setState(selected);
    props.onChange(selected);
  }

  inter_types_list.map((item) => {
    dropdown_options.push(
      <Dropdown.Item key={item} value={item}>
        {item}
      </Dropdown.Item>
    );
    return true;
  });

  return (
    <Dropdown value={state} right={true} onChange={interChange}>
      {dropdown_options}
    </Dropdown>
  );
};

const ItemsPerPageDropdown = (props) => {
  const dropdown_options = [10, 20, 30, 40, 50];
  const [state, setState] = useState(props.value);

  function handleChange(selected) {
    setState(selected);
    props.onChange(selected);
  }
  return (
    <Dropdown
      value={state}
      onChange={handleChange}
      label={"Show " + state}
      up={true}
    >
      {dropdown_options.map((item) => {
        return (
          <Dropdown.Item key={item} right="right" value={item}>
            {"Show " + item}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default function RTDatatable(props) {
  const data = React.useMemo(() => [...props.data], [props.data]);
  const total_entries = props.data.length;

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <React.Fragment>
        <Box>
          <Heading size={4}>Description</Heading>
          <div>{row.values["Description"]}</div>
        </Box>
      </React.Fragment>
    ),
    []
  );

  const DescriptionCell = ({
    value: initialValue,
    row: { index },
    column: { id },
  }) => {
    return (
      <React.Fragment>
        <span>{initialValue.slice(0, 150).concat("[...]")} </span>
      </React.Fragment>
    );
  };

  const TimeStampDate = ({
    value: initialValue,
    row: { index },
    column: { id },
  }) => {
    let rdv_date
    if (initialValue !== "nan") {
      const options = {dateStyle: "short"}
      rdv_date = new Date(parseInt(initialValue)).toLocaleString("fr-FR", options)
    }
    else {
      rdv_date = ""
    }
    return (
      <React.Fragment>
        <span>{rdv_date} </span>
      </React.Fragment>
    );
  };

  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
  }) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e) => {
      setValue(e);
      props.onCellChange(index, id, e, data[index]["AP_SD_REQUEST_ID"]);
    };

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <InterDropdown value={value} onChange={onChange} />;
  };

  const columns = React.useMemo(
    () => [
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
              <FontAwesomeIcon icon="minus-square" />
            ) : (
              <FontAwesomeIcon icon="plus-square" />
            )}
          </span>
        ),
      },
      {
        Header: "SPOT",
        accessor: "SPOT", 
      },
      {
        Header: "Beneficiaire",
        accessor: "Beneficiaire",
      },
      {
        Header: "Location",
        accessor: "Location",
      },
      {
        Header: "Statut",
        accessor: "Statut",
      },
      {
        Header: "Priorite",
        accessor: "Priorite",
      },
      {
        Header: "Description",
        accessor: "Description",
        Cell: DescriptionCell,
      },
      {
        Header: "Score",
        accessor: "Score",
      },
      {
        Header: "Etat_RDV",
        accessor: "C_RDV_STATE",
      },
      {
        Header: "DATE_RDV",
        accessor: "C_RDV_DATE",
        Cell: TimeStampDate,
      },
      {
        Header: "Type_inter",
        accessor: "Inter_Type",
        Cell: EditableCell,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { expanded },
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy: [
          {
            id: "Score",
            desc: true,
          },
        ],
      },
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <React.Fragment>
        <Table
          {...getTableProps()}
          className="table is-bordered is-striped is-hoverable is-fullwidth"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <Level>
                      <Level.Side align="left">
                        {column.render("Header")}
                      </Level.Side>
                      <Level.Side align="right">
                        <span>&nbsp;</span>
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? <FontAwesomeIcon icon="sort-alpha-down-alt" color="green"/>
                              : <FontAwesomeIcon icon="sort-alpha-down" color="green"/>
                            : ""}
                        </span>
                      </Level.Side>
                    </Level>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <React.Fragment>
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <strong>{"Total: "}</strong>
              </th>
              <th>
                <span>{total_entries}</span>
              </th>
            </tr>
          </tfoot>
        </Table>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <FontAwesomeIcon icon="angle-double-left" />
            </Button>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <FontAwesomeIcon icon="angle-left" />
            </Button>
          </Level.Item>
          <Level.Item>
            <Pagination
              current={pageIndex + 1}
              total={pageCount}
              delta={3}
              showPrevNext={false}
              onChange={(e) => gotoPage(e - 1)}
            ></Pagination>
          </Level.Item>
          <Level.Item>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              <FontAwesomeIcon icon="angle-right" />
            </Button>
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <FontAwesomeIcon icon="angle-double-right" />
            </Button>
          </Level.Item>
          <Level.Item>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <ItemsPerPageDropdown
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e));
              }}
            />
          </Level.Item>
        </Level.Side>
      </Level>
    </React.Fragment>
  );
}
