import React from "react";
// import Button from "react-bootstrap/Button";
import "../App.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    {
      field: "paciente",
      headerName: "Paciente",
      width: 250,
      editable: false,
    },
    {
      field: "qtd_avaliacao",
      headerName: "Avaliação",
      width: 250,
      editable: false,
    },
    // {
    //   field: "acao",
    //   headerName: "Ação",
    //   width: 250,
    //   editable: false,
    // },
  ];

  const courses = [{
    "id": 1,
    "paciente": "xxx-xxx",
    "qtd_avaliacao": "0",
  },
  {
    "id": 2,
    "paciente": "xxx-xxx",
    "qtd_avaliacao": "1",
  },
  {
    "id": 3,
    "paciente": "xxx-xxx",
    "qtd_avaliacao": "2",
  },
  {
    "id": 4,
    "paciente": "xxx-xxx",
    "qtd_avaliacao": "3",
  },
  {
    "id": 5,
    "paciente": "xxx-xxx",
    "qtd_avaliacao": "4",
  },


];

  
export default function Patients() {
    const onRowsSelectionHandler = (ids) => {
        console.log(ids);
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
        <h3>Pacientes</h3>
        <DataGrid
          rows={courses}
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
          <Link to="/details">
            <Button variant="success" className="button-success">
             <EditIcon />
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
