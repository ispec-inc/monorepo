/**
 * @generated SignedSource<<e10b4f123d43e5de8d0d52f70f4914f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrentUser_Query$variables = {};
export type CurrentUser_Query$data = {
  readonly currentUser: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type CurrentUser_Query = {
  variables: CurrentUser_Query$variables;
  response: CurrentUser_Query$data;
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
    "name": "CurrentUser_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CurrentUser_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f73f1c01c1276b43d5e39f952920ac40",
    "id": null,
    "metadata": {},
    "name": "CurrentUser_Query",
    "operationKind": "query",
    "text": "query CurrentUser_Query {\n  currentUser {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "115d8211a2a9c75a4c13d7b1f2d1ff40";

export default node;
