import React from "react";
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

export default function Details() {
  return (
    <div className="container container-box">
      Patients heheh
      <Link to="/patients">
        <Button variant="success" className="button-success">
          {" "}
          <ArrowBackIcon />
        </Button>{" "}
        </Link>
    </div>
  );
}
