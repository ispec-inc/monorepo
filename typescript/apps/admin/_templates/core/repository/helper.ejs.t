---
to: core/02_repositories/<%= name %>/helper.ts
---
<%
	repositoryName = h.inflection.capitalize(name) + 'Repository'
%>import { <%= repositoryName %> } from '.'

export namespace <%= repositoryName %>Helper {

}

