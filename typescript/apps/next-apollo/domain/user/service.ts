import { User } from './user'

export const isUserExist = (source: User[], user: User): boolean => {
  return !!source.find(fUser => fUser.email === user.email)
}

/*
 * 本来はserver側で行う処理なのでfrontで書くことはないが、こんな感じの物を書くことがあればdomain-serviceへ
 */
