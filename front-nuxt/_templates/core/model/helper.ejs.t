---
to: core/00_models/<%= name %>/helper.ts
---
<% 
	modelName = h.inflection.capitalize(name) + 'Model' 
	interfaceName = `I${modelName}` 
%>import { <%=interfaceName > } from './index'

export namespace <%= modelName %>Helper {
}
