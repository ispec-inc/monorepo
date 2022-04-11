---
to: "<%= type === 'domain' ? `core/models/domain/${path}/index.ts` : null %>"
---
<%
  BaseName = h.changeCase.pascalCase(path.split('/').join('-'))
%>
import { DomainModelBase } from "../_base"

interface Params {}

export class <%= BaseName %>Model extends DomainModelBase<Params> {}

