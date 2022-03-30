import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { relayEnvironment } from "../relay";
import { RelayEnvironmentProvider } from "react-relay";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import User from "./components/pages/User";
import UserArticles from "./components/pages/UserArticles";
import CurrentUser from "./components/pages/CurrentUser";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/current-user" element={<CurrentUser />} />
          <Route
            path="/user-articles"
            element={<UserArticles userId={"1"} />}
          />
          <Route path="/user/1" element={<User userId={"1"} />} />
        </Routes>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
