import { Moment} from 'moment'
import WohnenFormData from './WohnenFormData'

class WohnenOfferModel {
  _email: string
  _createdDate: Moment
  _formData: WohnenFormData

  constructor (params: {
    email: string;
    createdDate: Moment;
    formData: WohnenFormData;
  }) {
    this._email = params.email
    this._createdDate = params.createdDate
    this._formData = params.formData
  }

  get email (): string {
    return this._email
  }

  get createdDate (): Moment {
    return this._createdDate
  }

  get formData (): WohnenFormData {
    return this._formData
  }
}

export default WohnenOfferModel
