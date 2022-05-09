// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const domainValidationToFormRule = <T extends any[]>(
  validationFunc: (...args: T) => unknown
) => {
  return (...args: T): string | boolean => {
    try {
      validationFunc(...args)
    } catch(error: unknown) {
      const message = (error as { message: unknown })?.message
      return typeof message === 'string' 
        ? message 
        : 'An unknown error has occurred.'
    }

    return true
  }
}

