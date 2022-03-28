---
to: "<%= type === 'payload' ? `core/models/payload/${path}/index.ts` : null %>"
---
<%
  BaseName = h.changeCase.pascalCase(path.split('/').join('-'))
  InterfaceName = 'I' + BaseName + 'PayloadModel'
%>
import { IPayloadModel } from "~/core/models/payload/_interface";

interface Params {}

export interface <%= InterfaceName %> extends Params, IPayloadModel</* Replace with the corresponding api request type */> {}

export class <%= BaseName %>PayloadModelImpl implements <%= InterfaceName %> {
  constructor(params: Params) {}
}

