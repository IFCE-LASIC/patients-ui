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

const columns = [
  {
    field: "id",
    headerName: "#",
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

  let execution = 0;
  useEffect(() => {
    if (execution === 0) {
      loadPatients();
      execution = 1;
    }
  }, []);

  const loadPatients = () => {
    let config = {
      headers: {
        "XCARDIO-API-KEY": "658f2bb5-101a-47b0-b0d7-0e5d23212da1",
      },
    };

    axios
      .get(`http://54.233.219.82/get_all_samples/?crm=${crm}`, config)
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

        setPatientsTable(objects);
      });
  };

  const onRowsSelectionHandler = (ids) => {
    setSelectedId(ids[0]);
  };

  return (
    <div className="container">
      <div className="back-button">
        <Link to="/">
          <Button variant="success" className="button-success">
            {" "}
            <ArrowBackIcon />
          </Button>{" "}
        </Link>
      </div>

      <Box sx={{ height: 550, width: "100%" }} className="margin-box">
        <h3>Pacientes (CRM - {crm})</h3>
        <DataGrid
          rows={patientsTable}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      </Box>

      <div className="d-flex justify-content-end mt-5">
        <div className="row ">
          <div className="col-md-3 ml-md-auto">
            <Link to={{ pathname: `/details/${crm}` }}>
              <Button variant="success" className="button-success">
                <ArticleIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
