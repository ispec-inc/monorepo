import { User } from '../entity/user'

export const isUserExist = (source: User[], user: User): boolean => {
  return !!source.find(fUser => fUser.email === user.email)
}

// 本来はserver側で行う処理なのでfrontでかくことはないが、こんな感じの物を書くことがあればdomain-serviceへ
