import React, { useState } from "react";
import Hero from "react-bulma-components/lib/components/hero";
import Section from "react-bulma-components/lib/components/section";
import Container from "react-bulma-components/lib/components/container";
import Heading from "react-bulma-components/lib/components/heading";
import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import { toast } from "react-toastify";

import {
  Field,
  Control,
  Input,
} from "react-bulma-components/lib/components/form";
import Button from "react-bulma-components/lib/components/button";

import { useHistory, useLocation } from "react-router-dom";

const useLoginForm = (callback) => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default function Login() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const LoginUser = () => {
    const request_param = {
      username: inputs.username,
      password: inputs.password,
    };

    let login_form = new FormData();
    login_form.append("username", inputs.username);
    login_form.append("password", inputs.password);

    fetch("/api/token", {
      method: "POST",
      body: login_form,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          toast.error("Identifiants invalides", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            closeButton: "hide",
          });
          history.push("/login");
        }
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", request_param.username)
        }

        history.replace(from);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useLoginForm(LoginUser);

  return (
    <React.Fragment>
      <Section>
        <Hero>
          <Hero.Body>
            <Container className="has-text-centered">
              <Columns>
                <Columns.Column className="is-2 is-offset-5">
                  <Heading>APOLLO</Heading>
                  <Box>
                    <form onSubmit={LoginUser}>
                      <Field>
                        <Control>
                          <Input
                            placeholder="Username"
                            name="username"
                            onChange={handleInputChange}
                            value={inputs.username}
                          />
                        </Control>
                      </Field>
                      <Field>
                        <Control>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            value={inputs.password}
                          />
                        </Control>
                      </Field>
                      <Field>
                        <Control>
                          <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="is-block is-info is-fullwidth"
                          >
                            Login
                          </Button>
                        </Control>
                      </Field>
                    </form>
                  </Box>
                </Columns.Column>
              </Columns>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    </React.Fragment>
  );
}
