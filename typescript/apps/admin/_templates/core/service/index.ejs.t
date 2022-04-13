---
to: core/03_services/<%= name %>/index.ts
---
<%
	serviceName = h.inflection.capitalize(name) + 'Service'
	interfaceName = `I${serviceName}`
%>export interface <%= interfaceName %> {
}

export class <%= serviceName %>Impl implements <%= interfaceName %> {

  constructor() {
	
	}

}

