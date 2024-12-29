const http = require('node:http');
const { once } = require('node:events')

const DEFAULT_USER = {
  username: 'admin',
  password: 'admin123'
}

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    const data = JSON.parse(await once(request, 'data'))
    const toLower = (value) => value.toLowerCase()

    if(
      toLower(data.username) !== DEFAULT_USER.username ||
      toLower(data.password) !== DEFAULT_USER.password
    ) {
      response.writeHead(401)
      response.write('Not authorized')
      return response.end()
    }

    response.writeHead(200)
    response.write('Authorized')
    return response.end()
  },
  default: async (request, response) => {
    response.writeHead(404)
    return response.end('Route not found')
  }
}

function handler(request, response) {
  const { url, method } = request

  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
