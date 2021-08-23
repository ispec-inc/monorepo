require('dotenv').config()
const { API_URL } = process.env

const baseName = process.env.BASE_NAME || 'app base name'
const baseDesc = process.env.BASE_DISC || '共通のディスクリプション。'
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseOgp = process.env.BASE_OGP || '/ogp.jpg'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    // npm_package_name is defined by name in package.json
    // 各ページでtitleを設定すると%s部分に書くページで設定したタイトルが入ってくる
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        // npm_package_description is defined by name in package.json
        content: process.env.npm_package_description || '',
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'ja_JP',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: baseName,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: baseUrl,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: baseName,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: baseDesc,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${baseUrl}${baseOgp}`,
        // 絶対パスで指定する必要あり。
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~plugins/axios.ts' },
    { src: '~plugins/axios-accessor.ts' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    'nuxt-typed-vuex',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/dotenv', '@nuxtjs/axios', '@nuxtjs/auth'],
  env: {
    API_URL,
  },
  axios: {
    baseUrl: API_URL,
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/sessions',
            method: 'post',
            propertyName: 'accessToken',
          },
          logout: false,
          user: false,
        },
      },
    },
  },
  router: {
    // middleware: ['auth'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  },
}
