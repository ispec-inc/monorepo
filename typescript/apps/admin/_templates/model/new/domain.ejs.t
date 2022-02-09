---
to: "<%= type === 'domain' ? `core/model/domain/${path}/index.ts` : null %>"
---
<%
  InterfaceName = 'I' + h.changeCase.pascalCase(name) + 'Model'
%>
export interface <%= InterfaceName %> {}

export class <%= h.changeCase.pascalCase(name) %>ModelImpl implements <%= InterfaceName %> {}

