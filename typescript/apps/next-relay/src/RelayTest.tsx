import { Suspense } from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";

const RelayTestQuery = graphql`
  query RelayTestQuery {
    viewer {
      id
    }
  }
`;

function RelayTestInner() {
  const data = useLazyLoadQuery(RelayTestQuery, {
    variables: {},
  });

  console.log("data", data);

  return <div>hi</div>;
}

export default function RelayTest() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <RelayTestInner />
    </Suspense>
  );
}
