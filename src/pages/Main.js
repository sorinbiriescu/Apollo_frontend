import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Container, Heading } from "react-bulma-components";

export default function Dashboard() {
  return (
    <React.Fragment>
      <Section>
        <Container fluid>
          <Heading>Home</Heading>
          <Heading subtitle>
            Main page
          </Heading>
        </Container>
      </Section>
    </React.Fragment>
  );
}