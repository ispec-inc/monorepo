---
to: "core/service/<%= path %>/index.ts"
---
<%
  UsecaseInterfaceName = 'I' + h.changeCase.pascalCase(name) + 'Usecases'
%>

import { <%= UsecaseInterfaceName %> } from "./usecases";
import { ServiceBase } from "~/core/service/_base";

export class <%= h.changeCase.pascalCase(name) %>Service extends ServiceBase<<%= UsecaseInterfaceName %>> {}
