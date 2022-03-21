import {graphql} from "relay-runtime";
import {useLazyLoadQuery} from "react-relay";
import React from "react";
import {NextPage} from "next";

const currentUser = graphql`
  query CurrentUser_nodeQuery {
    currentUser {
        id  
        name
    }
  }
`;

const CurrentUser: NextPage = () => {
  const data = useLazyLoadQuery(currentUser, {});

  console.log("data", data);

  return <div>hi</div>;
}

export default CurrentUser
