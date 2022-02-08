---
to: "core/service/<%= path %>/usecases.ts"
---
<%
  UsecaseInterfaceName = 'I' + h.changeCase.pascalCase(name) + 'Usecases'
%>

export interface <%= UsecaseInterfaceName %> {}

export class <%= h.changeCase.pascalCase(name) %>UsecasesImpl implements <%= UsecaseInterfaceName %> {}
