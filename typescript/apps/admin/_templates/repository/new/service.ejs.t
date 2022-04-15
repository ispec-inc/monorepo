---
to: "core/repositories/<%= path %>/index.ts"
---
<%
  BaseName = h.changeCase.pascalCase(path.split('/').join('-'))
  InterfaceName = 'I' + BaseName + 'Repository'
%>

import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface <%= InterfaceName %> {}

export class <%= BaseName %>RepositoryImpl implements <%= InterfaceName %> {}
