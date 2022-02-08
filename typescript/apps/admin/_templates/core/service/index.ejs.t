---
to: core/03_services/<%= name %>/index.ts
---
<%
	serviceName = h.inflection.capitalize(name) + 'Service'
	interfaceName = `I${serviceName}`
%>import { Observable } from 'rxjs'
import { map } from 'rxjs/pperators'

export interface <%= interfaceName %> {
	fetch(): Observable<>
}

export class <%= serviceName %>Impl implements <%= interfaceName %> {

  constructor() {
	
	}

}

