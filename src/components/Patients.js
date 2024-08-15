import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";
// import SchoolIcon from "@mui/icons-material/School";
// import * as routes from "../constants/routes";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import PersonIcon from "@mui/icons-material/Person";
// import GroupsIcon from "@mui/icons-material/Groups";
// import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
// import SearchIcon from "@mui/icons-material/Search";
//import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Patient from "../models/Patient";
import ArticleIcon from '@mui/icons-material/Article';


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


// let patientsTable = []


export default function Patients() {
  const { crm } = useParams();
  const [patientsTable, setPatientsTable] = useState([]);
  const [idSelected, setSelectedId] = useState([]);

  let execution = 0;
  useEffect(() => {
    if(execution === 0){
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
        // let object = new Patient();

            // setArtists([...artists , object])
        console.log(patientsTable)
        for(let i = 0; i < patients.id.length; i++){
          let object = new Patient();  
          object.id = patients.id[i];
          object.qtd_rotulacao = patients.qtd_rotulacao[i];
          object.status_crm = patients.status_crm[i]
          objects.push(object)
          console.log(object)
        }

        setPatientsTable(objects)
        console.log(objects)
        console.log(`id: ${patients.id[0]} \nqtd_rotulacao: ${patients.qtd_rotulacao[0]}\nstatus_crm: ${patients.status_crm[0]}`);
        console.log(`id: ${patients.id[1]} \nqtd_rotulacao: ${patients.qtd_rotulacao[1]}\nstatus_crm: ${patients.status_crm[1]}`);

      });

    // 

   

    // result.data.data.array.forEach(element => {
    //   console.log(patients.id[])
    // });


  };

  console.log(crm);
  const onRowsSelectionHandler = (ids) => {
    setSelectedId(ids[0])
    // const selectedRowsData = ids.map((id) =>
    //   courses.find((row) => row.id === id)
    // );
    // console.log(selectedRowsData)
    // if (selectedRowsData.length > 0) {

    //   setSelectedCourse(selectedRowsData[0]);
    //   setDisable(false);
    // } else {
    //   setSelectedCourse({});
    //   clear();
    //   setDisable(true);
    // }
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

      <Box sx={{ height: 550, width: "100%" }} className="tes">
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
            <Link to={{ pathname: `/details/${crm}`}}>
              <Button variant="success" className="button-success">
                <ArticleIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/*     
      Patients heheh
      <Link to="/details">
        <Button variant="success" className="button-success">
          {" "}
          <SearchIcon />
        </Button>{" "}
        </Link> */}
    </div>
  );
}
