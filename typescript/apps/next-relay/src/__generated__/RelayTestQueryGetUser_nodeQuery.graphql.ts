/**
 * @generated SignedSource<<9b8e023dd9b625d18f5349cd1d658285>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RelayTestQueryGetUser_nodeQuery$variables = {
  id: string;
};
export type RelayTestQueryGetUser_nodeQuery$data = {
  readonly user: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type RelayTestQueryGetUser_nodeQuery = {
  variables: RelayTestQueryGetUser_nodeQuery$variables;
  response: RelayTestQueryGetUser_nodeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RelayTestQueryGetUser_nodeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelayTestQueryGetUser_nodeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ccf6a6d4b828b9808edd112e8f5a6da6",
    "id": null,
    "metadata": {},
    "name": "RelayTestQueryGetUser_nodeQuery",
    "operationKind": "query",
    "text": "query RelayTestQueryGetUser_nodeQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "e49dff2264803b249db9cc1410efff92";

export default node;
