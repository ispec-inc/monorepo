import { Typography } from "@material-ui/core";
import React from "react";
import { Flex} from "rebass";

const Title = () => {
  return (
    <Flex mt={'80px'} mb={'40px'} justifyContent={'center'} alignItems={'center'}>
      <Typography variant="h6">
        <a href="https://www.spacex.com" target="_blank">
          SpaceX
        </a>{" "}
          Data Viewer
      </Typography>
    </Flex>
  );
};

export default Title;
