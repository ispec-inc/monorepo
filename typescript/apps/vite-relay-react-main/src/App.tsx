import { Container } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Flex } from "rebass";
import Header from "./components/Header";
import ShipsCard from "./components/ShipsCard";
import Title from "./components/Title";

export default function App(): ReactElement {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <Container>
      <Header />
      <Title />
      <ShipsCard />
      </Container>
    </Flex>
  );
}
