import React from "react";
import Navbar from "react-bulma-components/lib/components/navbar";
import "react-bulma-components/dist/react-bulma-components.min.css";
import Logout from "../components/Logout";
import { ReactComponent as ApolloLogo } from "../assets/apollo_optimised.svg";
import { useHistory } from "react-router-dom";

export default function PageNavbar(props) {
  const history = useHistory();
  const voila_link = `http://${window.location.hostname}:3000/voila`

  return (
    <React.Fragment>
      <Navbar color={"dark"} fixed="top">
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="/">
            {/* <Image className="image is-32x32" src={apollo_logo}></Image>
             */}
            <ApolloLogo height="32px" width="32px" />
          </Navbar.Item>
          {/* <Navbar.Burger /> */}
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item href="/">Home</Navbar.Item>

            {props.showDashboard && (
              <React.Fragment>
                <Navbar.Item href="/dashboard">Dashboard</Navbar.Item>
              </React.Fragment>
            )}

            {props.showDataTable && (
                <Navbar.Item href="/datatable">Datatable</Navbar.Item>
            )}

            {props.showDataCalendar && (
              <Navbar.Item dropdown hoverable href="#">
                <Navbar.Link>DataCalendar</Navbar.Link>
                <Navbar.Dropdown>
                  <Navbar.Item href="/datacalendar/employee_mouvement_calendar">
                    Mouvement employés
                  </Navbar.Item>
                  <Navbar.Item href="/datacalendar/rdv_calendar">
                    RDV Dossiers
                  </Navbar.Item>
                </Navbar.Dropdown>
              </Navbar.Item>
            )}

            {props.showVoila && (
              <React.Fragment>
                <Navbar.Item href={voila_link} target="_blank">Voilà</Navbar.Item >
              </React.Fragment>
            )}
          </Navbar.Container>
          <Navbar.Container position="end">
            {props.currentUser ? (
              <React.Fragment>
                <Navbar.Item>{props.currentUser.toUpperCase()}</Navbar.Item>
                <Navbar.Item>
                  <Logout history={history}/>
                </Navbar.Item>
              </React.Fragment>
            ) : (
              <Navbar.Item href="/login">Login</Navbar.Item>
            )}
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </React.Fragment>
  );
}
