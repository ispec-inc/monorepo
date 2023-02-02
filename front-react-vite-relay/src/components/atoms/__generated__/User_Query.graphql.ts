/**
 * @generated SignedSource<<5ea65ba1a1c6496714d13f6c5174d6a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type User_Query$variables = {
  id: string;
};
export type User_Query$data = {
  readonly user: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type User_Query = {
  variables: User_Query$variables;
  response: User_Query$data;
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
    "name": "User_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "User_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ea9ba3869f738612d2022f360737fc9b",
    "id": null,
    "metadata": {},
    "name": "User_Query",
    "operationKind": "query",
    "text": "query User_Query(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "65338c254a8804a6db828d3021df58b3";

export default node;
