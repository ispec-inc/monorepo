export const domainValidationToFormRule = <T>(validationFunc: (v: T) => T) => {
  return (v: T): string | boolean => {
    try {
      validationFunc(v)
    } catch(error: any) {
      return error.message
    }

    return true
  }
}

