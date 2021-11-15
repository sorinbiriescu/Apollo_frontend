/* eslint-disable import/first */
import React, { Suspense, useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Datatable = React.lazy(() => import("./pages/Datatable"));
const DataCalendar = React.lazy(() => import("./pages/DataCalendar"));
const Voila = React.lazy(() => import("./pages/Voila"));

import PageNavbar from "./components/PageNavbar";
import Progress from "react-bulma-components/lib/components/progress";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import { faSortAlphaDownAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthService from "./services/auth.service";

library.add(
  faSignOutAlt,
  faPlusSquare,
  faMinusSquare,
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faTimes,
  faCog,
  faExclamationTriangle
);

function LoadingPage() {
  return (
    <div>
      <Progress color="info" />
    </div>
  );
}

export default function App() {
  const [state, setState] = useState({
    showDashboard: false,
    showDataTable: false,
    showDataCalendar: false,
    showVoila: false,
    currentUser: undefined,
    isAuth: false
  })

  useEffect(() => {
    AuthService.checkToken().then((result) => {
      if (result) {
        const user = AuthService.getCurrentUser();

        if (user) {
          setState({
            showDashboard: true,
            showDataTable: true,
            showDataCalendar: true,
            showVoila: true,
            currentUser: user,
            isAuth: true
          })
        }
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Router>
        <PageNavbar
          showDashboard={state.showDashboard}
          showDataTable={state.showDataTable}
          showDataCalendar={state.showDataCalendar}
          showVoila={state.showVoila}
          currentUser={state.currentUser}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/dashboard">
            {state.isAuth && (
              <Suspense
                fallback={
                  <React.Fragment>
                    <LoadingPage />
                  </React.Fragment>
                }
              >
                <Dashboard />
              </Suspense>
            )}
          </Route>
          <Route exact path="/datatable">
            {state.isAuth && (
              <Suspense
                fallback={
                  <React.Fragment>
                    <LoadingPage />
                  </React.Fragment>
                }
              >
                <Datatable dt_list={true}/>
              </Suspense>
            )}
          </Route>
          <Route exact path="/datatable/:datatable_type">
            {state.isAuth && (
              <Suspense
                fallback={
                  <React.Fragment>
                    <LoadingPage />
                  </React.Fragment>
                }
              >
                <Datatable df_list={false}/>
              </Suspense>
            )}
          </Route>
          <Route exact path="/datatable/:datatable_type/:query_string">
            {state.isAuth && (
              <Suspense
                fallback={
                  <React.Fragment>
                    <LoadingPage />
                  </React.Fragment>
                }
              >
                <Datatable />
              </Suspense>
            )}
          </Route>
          <Route exact path="/datacalendar/:datacalendar_type">
            {state.isAuth && (
              <Suspense
                fallback={
                  <React.Fragment>
                    <LoadingPage />
                  </React.Fragment>
                }
              >
                <DataCalendar />
              </Suspense>
            )}
          </Route>
          <Route exact path="/voila">
            {state.isAuth && (
              <Suspense
                fallback={
                  <React.Fragment>
                    <LoadingPage />
                  </React.Fragment>
                }
              >
                <Voila />
              </Suspense>
            )}
          </Route>
          <Route exact path="/login">
            <ToastContainer />
            <Login />
          </Route>
          <Route path="*" component={() => "404 Not found."} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
