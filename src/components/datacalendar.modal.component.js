import Modal from "react-bulma-components/lib/components/modal";
import React from "react";

export default function OpenModal(props) {
  return (
    <Modal show={props.show} onClose={props.onClose} {...props.modal}>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Details</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>{props.children}</Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
}
