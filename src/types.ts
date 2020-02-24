export type JsonPathType = {
  id: number;
  url: string;
  path: string;
};

export type JsonAvailableLanguagesType = {
  [key: string]: JsonPathType;
};

export type JsonLocationType = {
  id: number | null | undefined;
  name: string | null | undefined;
  address: string | null | undefined;
  town: string | null | undefined;
  state: string | null | undefined;
  postcode: string | null | undefined;
  region: string | null | undefined;
  country: string;
  latitude: string | null | undefined;
  longitude: string | null | undefined;
};

type JsonFeaturedImageInstanceType = {
  url: string;
  width: number;
  height: number;
};

type JsonFeaturedImageType = {
  description: string;
  mimetype: string;
  thumbnail: Array<JsonFeaturedImageInstanceType>;
  medium: Array<JsonFeaturedImageInstanceType>;
  large: Array<JsonFeaturedImageInstanceType>;
  full: Array<JsonFeaturedImageInstanceType>;
};

type JsonEventInfoType = {
  id: number;
  start_date: string;
  end_date: string;
  all_day: boolean;
  start_time: string;
  end_time: string;
  recurrence_id: string | null | undefined;
  timezone: string;
};

export type JsonCategoryType = {
  id: number;
  url: string;
  path: string;
  title: string;
  modified_gmt: string;
  excerpt: string;
  content: string;
  available_languages: JsonAvailableLanguagesType;
  thumbnail: string;
  hash: string;
  parent: JsonPathType;
  order: number;
};

export type JsonDisclaimerType = JsonCategoryType;

export type JsonPoiType = {
  id: number;
  url: string;
  path: string;
  title: string;
  modified_gmt: string;
  excerpt: string;
  content: string;
  available_languages: JsonAvailableLanguagesType;
  thumbnail: string;
  hash: string;
  location: JsonLocationType;
};

export type JsonEventType = {
  id: number;
  url: string;
  path: string;
  title: string;
  modified_gmt: string;
  excerpt: string;
  content: string;
  available_languages: JsonAvailableLanguagesType;
  thumbnail: string;
  hash: string;
  event: JsonEventInfoType;
  location: JsonLocationType;
  featured_image: JsonFeaturedImageType | null | undefined;
};

export type JsonExtraPostType = {
  [key: string]: string;
};

export type JsonExtraType = {
  alias: string;
  name: string;
  url: string;
  thumbnail: string;
  post: JsonExtraPostType | null | undefined;
};

export type JsonSprungbrettJobType = {
  title: string; zip: string; city: string; url: string; employment: string; apprenticeship: string;
};

// Generated with: https://transform.now.sh/json-to-flow-types/
type AccommodationType = {
  ofRooms: string[];
  title: string;
  location: string;
  totalArea: number;
  totalRooms: number;
  moveInDate: string;
  ofRoomsDiff: string[];
};

type CostsType = {
  ofRunningServices: string[];
  ofAdditionalServices: string[];
  baseRent: number;
  runningCosts: number;
  hotWaterInHeatingCosts: boolean | string;
  additionalCosts: number;
  ofRunningServicesDiff: string[];
  ofAdditionalServicesDiff: string[];
};

type LandlordType = {
  firstName: string;
  lastName: string;
  phone: string;
};

type FormDataType = {
  landlord: LandlordType;
  accommodation: AccommodationType;
  costs: CostsType;
};

export type OfferType = {
  email: string;
  formData: FormDataType;
  createdDate: string;
};

export type JsonLanguageType = { code: string; native_name: string; };

export type JsonCityType = {
  name: string;
  path: string;
  live: boolean;
  events: boolean;
  extras: boolean;
  name_without_prefix: string;
  prefix: string | null | undefined;
  latitude: number | null;
  longitude: number | null;
  aliases: {
    [alias: string]: { longitude: number; latitude: number; };
  } | null;
};
