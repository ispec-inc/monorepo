import { graphql, useLazyLoadQuery } from "react-relay";
import React from "react";

const currentUser = graphql`
  query CurrentUser_Query {
    currentUser {
      id
      name
    }
  }
`;

const CurrentUser: React.FC = (props) => {
  const data = useLazyLoadQuery(currentUser, {});

  console.log("data", data);

  return <div>hi</div>;
};

export default CurrentUser;
