const contentful = require('contentful')
const defaultConfig = {
  SPACE_ID: process.env.NUXT_ENV_SPACE_ID,
  CTF_ACCESS_TOKEN: process.env.NUXT_ENV_CTF_ACCESS_TOKEN,
}

module.exports = {
  createClient(config = defaultConfig) {
    return contentful.createClient({
      space: config.SPACE_ID,
      accessToken: config.CTF_ACCESS_TOKEN,
    })
  },
}
