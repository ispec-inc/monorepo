
---
to: core/03_services/<%= name %>/helper.ts
---
<%
	serviceName = h.inflection.capitalize(name) + 'Service'
	interfaceName = `I${serviceName}`
%>import { <%= interfaceName %> } from '.'

export namespace <%= serviceName %>Helper {

}

