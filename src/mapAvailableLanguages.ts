import { JsonAvailableLanguagesType, JsonPathType } from './types'
import normalizePath from './normalizePath'
import { toPairs } from 'lodash'

const mapAvailableLanguages = (json: JsonAvailableLanguagesType): Map<string, string> => new Map(toPairs(json).map(([key, value]: [string, JsonPathType]) => [key, normalizePath(value.path)]))

export default mapAvailableLanguages
