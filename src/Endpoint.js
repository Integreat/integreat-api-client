// @flow

import Payload from './Payload'
import MappingError from './errors/MappingError'
import type { MapResponseType } from './MapResponseType'
import type { MapParamsToUrlType } from './MapParamsToUrlType'
import type { MapParamsToBodyType } from './MapParamsToBody'
import ResponseError from './errors/ResponseError'
import FetchError from './errors/FetchError'

/**
 * A Endpoint holds all the relevant information to fetch data from it
 */
class Endpoint<P, T> {
  _stateName: string
  mapParamsToUrl: MapParamsToUrlType<P>
  mapParamsToBody: ?MapParamsToBodyType<P>
  mapResponse: MapResponseType<P, T>
  responseOverride: ?T
  errorOverride: ?Error

  constructor (
    name: string,
    mapParamsToUrl: MapParamsToUrlType<P>,
    mapParamsToBody: ?MapParamsToBodyType<P>,
    mapResponse: MapResponseType<P, T>,
    responseOverride: ?T, errorOverride: ?Error
  ) {
    this.mapParamsToUrl = mapParamsToUrl
    this.mapParamsToBody = mapParamsToBody
    this.mapResponse = mapResponse
    this.responseOverride = responseOverride
    this.errorOverride = errorOverride
    this._stateName = name
  }

  get stateName (): string {
    return this._stateName
  }

  async fetchOrPost (url: string, formData: ?FormData, developmentHeader?: boolean): Promise<Response> {
    try {
      const headers = developmentHeader ? new Headers({ 'X-Integreat-Development': 'true'}) : undefined
      return fetch(url, formData ? {
        method: 'POST',
        body: formData,
        headers
      } : { headers })
    } catch (e) {
      throw new FetchError({ endpointName: this.stateName, innerError: e })
    }
  }

  async request (params: P, options?: {| overrideUrl?: string, developmentHeader?: boolean |}): Promise<Payload<T>> {
    if (this.errorOverride) {
      throw this.errorOverride
    }

    const { overrideUrl, developmentHeader } = options || {}
    const url = overrideUrl || this.mapParamsToUrl(params)

    if (this.responseOverride) {
      return new Payload(false, url, this.responseOverride, null)
    }

    const formData = this.mapParamsToBody ? this.mapParamsToBody(params) : null
    const response = await this.fetchOrPost(url, formData, developmentHeader)

    if (!response.ok) {
      throw new ResponseError({ endpointName: this.stateName, responseStatus: response.status, url, formData })
    }

    try {
      const json = await response.json()
      const fetchedData = this.mapResponse(json, params)
      return new Payload(false, url, fetchedData, null)
    } catch (e) {
      throw (e instanceof MappingError) ? e : new MappingError(this.stateName, e.message)
    }
  }
}

export default Endpoint
