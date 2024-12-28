class Service {
  async makeRequest(url) {
    return await (await fetch(url)).json()
  }

  async getPlanets(url) {
    const data = await this.makeRequest(url)
    return {
      name: data.name,
      films: data.films.length
    }
  }
}

module.exports = Service
