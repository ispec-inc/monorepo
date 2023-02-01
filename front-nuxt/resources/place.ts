import Resource from '~/resources/resource'
import PlaceData from '~/types/place'
import { PlaceDetailData } from '~/types/place-detail'
import { Language } from '~/types/language'

export default class PlaceResource extends Resource {
  private data: PlaceData

  nameJa: string
  nameEn: string
  googlePlaceId: string

  constructor(data: PlaceData) {
    super(data.id)
    this.data = data
    this.nameJa = getDetailData(data.placeDetails, 'ja')?.name || ''
    this.nameEn = getDetailData(data.placeDetails, 'en')?.name || ''
    this.googlePlaceId = data.googlePlaceId
  }
}

function getDetailData(
  data: PlaceDetailData[],
  lang: Language
): PlaceDetailData | undefined {
  return data.find((d) => d.lang === lang)
}
