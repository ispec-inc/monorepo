import { PersonName } from '~/types/person-name'

export namespace UserModelHelper {
  export function divideName(name: string): PersonName {
    const divided = name.split(' ')
    const first = divided[1]
    const last = divided[0]
    return {
      first,
      last
    }
  }
}
