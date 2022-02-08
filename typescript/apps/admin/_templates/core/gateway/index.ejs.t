---
to: core/01_gateways/<%= name %>/index.ts
---
<%
	gatewayName = h.inflection.capitalize(name) + 'Gateway'
	interfaceName = `I${gatewayName}`
%>export interface <%= gatewayName %> {

}

export class <%= gatewayName %>Impl implements <%= interfaceName %> {

	constructor() {

	}

}

