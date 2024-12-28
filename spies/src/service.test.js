const Service = require('./service')
const { createSandbox } = require('sinon')
const assert = require('assert')

const sinon = createSandbox()

;(async () => {
  const service = new Service()
  const spy = sinon.spy(
    service,
    service.execute.name
  )

  {
    for(const sequence of service.execute(5)) {}

    const calls = 6
    assert.strictEqual(spy.callCount, calls)

    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams)
  }
})()
