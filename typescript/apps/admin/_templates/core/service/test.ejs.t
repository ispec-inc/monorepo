---
to: core/03_services/<%= name %>/test.spec.ts
---
<%
	serviceName = h.inflection.capitalize(name) + 'Service'
	interfaceName = `I${serviceName}`
%>import { <%= interfaceName %> } from '.'

describe('core/03_services/<%= name %>', () => {

})

