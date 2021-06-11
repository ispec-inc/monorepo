import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useIpAddresss } from '../../../hooks/api/external/use-ip-addresss'

const ThrowError: React.FC = () => {
  throw new Error()
}

export const HelloWorldPage: React.FC = () => {
  const [throwError, setThrowError] = useState(false)
  const [ip] = useIpAddresss()
  return (
    <div>
      {ip && <h1>ip: {ip}</h1>}
      <br />
      <NavLink to="/helloworld/1" exact>
        go to detail
      </NavLink>
      <br />
      <NavLink to="/hogehoge" exact>
        go to 404
      </NavLink>
      <br />
      <button onClick={() => setThrowError(true)}>try to render will throw error component</button>
      {throwError ? <ThrowError /> : <></>}
    </div>
  )
}
