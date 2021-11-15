import React, { useState, useEffect } from "react";
import { Section, Container, Heading } from "react-bulma-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { cloneDeep } from "lodash";
import Level from "react-bulma-components/lib/components/level";
import Button from "react-bulma-components/lib/components/button";
import DashboardCard from "../components/dashboard.card.component";

import { v4 as uuidv4 } from "uuid";

const ResponsiveGridLayout = WidthProvider(Responsive);

function DashboardLayout(props) {
  let layout;
  if (props.savedLayout) {
    layout = {
      lg: props.savedLayout,
    };
  } else {
    layout = {
      lg: props.cards.map((card, index) => {
        return { i: card.key_id, x: index * 8, y: 0, w: 8, h: 12 };
      }),
    };
  }

  if (props.cards) {
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        useCSSTransforms={false}
        autosize={true}
        rowHeight={4}
        containerPadding={[5, 5]}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 50, md: 25, sm: 15, xs: 10, xxs: 6 }}
        onLayoutChange={props.onLayoutChange}
        draggableCancel={".no-drag"}
      >
        {props.cards.map((card_entry) => {
          return <div key={card_entry.key_id}>{card_entry.card}</div>;
        })}
      </ResponsiveGridLayout>
    );
  } else {
    return;
  }
}

export default function Dashboard() {
  const [card_list, setCardList] = useState(false);
  const [layout_state, setLayout] = useState(false);

  useEffect(() => {
    if (!card_list) {
      const saved_cards = JSON.parse(localStorage.getItem("dashboard_cards"));
      if (Array.isArray(saved_cards) && saved_cards.length > 0) {
        setCardList(saved_cards);
      }
    }

    if (!layout_state) {
      const saved_layout = JSON.parse(localStorage.getItem("dashboard_layout"));
      if (Array.isArray(saved_layout) && saved_layout.length > 0) {
        setLayout(saved_layout);
      }
    }
  }, []);

  function handleAddCards() {
    const card_id = uuidv4();
    let new_card_list;

    if (card_list) {
      new_card_list = cloneDeep(card_list);
    } else {
      new_card_list = [];
    }

    new_card_list.push(card_id);
    setCardList(new_card_list);
    localStorage.setItem("dashboard_cards", JSON.stringify(new_card_list));
  }

  function handleRemoveCard(card_uuid) {
    const card_list_tmp = cloneDeep(card_list);
    const new_card_list = card_list_tmp.filter((el) => el !== card_uuid);
    setCardList(new_card_list);
    localStorage.setItem("dashboard_cards", JSON.stringify(new_card_list));
  }

  function handleLayoutChange(new_layout) {
    localStorage.setItem("dashboard_layout", JSON.stringify(new_layout));
    setLayout(new_layout);
  }

  return (
    <React.Fragment>
      <Section>
        <Container fluid>
          <Heading>Dashboard</Heading>
          <Level>
            <Level.Side align="left">
              <Level.Item>
                <Button onClick={handleAddCards}>Ajouter un indicateur</Button>
              </Level.Item>
            </Level.Side>
          </Level>
          {card_list && (
            <DashboardLayout
              cards={card_list.map((card_uuid) => {
                return {
                  key_id: card_uuid,
                  card: (
                    <DashboardCard
                      uuid={card_uuid}
                      onCardDelete={handleRemoveCard}
                    />
                  ),
                };
              })}
              savedLayout={layout_state}
              onLayoutChange={handleLayoutChange}
            />
          )}
        </Container>
      </Section>
    </React.Fragment>
  );
}
