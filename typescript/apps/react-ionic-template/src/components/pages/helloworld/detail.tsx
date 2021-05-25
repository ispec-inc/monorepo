import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

type HelloWorldDetailPageProps = {
  id: string
}

export const HelloWorldDetailPage: React.FC<RouteComponentProps<HelloWorldDetailPageProps>> = (props) => {
  return (
    <div>
      <h1>detail page</h1>
      <p>id: {props.match.params.id}</p>
    </div>
  )
}
