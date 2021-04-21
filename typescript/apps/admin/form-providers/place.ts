import {
  FormModule,
  FormTextInputModule
} from '@monorepo/fast-form'
import PlaceResource from '~/resources/place'

export function PlaceForm(place?: PlaceResource): FormModule<any> {
  return new FormModule([
    new FormTextInputModule('名前(日本語)', place?.nameJa, 'nameJa'),
    new FormTextInputModule('名前(英語)', place?.nameEn, 'nameEn'),
    new FormTextInputModule(
      'Google Place ID',
      place?.googlePlaceId,
      'googlePlaceId'
    ),
  ])
}
