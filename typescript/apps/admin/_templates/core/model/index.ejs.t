---
to: core/00_models/<%= name %>/index.ts
---
<% 
	modelName = h.inflection.capitalize(name) + 'Model' 
	interfaceName = `I${modelName}` 
%>export interface <%= interfaceName %> {

}

export class <%= modelName %> implements <%= interfaceName %> {

	constructor() {

	}

}

export namespace <%= modelName %> {

}

