import React, { useEffect } from "react";
// import Button from "react-bootstrap/Button";
import "../App.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";
// import SchoolIcon from "@mui/icons-material/School";
// import * as routes from "../constants/routes";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import PersonIcon from "@mui/icons-material/Person";
// import GroupsIcon from "@mui/icons-material/Groups";
// import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";

export default function Details() {
  
  useEffect(() => {
    const result = axios.get("http://18.231.116.238/get_ids_samples/?id=2277aa40-8c7d-42d4-8279-7666606c0825");
    console.log(result.data)
  }, []);
  
  return (
    <div className="container">
        <div className="back-button">
        <Link to="/patients">
            <Button variant="success" className="button-success">
            {" "}
            <ArrowBackIcon />
            </Button>{" "}
        </Link>        
    </div>
      Patients heheh
      {/* <Link to="/patients">
        <Button variant="success" className="button-success">
          {" "}
          <ArrowBackIcon />
        </Button>{" "}
        </Link> */}
    </div>
  );
}
