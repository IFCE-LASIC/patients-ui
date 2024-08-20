import './App.css';
import React  from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Patients from './components/Patients';
import Details from './components/Details';
import DetailsV2 from './components/DetailsV2';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/patients/:crm"} element={<Patients />} />
          <Route exact path={"/details/:crm"} element={<Details />} />
          <Route exact path={"/details/v2/:crm"} element={<DetailsV2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
