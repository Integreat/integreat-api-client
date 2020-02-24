class LocationModel {
  _name: string | null | undefined
  _address: string | null | undefined
  _town: string | null | undefined
  _postcode: string | null | undefined
  _latitude: string | null | undefined
  _longitude: string | null | undefined

  constructor ({ name, address, town, postcode, latitude, longitude }: {
    name: string | null | undefined; address: string | null | undefined;
    town: string | null | undefined; postcode: string | null | undefined; latitude: string | null | undefined; longitude: string | null | undefined;
  }) {
    this._address = address
    this._town = town
    this._postcode = postcode
    this._latitude = latitude
    this._longitude = longitude
    this._name = name
  }

  get name (): string | null | undefined {
    return this._name
  }

  get address (): string | null | undefined {
    return this._address
  }

  get town (): string | null | undefined {
    return this._town
  }

  get postcode (): string | null | undefined {
    return this._postcode
  }

  get longitude (): string | null | undefined {
    return this._longitude
  }

  get latitude (): string | null | undefined {
    return this._latitude
  }

  get location (): string | null | undefined {
    if (!this._town) {
      return null
    }
    const withoutAddress = this._postcode ? `${this._postcode} ${this._town}` : this._town
    if (!this._address) {
      return withoutAddress
    }
    return `${this._address}, ${withoutAddress}`
  }
}

export default LocationModel
