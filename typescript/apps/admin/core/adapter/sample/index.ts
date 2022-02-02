import { SamplePostModelImpl } from "~/core/model/sample";
import { SamplePostResponse } from "~/types/response/sample/find";

export class SamplePostModelAdapter extends SamplePostModelImpl {
  constructor(adaptee: SamplePostResponse) {
    super(adaptee.id, adaptee.title, adaptee.body)
  }
}
