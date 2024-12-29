const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('node:assert')

describe('API test', () => {
  let app

  before((done) => {
    app = require('./server')
    app.once('listening', done)
  })

  after((done) => {
    app.close(done)
  })

  describe('/contact', () => {
    it('should return the contact page', async () => {
      const response = await supertest(app).get('/contact').expect(200)

      assert.strictEqual(response.text, 'Contact us page')
    })
  })

  describe('/login', () => {
    it('should return 401 when the user is not authorized', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'invalid', password: 'invalid' })
        .expect(401)

      assert.strictEqual(response.text, 'Not authorized')
    })

    it('should return 200 when the user is authorized', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'admin', password: 'admin123' })
        .expect(200)

      assert.strictEqual(response.text, 'Authorized')
    })
  })

  describe('default', () => {
    it('should return 404 when the route is not found', async () => {
      const response = await supertest(app).get('/invalid-route').expect(404)

      assert.strictEqual(response.text, 'Route not found')
    })
  })
})
