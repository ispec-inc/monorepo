import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "./relay";
import App from "./App";
import { CircularProgress, Typography } from "@material-ui/core";
import { Flex } from 'rebass';

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={
          <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Loading Data...</Typography>
          <CircularProgress />
          </Flex>
        }>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
