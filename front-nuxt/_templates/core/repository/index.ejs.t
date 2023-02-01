---
to: core/02_repositories/<%= name %>/index.ts
---
<%
	repositoryName = h.inflection.capitalize(name) + 'Service'
	interfaceName = `I${repositoryName}`
%>export interface <%= interfaceName %> {

}

export class <%= repositoryName %>Impl implements <%= interfaceName %> {

  constructor() {
	
	}

}

