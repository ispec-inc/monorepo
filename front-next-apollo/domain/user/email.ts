export type UserEmail = Readonly<string>

/* 
 * formで無理に利用する必要はない
 * form validation libraryを使うのであれば、それに頼るのが良さそうである。
 * それで対応しきれないようなバリデーションを持つformがあればきっとそれはドメイン知識なので、
 * そのときはこのdomain層に隔離できるようにすれば良さそう。
 *
 * その値が保証されている状態で使いたい場合は、UserEmail の 型がついているだけでは保証されないので、
 * そのユースケースの場合などは class の形を適宜採用する。
 *
 * class UserEmail {
 *   readonly value: string
 *   constructor(email: string) {
 *     if (!email) { ... }
 *     if (!emailPattern.test(email)) { ... }
 *     this.value = email
 *   }
 * }
 */

// constructor

const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/

export const createUserEmail = (v: string): UserEmail => {
  if (!v) {
    throw new RangeError('email は必須です')
  }
  if (!emailPattern.test(v)) {
    throw new RangeError('不正なメールアドレスです')
  }

  return v
}

