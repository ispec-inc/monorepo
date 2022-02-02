import { SampleResponse } from "~/core-v2/gateway/sample";
import { SampleModelImpl } from "~/core-v2/model/sample";

export class SampleModelAdapter extends SampleModelImpl {
  constructor(adaptee: SampleResponse) {
    super(adaptee.id, adaptee.name)
  }
}
