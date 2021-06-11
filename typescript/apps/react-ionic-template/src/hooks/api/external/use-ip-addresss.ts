/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useInternalServerError } from '../../../components/providers/internal-server-error-provider'

type ApiResponse = {
  ip: string
}

const handleErrors = (res: Response) => {
  if (res.ok) {
    return res
  }

  switch (res.status) {
    case 400:
      throw Error('INVALID_TOKEN')
    case 401:
      throw Error('UNAUTHORIZED')
    case 500:
      throw Error('INTERNAL_SERVER_ERROR')
    case 502:
      throw Error('BAD_GATEWAY')
    case 404:
      throw Error('NOT_FOUND')
  }

  throw Error('UNHANDLED_ERROR')
}

export function useIpAddresss() {
  const [ip, setIp] = useState<string | null>(null)
  const [gotInternalServerError] = useInternalServerError()

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(handleErrors)
      .then((response) => response.json())
      .then((json: ApiResponse) => setIp(json.ip))
      .catch(() => gotInternalServerError()) // とりあえず纏めてInternalServerError扱いにしてる
  }, [])

  return [ip] as const
}
