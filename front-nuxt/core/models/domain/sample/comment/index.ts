import { DomainModelBase } from "../../_base"
import { SamplePostCommentId } from "~/core/values/sample/post/comment/id"

interface Params {
  readonly id: SamplePostCommentId
  readonly name: string
  readonly email: string
  readonly body: string
}

export class SamplePostCommentModel extends DomainModelBase<Params> {}
