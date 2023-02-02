import { PlaceDetailData } from './place-detail'

export default interface PlaceData {
  id: number
  googlePlaceId: string
  facebookURL: string
  twitterURL: string
  instagramURL: string
  createdAt: string
  updatedAt: string
  placeDetails: PlaceDetailData[]
}
