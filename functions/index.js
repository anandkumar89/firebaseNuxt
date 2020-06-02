const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/dist/'
  }
}

const nuxt = new Nuxt(config)


exports.nuxtssr = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  res.set('Cache-Control', 'public, max-age: 600, s-maxage:1200');
  nuxt.render(req, res);
});