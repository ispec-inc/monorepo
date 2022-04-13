import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { relayEnvironment } from "../relay";
import { RelayEnvironmentProvider } from "react-relay";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { App } from "./App";
import { Dashboard } from "./components/pages/Dashboard";

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
