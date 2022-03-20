/**
 * @generated SignedSource<<74c3090a25fa9407890bc9e092fdcb7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RelayTestQueryGetUserArticles_nodeQuery$variables = {
  userId: string;
};
export type RelayTestQueryGetUserArticles_nodeQuery$data = {
  readonly articles: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly body: string;
  } | null> | null;
};
export type RelayTestQueryGetUserArticles_nodeQuery = {
  variables: RelayTestQueryGetUserArticles_nodeQuery$variables;
  response: RelayTestQueryGetUserArticles_nodeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "Article",
    "kind": "LinkedField",
    "name": "articles",
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
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "body",
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
    "name": "RelayTestQueryGetUserArticles_nodeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelayTestQueryGetUserArticles_nodeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "64884bef29b12968a03076adffdf2a30",
    "id": null,
    "metadata": {},
    "name": "RelayTestQueryGetUserArticles_nodeQuery",
    "operationKind": "query",
    "text": "query RelayTestQueryGetUserArticles_nodeQuery(\n  $userId: ID!\n) {\n  articles(userId: $userId) {\n    id\n    title\n    body\n  }\n}\n"
  }
};
})();

(node as any).hash = "35dde112b9288a270f3b2a962e2d969e";

export default node;
