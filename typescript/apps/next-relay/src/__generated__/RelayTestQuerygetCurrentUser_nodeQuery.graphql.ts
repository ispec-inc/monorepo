/**
 * @generated SignedSource<<5f20c9f5ac61e8c5bc0239e74b42c2d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RelayTestQueryGetCurrentUser_nodeQuery$variables = {};
export type RelayTestQueryGetCurrentUser_nodeQuery$data = {
  readonly currentUser: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type RelayTestQueryGetCurrentUser_nodeQuery = {
  variables: RelayTestQueryGetCurrentUser_nodeQuery$variables;
  response: RelayTestQueryGetCurrentUser_nodeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "currentUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "name": "RelayTestQueryGetCurrentUser_nodeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelayTestQueryGetCurrentUser_nodeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "72b560e90c6779d198da0f564d0425da",
    "id": null,
    "metadata": {},
    "name": "RelayTestQueryGetCurrentUser_nodeQuery",
    "operationKind": "query",
    "text": "query RelayTestQueryGetCurrentUser_nodeQuery {\n  currentUser {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "cada820a5323bd4ac17dac450a32dfb4";

export default node;
