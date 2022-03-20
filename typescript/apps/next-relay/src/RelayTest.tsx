import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";

const getUser = graphql`
  query RelayTestQueryGetUser_nodeQuery($id: ID!) {
        user(id: $id) {
            id
            name
    }
  }
`;

const getUserArticles = graphql`
  query RelayTestQueryGetUserArticles_nodeQuery($userId: ID!) {
        articles(userId: $userId) {
            id  
            title
            body
    }
  }
`;

const getCurrentUser = graphql`
  query RelayTestQueryGetCurrentUser_nodeQuery {
        currentUser {
            id  
            name
    }
  }
`;

const RelayTestInner = () => {
  const data = useLazyLoadQuery(getUser, {
      id: "1"
  });

  console.log("data", data);

  return <div>hi</div>;
}

export default function RelayTest() {
  return (
      <RelayTestInner />
  );
}
