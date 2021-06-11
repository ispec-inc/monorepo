import React from 'react'
import { useHistory } from 'react-router-dom'

export const NotFoundErrorPage: React.FC = () => {
  const history = useHistory()

  return (
    <div>
      <h1>404 not found</h1>
      <button onClick={() => history.push('/')}>back</button>
    </div>
  )
}
