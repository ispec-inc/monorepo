import { graphql, useLazyLoadQuery } from "react-relay";
import React from "react";
import { User_Query } from "./__generated__/User_Query.graphql";

const user = graphql`
  query User_Query($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;
type User = {
  userId: string;
};

export const User: React.FC<User> = (props) => {
  const data = useLazyLoadQuery<User_Query>(user, {
    id: props.userId,
  });

  console.log("data", data);

  return <div>hi</div>;
};
