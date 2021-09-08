import * as FastForm from "@monorepo/fast-form";
import PlaceResource from "~/resources/place";

export namespace SampleForm {
  export type AsObject = {
    nameJa: string
    nameEn: string
    googlePlaceId: string
  }

  export function provideModule(place?: PlaceResource): FastForm.FormModule<AsObject> {
    const structure: FastForm.FormStructure<AsObject> = {
      nameJa: new FastForm.FormTextInputModule('名前(日本語)', place?.nameJa || '', ['required']),
      nameEn: new FastForm.FormTextInputModule('名前(英語)', place?.nameEn || '', ['required']),
      googlePlaceId: new FastForm.FormTextInputModule('Google Place ID', place?.googlePlaceId || '', ['required'])
    }
    return new FastForm.FormModule(structure, ['nameJa', 'nameEn', 'googlePlaceId'])
  }
}
