const builtAt = new Date().toISOString()
const path = require('path')
import fs from 'fs'
import Mode from "./node_modules/frontmatter-markdown-loader/mode"
import MarkdownIt from 'markdown-it'
import mip from './node_modules/markdown-it-prism'

const md = new MarkdownIt({
  html: true,
  typographer: true
})
md.use(mip)

const productionUrl = {
  en: "/",
};

const baseUrl = 'https://eigenspace.ml';
const logo    = '~/assets/images/logo.png';
const sitename= 'eigenspace.ml';
const pathTOContentFolder = 'contents';


function getPaths (type) {
  let initial = '' 
  // return fs.readdirSync(path.resolve(__dirname, 'src/contents', `${lang}/${type}`))
  let output = ''
  output = fs.readdirSync(path.resolve(__dirname, pathTOContentFolder , `${type}`))
  .filter(filename => path.extname(filename) === '.md')
  .map(filename => `${initial}/${type}/${path.parse(filename).name}`);
  return output
}

export default {
  env: {
    baseUrl,
    productionUrl,
    logo, 
    sitename
  },

  buildDir: '../functions/nuxt',

  head: {
    title: 'Anand Kumar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'theme-color', content: '#c1c1c1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@anand4k' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180' },
      { rel: 'mask-icon', type: 'image/png', href: '/favicons/safari-pinned-tab.svg', color: '#c1c1c1' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#5a46ff',
    height: '3px'
  },
  /*
  ** Build configuration
  */
  mode: 'universal',

  css: [
    '@/assets/css/main.scss'
  ],


  build: {
    publicPath: '/dist/',
    extractCSS: true,
    extend (config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, pathTOContentFolder),
        options: {
          mode: [Mode.VUE_RENDER_FUNCTIONS, Mode.VUE_COMPONENT],
          vue: {
            root: "dynamicMarkdown"
          },
          markdown(body) {
            return md.render(body)
          }
        }
      }, {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          placeholder: true,
          quality: 60,
          size: 1400,
          adapter: require('./node_modules/responsive-loader/sharp')
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      });
    }
  },
  
  plugins: ['~/plugins/lazyload', '~/plugins/globalComponents', { src: '~plugins/ga.js', ssr: false }],
  modules: [  
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBjyezIXZtdKnRKKAlYW1TDF28wnlAbHrs",
          authDomain: "todo-ical.firebaseapp.com",
          databaseURL: "https://todo-ical.firebaseio.com",
          projectId: "todo-ical",
          storageBucket: "todo-ical.appspot.com",
          messagingSenderId: "405464436217",
          appId: "1:405464436217:web:c8ee0a7f9bdde86db50128",
          measurementId: "G-K3GNVHKXR6"
        },
        services: {
          auth: {
            persistence: 'local',
            intialize : {
              onAuthStateChangeAction: 'onAuthStateChanged'
            },
            ssr: {
              credential : '~/serviceAccountKeys.json',
              ignorePaths: [
                '/public/'
              ],
            }
          },
          realTimeDb: true,
          function: true
        }
      }
    ]
  ],
  buildModules:['@nuxtjs/vuetify'],

  vuetify: {
    // treeShake: false,
    // customVariables: ['~/assets/style/variables.scss'],
    defaultAssets: {
      icons: false
    },
    theme: {
      dark: false,
      default: 'light',
      disable: false,
      options: {
        cspNonce: undefined,
        customProperties: undefined,
        minifyTheme: undefined,
        themeCache: undefined,
      },
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        dark: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
  
  // '@/assets/css/base/_buttons.scss'
  styleResources: {
    scss: [
      '@/assets/css/utilities/_variables.scss',
      '@/assets/css/base/_grid.scss'
    ],
  },

  webfontloader: {
    custom: {
      families: ['Graphik', 'Tiempos Headline'],
      urls: ['/fonts/fonts.css']
    }
  },

  generate: {
    routes: [
      '/es', '404'
    ]
    .concat(getPaths('blog'))
  }
}
