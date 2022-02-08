---
to: core/01_gateways/<%= name %>/index.ts
---
<%
	gatewayName = h.inflection.capitalize(name) + 'Gateway'
	interfaceName = `I${gatewayName}`
%>import { Apollo } from 'apollo-angular'
import { Observable } from 'rxjs'
export interface <%= gatewayName %> {
	fetch(): Observable<TYPE_NAME>
}

export class <%= gatewayName %>Impl implements <%= interfaceName %> {
	apollo: Apollo

  constructor(apollo: Apollo) {
		this.apollo = apollo
	}

  get response(): <%= gatewayName %>.AsResponse {
    return this._response
  }

	fetch(): Observable<> {
		return this.apollo.use(ENDPOINT_NAME)
			.watchQuery<>({
				query: MODEL_NAME.schema(),
			})
			.valueChanges
	}

}

