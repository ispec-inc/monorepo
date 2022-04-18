/**
 * @generated SignedSource<<4e1ef0d0c335f160adba16625cc8b7e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserArticles_Query$variables = {
  userId: string;
};
export type UserArticles_Query$data = {
  readonly articles: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly body: string;
  } | null> | null;
};
export type UserArticles_Query = {
  variables: UserArticles_Query$variables;
  response: UserArticles_Query$data;
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
    "name": "UserArticles_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserArticles_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "94856987be794a30cff0c64d039e0bb4",
    "id": null,
    "metadata": {},
    "name": "UserArticles_Query",
    "operationKind": "query",
    "text": "query UserArticles_Query(\n  $userId: ID!\n) {\n  articles(userId: $userId) {\n    id\n    title\n    body\n  }\n}\n"
  }
};
})();

(node as any).hash = "246ea627134f8973829d8cd0e0c550aa";

export default node;
