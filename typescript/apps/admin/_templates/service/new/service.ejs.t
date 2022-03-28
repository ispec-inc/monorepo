---
to: "core/services/<%= path %>/index.ts"
---
<%
  BaseName = h.changeCase.pascalCase(path.split('/').join('-'))
%>

import { ServiceBase } from "~/core/services/_base";

interface Repositories {}

export class <%= BaseName %>PageService extends ServiceBase<Repositories> {}
