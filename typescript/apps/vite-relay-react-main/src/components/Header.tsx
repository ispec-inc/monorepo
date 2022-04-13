import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} m={0}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vite + Relay
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
