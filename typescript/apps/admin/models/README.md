# models

APIとの通信に利用する型はここで定義する。 

2021/6/7現在ではprotocol bufferが存在するので、その中の `{namespace}.AsObject`として定義されているtypesがプロジェクトで定義されているAPIとのinterfaceになるので、それを直接利用、もしくはドキュメントとして参照してこのmodelsでinterfaceを定義する。
`@monorepo/gen/` 以下の定義ファイルより取得可能。

必要があれば、リクエストbody用の型もここで定義する
