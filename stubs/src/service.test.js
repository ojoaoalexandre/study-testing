const Service = require('./service')
const assert = require('assert')

const { createSandbox } = require('sinon')
const sinon = createSandbox()

const mocks = {
  mock1: require('../mocks/alderaan.json'),
  mock2: require('../mocks/tatooine.json'),
}

const BASE_URL_1 = "https://swapi.info/api/planets/1"
const BASE_URL_2 = "https://swapi.info/api/planets/2"

;(async () => {
  const service = new Service()
  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )

  stub.withArgs(BASE_URL_1).resolves(mocks.mock1)
  stub.withArgs(BASE_URL_2).resolves(mocks.mock2)

  {
    const expected = {
      name: 'Alderaan',
      films: 2
    }

    const result = await service.getPlanets(BASE_URL_1)
    assert.deepStrictEqual(result, expected)
  }

  {
    const expected = {
      name: 'Tatooine',
      films: 5
    }

    const result = await service.getPlanets(BASE_URL_2)
    assert.deepStrictEqual(result, expected)
  }
})()
