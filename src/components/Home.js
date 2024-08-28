import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Home() {
  const [crm, setCrm] = useState("");
  const [showDialogEmptyFields, setShowDialogEmptyFields] = useState(false);
  const handleCloseEmptyFields = () => setShowDialogEmptyFields(false);

  const onInputChange = (e) => {
    setCrm(e.target.value);
  };

  const validateCRM = () => {
    if (!!crm) {
      window.location.assign(`/patients/${crm}`);
    } else {
      setShowDialogEmptyFields(true);
    }
  };

  useEffect(() => {}, []);
  const getTooltip = (name) => {
    return <Tooltip id="button-tooltip">{name}</Tooltip>;
  };
  return (
    <div className="container container-box">
      <form>
        <div className="row form mt-5 box">
          <label htmlFor="name" className="required crm">
            CRM
          </label>
          <input
            type="text"
            className="form-control"
            id="crm"
            required
            name="crm"
            value={crm || ""}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <OverlayTrigger placement="bottom" overlay={getTooltip("Pesquisar")}>
          <span className="d-inline-block">
            <Button
              onClick={validateCRM}
              variant="success"
              className="button-success"
            >
              {" "}
              <SearchIcon />
            </Button>{" "}
          </span>
        </OverlayTrigger>
      </form>
      <Modal
        size="md"
        show={showDialogEmptyFields}
        onHide={handleCloseEmptyFields}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Validação - CRM</Modal.Title>
        </Modal.Header>
        <Modal.Body>Por favor, inserir o CRM para prosseguir.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="button-success"
            replace
            onClick={handleCloseEmptyFields}
          >
            OK
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
