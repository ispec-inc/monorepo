/**
 * @generated SignedSource<<cfc833b26da3734d8653a2f33a1761ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ShipsCardQuery$variables = {};
export type ShipsCardQueryVariables = ShipsCardQuery$variables;
export type ShipsCardQuery$data = {
  readonly ships: ReadonlyArray<{
    readonly id: string | null;
    readonly name: string | null;
    readonly image: string | null;
    readonly model: string | null;
  } | null> | null;
};
export type ShipsCardQueryResponse = ShipsCardQuery$data;
export type ShipsCardQuery = {
  variables: ShipsCardQueryVariables;
  response: ShipsCardQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Ship",
    "kind": "LinkedField",
    "name": "ships",
    "plural": true,
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "model",
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
    "name": "ShipsCardQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShipsCardQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "db11a66b7bda9fb19cd3ff4011031db4",
    "id": null,
    "metadata": {},
    "name": "ShipsCardQuery",
    "operationKind": "query",
    "text": "query ShipsCardQuery {\n  ships {\n    id\n    name\n    image\n    model\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc90608dfcf5c02e2d335df79e4444e6";

export default node;
