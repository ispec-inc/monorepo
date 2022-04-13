import { graphql, useLazyLoadQuery } from "react-relay";
import React from "react";
import { CurrentUser_Query } from "../../__generated__/CurrentUser_Query.graphql";

const currentUser = graphql`
  query CurrentUser_Query {
    currentUser {
      id
      name
    }
  }
`;

export const CurrentUser: React.FC = (props) => {
  const data = useLazyLoadQuery<CurrentUser_Query>(currentUser, {});

  console.log("data", data);

  return <div>hi</div>;
};
