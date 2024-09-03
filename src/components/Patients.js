import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Patient from "../models/Patient";
import ArticleIcon from "@mui/icons-material/Article";
import { mountHeader } from "../constants/config";
import { GET_ALL } from "../constants/endpoints";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Modal } from "react-bootstrap";

const columns = [
  {
    field: "id",
    headerName: "Paciente",
    width: 500,
    editable: false,
  },
  {
    field: "qtd_rotulacao",
    headerName: "Qtd rotulação",
    width: 250,
    editable: false,
  },
  {
    field: "status_crm",
    headerName: "Status CRM",
    width: 250,
    editable: false,
  },
];

export default function Patients() {
  const { crm } = useParams();
  const [patientsTable, setPatientsTable] = useState([]);
  const [idSelected, setSelectedId] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogHash, setShowDialogHash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let execution = 0;
  useEffect(() => {
    if (execution === 0) {
      setShowDialog(localStorage.getItem("saved"));
      loadPatients();
      execution = 1;
    }
  }, []);

  const getTooltip = (name) => {
    return <Tooltip id="button-tooltip">{name}</Tooltip>;
  };

  const loadPatients = () => {
    axios
      .get(`${GET_ALL}?crm=${crm}`, mountHeader(localStorage.getItem("hash")))
      .then((response) => {
        let patients = response.data;
        let objects = [];

        for (let i = 0; i < patients.id.length; i++) {
          let object = new Patient();
          object.id = patients.id[i];
          object.qtd_rotulacao = patients.qtd_rotulacao[i];
          object.status_crm = patients.status_crm[i];
          objects.push(object);
        }
        setIsLoading(false);
        setPatientsTable(objects);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setShowDialogHash(true);
          localStorage.removeItem("hash");
        }
      });
  };

  const onRowsSelectionHandler = (ids) => {
    setSelectedId(ids[0]);
  };

  const handleClose = () => setShowDialog(false);

  const handleCloseHash = () => setShowDialogHash(false);

  return (
    <div className="container">
      <div className="back-button">
        <OverlayTrigger placement="bottom" overlay={getTooltip("Voltar")}>
          <Link to="/">
            <Button variant="success" className="button-success">
              {" "}
              <ArrowBackIcon />
            </Button>{" "}
          </Link>
        </OverlayTrigger>
      </div>
      <div className="position-fill">
        {!isLoading && (
          <OverlayTrigger placement="bottom" overlay={getTooltip("Rotular")}>
            <Link to={{ pathname: `/details/v2/${crm}` }}>
              <Button
                disabled={isLoading}
                variant="success"
                className="button-success"
              >
                <ArticleIcon /> Rotular
              </Button>
            </Link>
          </OverlayTrigger>
        )}
      </div>

      {isLoading ? (
        <div class="spinner-border text-success spinner-size" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <Box sx={{ height: 550, width: "100%" }} className="margin-box">
          <h3>Pacientes (CRM - {crm})</h3>
          <DataGrid
            rows={patientsTable}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            experimentalFeatures={{ newEditingApi: true }}
            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          />
        </Box>
      )}

      <Modal
        size="md"
        show={showDialog}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo cadastro disponível</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Existem cadastros disponíveis. Realize um novo cadastramento.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="button-success"
            replace
            onClick={handleClose}
          >
            OK
          </Button>{" "}
        </Modal.Footer>
      </Modal>

      <Modal
        size="md"
        show={showDialogHash}
        onHide={handleCloseHash}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Hash inválido</Modal.Title>
        </Modal.Header>
        <Modal.Body>Por favor, insira um novo hash válido.</Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button variant="success" className="button-success" replace>
              OK
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
