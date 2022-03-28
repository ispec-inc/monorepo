---
to: "<%= type === 'domain' ? `core/models/domain/${path}/index.ts` : null %>"
---
<%
  BaseName = h.changeCase.pascalCase(path.split('/').join('-'))
  InterfaceName = 'I' + BaseName + 'Model'
%>
interface Params {}

export interface <%= InterfaceName %> extends Params {}

export class <%= BaseName %>ModelImpl implements <%= InterfaceName %> {
  constructor(params: Params) {}
}

