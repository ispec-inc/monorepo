import React, { useState, useCallback, useContext } from 'react'

type gotInternalServerError = () => void

type InternalServerErrorContextValue = [gotInternalServerError]
const InternalServerErrorContext = React.createContext<InternalServerErrorContextValue>([() => {}])

type InternalServerErrorProviderProps = {
  render: () => ReturnType<React.SFC | React.FC>
}

export const InternalServerErrorProvider: React.FC<React.PropsWithChildren<InternalServerErrorProviderProps>> = (props) => {
  const [hasInternalError, setInternalError] = useState(false)
  const gotInternalServerError: gotInternalServerError = useCallback(() => setInternalError(true), [])

  const contextValue: InternalServerErrorContextValue = [gotInternalServerError]

  return (
    <InternalServerErrorContext.Provider value={contextValue}>
      {hasInternalError ? props.render() : props.children}
    </InternalServerErrorContext.Provider>
  )
}

export function useInternalServerError() {
  return useContext(InternalServerErrorContext)
}
