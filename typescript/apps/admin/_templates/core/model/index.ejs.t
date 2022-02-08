---
to: core/00_models/<%= name %>/index.ts
---
<% 
	modelName = h.inflection.capitalize(name) + 'Model' 
	interfaceName = `I${modelName}` 
%>import { gql } from 'apollo-angular'
import { DocumentNode } from '@apollo/client/link/core/types'

export interface <%= interfaceName %> {
}

export class <%= modelName %> implements <%= interfaceName %> {

  private readonly _response: <%= modelName %>.AsResponse

  constructor(response: <%= modelName %>.AsResponse) {
    this._response = response
	}

  get response(): <%= modelName %>.AsResponse {
    return this._response
  }

  static schema(): DocumentNode {
    return gql`
      query queryName {
      }
    `
}

export namespace <%= modelName %> {
	export type Sample = {
		sample: string
	}
	export type AsResponse = {
		sample: Sample
	}
}


