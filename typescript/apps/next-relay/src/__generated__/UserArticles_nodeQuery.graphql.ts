/**
 * @generated SignedSource<<83dd33270de4807ae69562cd9b6c4e43>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserArticles_nodeQuery$variables = {
  userId: string;
};
export type UserArticles_nodeQuery$data = {
  readonly articles: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly body: string;
  } | null> | null;
};
export type UserArticles_nodeQuery = {
  variables: UserArticles_nodeQuery$variables;
  response: UserArticles_nodeQuery$data;
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
    "name": "UserArticles_nodeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserArticles_nodeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c8d4931c7543b9f2b0d43f8426656ba7",
    "id": null,
    "metadata": {},
    "name": "UserArticles_nodeQuery",
    "operationKind": "query",
    "text": "query UserArticles_nodeQuery(\n  $userId: ID!\n) {\n  articles(userId: $userId) {\n    id\n    title\n    body\n  }\n}\n"
  }
};
})();

(node as any).hash = "95a23347bc9849d51d71647aa1041e10";

export default node;
