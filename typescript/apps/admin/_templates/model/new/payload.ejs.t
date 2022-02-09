---
to: "<%= type === 'payload' ? `core/model/payload/${path}/index.ts` : null %>"
---
<%
  InterfaceName = 'I' + h.changeCase.pascalCase(name) + 'PayloadModel'
%>
import { IPayloadModel } from "~/core/model/payload/_interface";

export interface <%= InterfaceName %> extends IPayloadModel</* Replace with the corresponding api request type */> {}

export class <%= h.changeCase.pascalCase(name) %>PayloadModelImpl implements <%= InterfaceName %> {}

