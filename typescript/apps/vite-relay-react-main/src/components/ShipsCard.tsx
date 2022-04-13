import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import styled from "styled-components";
import { ShipsCardQuery } from "./__generated__/ShipsCardQuery.graphql";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 15px;
`;

const ShipsCard = () => {
  const data = useLazyLoadQuery<ShipsCardQuery>(
    graphql`
      query ShipsCardQuery {
        ships {
          id
          name
          image
          model
        }
      }
    `,
    {}
  );

  return (
    <Container>
      <Grid marginTop={"10px"}>
        {data.ships?.map((ship) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={ship?.image}
                alt="ships image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {ship?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ship?.model}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default ShipsCard;
