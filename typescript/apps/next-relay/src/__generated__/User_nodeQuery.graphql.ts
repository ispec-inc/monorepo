/**
 * @generated SignedSource<<d25ae95cf99d61de0f808b97af2c5a27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type User_nodeQuery$variables = {
  id: string;
};
export type User_nodeQuery$data = {
  readonly user: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type User_nodeQuery = {
  variables: User_nodeQuery$variables;
  response: User_nodeQuery$data;
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
    "name": "User_nodeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "User_nodeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8cdae393cb2368337d2679069d689ffb",
    "id": null,
    "metadata": {},
    "name": "User_nodeQuery",
    "operationKind": "query",
    "text": "query User_nodeQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "dc8313b6304ee3738a01aa3a4743866f";

export default node;
