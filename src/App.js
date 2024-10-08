import "./App.css";
import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Patients from "./components/Patients";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/patients/:crm"} element={<Patients />} />
          <Route exact path={"/details/v2/:crm"} element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
