import { FormInputType, FormAbstructModule } from "./form-abstruct-module";
import FormDateInputModule from "./form-date-input";
import FormGroupListModule, { FormGroupTempleteProvider } from "./form-group-list";
import FormGroupModule from "./form-group";
import FormImageInputModule from "./form-image-input";
import FormInputModule from "./form-input";
import FormNumberInputModule from "./form-number-input";
import FormSelectInputModule, { SelectFormChoice } from "./form-select-input";
import FormSwitchInputModule from "./form-switch-input";
import FormTextInputModule from "./form-text-input";
import FormModule from "./form";
import Resource, { ResourceDetail } from "./resource";
import { FormModule as RFormModule } from './refactor/form'
import { FormTextInput as RFormTextInput } from './refactor/form-input/text'
import { FormInputModule as RFormInputModule } from './refactor/form-input/module'
import { FormStructure } from './types/form-structure'

export {
  FormAbstructModule,
  FormDateInputModule,
  FormGroupListModule,
  FormGroupModule,
  FormImageInputModule,
  FormInputModule,
  FormNumberInputModule,
  FormSelectInputModule,
  FormSwitchInputModule,
  FormTextInputModule,
  FormModule,
  Resource,
  RFormModule,
  RFormTextInput,
  RFormInputModule,
  FormStructure
}
