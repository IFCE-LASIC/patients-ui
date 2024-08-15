import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import "../App.css";
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
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function Home() {
  const [crm, setCrm] =  useState("");
  let url = '/patients/'

  const onInputChange = (e) => {
    setCrm(e.target.value)
    url.concat(crm);
    console.log(crm)
  };

  useEffect(() => {
    // loadStudents();
  }, []);

  return (
    <div className="container container-box">
      <form onSubmit={(e) => console.log(e)}>
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
        <Link to={{ pathname: `/patients/${crm}`}}>
        <Button type="submit" variant="success" className="button-success">
          {" "}
          <SearchIcon />
        </Button>{" "}
        </Link>
      </form>
    </div>
  );
}
