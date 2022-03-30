import { graphql, useLazyLoadQuery } from "react-relay";
import React from "react";

const getUserArticles = graphql`
  query UserArticles_Query($userId: ID!) {
    articles(userId: $userId) {
      id
      title
      body
    }
  }
`;

type UserArticlesProps = {
  userId: string;
};

const UserArticles: React.FC<UserArticlesProps> = (props) => {
  const data = useLazyLoadQuery(getUserArticles, {
    userId: props.userId,
  });

  console.log("data", data);

  return <div>hi</div>;
};

export default UserArticles;
