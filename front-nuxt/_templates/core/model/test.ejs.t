---
to: core/00_models/<%= name %>/test.spec.ts
---
<%
	modelName = h.inflection.capitalize(name) + 'Model'
%>import { <%= modelName %> } from '.'

describe('core/00_models/<%= name %>', () => {

})

