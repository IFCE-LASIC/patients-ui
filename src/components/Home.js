import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Home() {
  const [crm, setCrm] = useState("");

  const onInputChange = (e) => {
    setCrm(e.target.value);
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
          <Link to={{ pathname: `/patients/${crm}` }}>
            <Button type="submit" variant="success" className="button-success">
              {" "}
              <SearchIcon />
            </Button>{" "}
          </Link>
        </OverlayTrigger>
      </form>
    </div>
  );
}
