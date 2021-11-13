# models

The types used to communicate with the API are defined here.
APIとの通信に利用する型はここで定義する。

Define the type for the request body here, if necessary.
必要があれば、リクエストbody用の型もここで定義する。


As of jun 7th, 2021, there is a protocol buffer, and the types defined as `{namespace}.AsObject` in the proto in the node_modules is the interface to the API defined in the project. So you can define the interface or can reference in this models .
You can get it from the definition file under `@monorepo/proto/`.
2021/6/7現在ではprotocol bufferが存在するので、その中の`{namespace}.AsObject`として定義されているtypesがプロジェクトで定義されているAPIとのinterfaceになるので、それを直接利用、もしくはドキュメントとして参照してこのmodelsでinterfaceを定義する。
`@monorepo/proto/` 以下の定義ファイルより取得可能。
