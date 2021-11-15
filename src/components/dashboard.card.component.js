import React, { useState, useEffect, useCallback } from "react";
import Level from "react-bulma-components/lib/components/level";
import Box from "react-bulma-components/lib/components/box";
import CardConfigModal from "./dashboard.card.config.modal.component";
import { v4 as uuidv4 } from "uuid";
import { fetchDataAPI } from "../services/apollo.api.connector";
import CardContentRenderer from "../components/dashboard.card.content.renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "react-bulma-components/lib/components/heading";
import CardContentSkeleton from "../components/dashboard.card.content.skeleton";

export default function DashboardCard(props) {
  const uuid = props.uuid;
  const [cardConfig, setCardConfig] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [showConfigModal, setShowModal] = useState(false);
  const [showExtraOptions, setShowExtraOptions] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function showConfigBtns() {
    setShowExtraOptions(true);
  }

  function hideConfigBtns() {
    setShowExtraOptions(false);
  }

  function deleteCard() {
    props.onCardDelete(uuid);
    localStorage.removeItem(uuid);
    localStorage.removeItem(`card_config_${uuid}`);
  }

  function handleCardConfigSelection(config) {
    localStorage.setItem(`card_config_${uuid}`, JSON.stringify(config));
    setCardConfig(config);
  }

  useEffect(() => {
    if (cardConfig === null) {
      return;
    }

    const indicator_list_names = cardConfig.indicator_list.map(
      (indicator) => indicator.indicator_name
    );

    const result = async () => {
      const indicator_data = await Promise.allSettled(
        cardConfig.indicator_list.map(async (indicator) => {
          let api_url = indicator.api_target;

          const query_str = [];
          if (indicator.inter_type) {
            query_str.push(`inter_type=${encodeURIComponent(indicator.inter_type)}`);
          }

          if (cardConfig.tech_filter) {
            query_str.push(`tech_filter=${encodeURIComponent(cardConfig.tech_filter)}`);
          }

          if (query_str.length > 0) {
            api_url = api_url.concat("?");
            query_str.map((query_item, index) => {
              if (index === 0) {
                api_url = api_url.concat(query_item);
              } else {
                api_url = api_url.concat(`&${query_item}`);
              }

              return null;
            });
          }

          return fetchDataAPI(api_url);
        })
      );

      const data = indicator_data.map((item, index) => {
        return {
          indicator_name: indicator_list_names[index],
          indicator_data: item.value,
        };
      });

      setCardData(data);
    };

    result();
  }, [cardConfig]);

  const _get_card_config = useCallback(() => {
    if (cardConfig === null) {
      const saved_card_config = JSON.parse(
        localStorage.getItem(`card_config_${uuid}`)
      );
      if (
        saved_card_config !== null &&
        saved_card_config.constructor === Object &&
        Object.keys(saved_card_config).length > 0
      ) {
        setCardConfig(saved_card_config);
      }
    }
  }, []);

  useEffect(() => {
    _get_card_config();
  }, [_get_card_config]);

  return (
    <React.Fragment>
      <Box
        className={"grid-layout-no-overflow"}
        onClick={showConfigBtns}
        onMouseLeave={hideConfigBtns}
      >
        {cardConfig === null && (
          <Heading size={5}>
            <FontAwesomeIcon
              icon="exclamation-triangle"
              color="yellow"
              size="lg"
            />
            Aucun indicateur choisi
          </Heading>
        )}
        {cardConfig !== null && cardData === null && (
          <CardContentSkeleton renderer={cardConfig.renderer} />
        )}
        {cardData !== null && (
          <CardContentRenderer
            data={cardData}
            card_name={cardConfig.card_name}
            drilldown={cardConfig.drilldown}
            renderer={cardConfig.renderer}
          />
        )}
        <Level>
          <Level.Side align="left">
          {showExtraOptions && cardConfig && (
            <Level.Item>
              Tech filter: {cardConfig.tech_filter ? cardConfig.tech_filter.toUpperCase() : "None"} 
            </Level.Item>
          )}
          </Level.Side>
          <Level.Side align="right">
            {showExtraOptions && (
              <Level.Item>
                <FontAwesomeIcon
                  icon="cog"
                  color="#E5E8E8"
                  onClick={openModal}
                />
                <FontAwesomeIcon
                  icon="times"
                  color="#F1948A"
                  onClick={deleteCard}
                />
              </Level.Item>
            )}
          </Level.Side>
        </Level>
        <CardConfigModal
          key={uuidv4()}
          show={showConfigModal}
          onClose={closeModal}
          modal={{ closeOnBlur: true, showClose: true }}
          onSave={handleCardConfigSelection}
        ></CardConfigModal>
      </Box>
    </React.Fragment>
  );
}
