import { DomainModelBase } from "../_base"
import { SamplePostId } from "~/core/values/sample/post/id"

interface Params {
  readonly id: SamplePostId
  readonly title: string
  readonly body: string
}

export class SamplePostModel extends DomainModelBase<Params> {}
