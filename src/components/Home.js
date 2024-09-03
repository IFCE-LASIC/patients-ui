import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Home() {
  const [crm, setCrm] = useState("");
  const [hash, setHash] = useState("");
  const [message, setMessage]= useState("");
  const [showDialogEmptyFields, setShowDialogEmptyFields] = useState(false);
  const handleCloseEmptyFields = () => setShowDialogEmptyFields(false);

  const onInputChange = (e) => {
    setCrm(e.target.value);
  };
  
  const onInputChangeHash = (e) => {
    setHash(e.target.value);
    if(!e.target.value){
      localStorage.removeItem("hash");
    }
  };

  const validateCRM = () => {
    if (!!crm && !!hash) {
      localStorage.setItem("hash", hash);
      window.location.assign(`/patients/${crm}`);
    } else {
      mountMessageErro();
      setShowDialogEmptyFields(true);
    }
  };

  const mountMessageErro = () => {
    let messageBuild = "Por favor, ";
    if (!crm) {
      messageBuild += 'insira o CRM para prosseguir.';

      if (!hash) {
        messageBuild += " Insira um hash válido.";
      }
    } else if (!hash) {
      messageBuild += "insira um hash válido para prosseguir.";
    }

    setMessage(messageBuild);
  };

  useEffect(() => {
    setHash(localStorage.getItem("hash"))
  }, []);
  const getTooltip = (name) => {
    return <Tooltip id="button-tooltip">{name}</Tooltip>;
  };
  return (
    <div className="container container-box">
      <form>
      <div className="row form mt-5 box">
          <label htmlFor="name" className="required crm">
            Hash
          </label>
          <input
            type="text"
            className="form-control"
            id="hash"
            required
            name="hash"
            value={hash || ""}
            onChange={(e) => onInputChangeHash(e)}
          />
        </div>
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
          <Modal.Title>Validação - Campos inválidos</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message} </Modal.Body>
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
