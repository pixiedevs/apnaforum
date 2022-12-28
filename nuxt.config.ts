export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    // Keys within public are also exposed client-side
    public: {
      apiBase: '',
      keywords: '',
      description: '',
      gtagid: '',
      appName: '',
      debug: ''
    }
  }
})
