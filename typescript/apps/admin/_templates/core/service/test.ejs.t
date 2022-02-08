---
to: core/03_services/<%= name %>/test.spec.ts
---
<%
	serviceName = h.inflection.capitalize(name) + 'Service'
%>import { <%= serviceName %> } from '.'

describe('core/03_services/<%= name %>', () => {

})

