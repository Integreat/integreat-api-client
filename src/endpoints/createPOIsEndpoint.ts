import EndpointBuilder from '../EndpointBuilder'
import { JsonPoiType } from '../types'
import PoiModel from '../models/PoiModel'
import normalizePath from '../normalizePath'
import mapAvailableLanguages from '../mapAvailableLanguages'
import moment from 'moment-timezone'
import LocationModel from '../models/LocationModel'
import Endpoint from '../Endpoint'

export const POIS_ENDPOINT_NAME = 'pois'

type ParamsType = { city: string; language: string; };

export default (baseUrl: string): Endpoint<ParamsType, Array<PoiModel>> => new EndpointBuilder<ParamsType, Array<PoiModel>>(POIS_ENDPOINT_NAME)
  .withParamsToUrlMapper((params: ParamsType): string => `${baseUrl}/${params.city}/${params.language}/wp-json/extensions/v3/locations`)
  .withMapper((json: Array<JsonPoiType>): Array<PoiModel> => json.map(poi => {
    return new PoiModel({
      path: normalizePath(poi.path),
      title: poi.title,
      content: poi.content,
      thumbnail: poi.thumbnail,
      availableLanguages: mapAvailableLanguages(poi.available_languages),
      excerpt: poi.excerpt,
      location: new LocationModel({
        name: poi.location.name,
        address: poi.location.address,
        town: poi.location.town,
        postcode: poi.location.postcode,
        longitude: poi.location.longitude,
        latitude: poi.location.latitude
      }),
      lastUpdate: moment.tz(poi.modified_gmt, 'GMT'),
      hash: poi.hash
    })
  })).build()
