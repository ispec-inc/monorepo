/**
 * @generated SignedSource<<92b121b10552634e076ee69c25a5d71d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrentUser_nodeQuery$variables = {};
export type CurrentUser_nodeQuery$data = {
  readonly currentUser: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type CurrentUser_nodeQuery = {
  variables: CurrentUser_nodeQuery$variables;
  response: CurrentUser_nodeQuery$data;
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
    "name": "CurrentUser_nodeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CurrentUser_nodeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e01409728e0ea81c7ec7b73f28b2adc9",
    "id": null,
    "metadata": {},
    "name": "CurrentUser_nodeQuery",
    "operationKind": "query",
    "text": "query CurrentUser_nodeQuery {\n  currentUser {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "d708c4d082c604cf3d1888d68abea0e1";

export default node;
