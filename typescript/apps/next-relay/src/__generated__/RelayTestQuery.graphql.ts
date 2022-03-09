/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelayTestQueryVariables = {};
export type RelayTestQueryResponse = {
    readonly viewer: {
        readonly id: string;
    } | null;
};
export type RelayTestQuery = {
    readonly response: RelayTestQueryResponse;
    readonly variables: RelayTestQueryVariables;
};



/*
query RelayTestQuery {
  viewer {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Viewer",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelayTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelayTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fba4f91655881b30c0b7d6b64d187f8c",
    "id": null,
    "metadata": {},
    "name": "RelayTestQuery",
    "operationKind": "query",
    "text": "query RelayTestQuery {\n  viewer {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c2e8a77d645ff98f8872847bd91a086b';
export default node;
