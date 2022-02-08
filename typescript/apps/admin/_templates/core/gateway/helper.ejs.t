---
to: core/01_gateways/<%= name %>/helper.ts
---
<%
	gatewayName = h.inflection.capitalize(name) + 'Gateway'
%>import { <%= gatewayName %> } from '.'

export namespace <%= gatewayName %>Helper {

}
