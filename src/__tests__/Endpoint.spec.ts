import Endpoint from '../Endpoint'

type ParamsType = { var1: string, var2: string }

describe('Endpoint', () => {
  const defaultMapParamsToUrl = (params: ParamsType) => `https://weird-endpoint/${params.var1}/${params.var2}/api.json`
  const defaultJsonMapper = (json: any) => json

  it('should have correct state name', () => {
    const endpoint = new Endpoint<ParamsType, any>('endpoint', defaultMapParamsToUrl, null, defaultJsonMapper)

    expect(endpoint.stateName).toBe('endpoint')
  })
})
