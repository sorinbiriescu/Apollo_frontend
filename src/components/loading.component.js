import { SelfBuildingSquareSpinner } from "react-epic-spinners";
import React from "react";
import Columns from "react-bulma-components/lib/components/columns";

export default function LoadingSpinner() {
  return (
    <React.Fragment>
      <Columns className="is-centered">
        <Columns.Column>
          <div>
            <SelfBuildingSquareSpinner color="red" />
          </div>
        </Columns.Column>
      </Columns>
    </React.Fragment>
  );
}
