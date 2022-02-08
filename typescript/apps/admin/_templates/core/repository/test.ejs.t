---
to: core/02_repositories/<%= name %>/test.spec.ts
---
<%
	repositoryName = h.inflection.capitalize(name) + 'Repository'
%>import { <%= repositoryName %> } from '.'

describe('core/02_repositories/<%= name %>', () => {

})

