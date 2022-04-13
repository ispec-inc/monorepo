import { graphql, useLazyLoadQuery } from "react-relay";
import React from "react";
import { UserArticles_Query } from "./__generated__/UserArticles_Query.graphql";

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

export const UserArticles: React.FC<UserArticlesProps> = (props) => {
  const data = useLazyLoadQuery<UserArticles_Query>(getUserArticles, {
    userId: props.userId,
  });

  console.log("data", data);

  return <div>hi</div>;
};
