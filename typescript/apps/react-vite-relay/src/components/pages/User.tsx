import { graphql, useLazyLoadQuery } from "react-relay";
import React from "react";

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

const User: React.FC<User> = (props) => {
  const data = useLazyLoadQuery(user, {
    id: props.userId,
  });

  console.log("data", data);

  return <div>hi</div>;
};

export default User;
