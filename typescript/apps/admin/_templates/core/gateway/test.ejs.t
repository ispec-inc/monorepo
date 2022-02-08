---
to: core/01_gateways/<%= name %>/test.spec.ts
---
<%
	gatewayName = h.inflection.capitalize(name) + 'Gateway'
%>import { <%= gatewayName %> } from '.'

describe('core/01-gateways/<%= name %>', () => {

})

