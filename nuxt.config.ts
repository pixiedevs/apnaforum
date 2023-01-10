export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    email: '',
    emailPass: '',
    emailService: '',
    emailPort: '',
    authKey: '',
    cacheTime: '',
    // The private keys which are only available server-side
    // Keys within public are also exposed client-side
    public: {
      apiBase: '',
      url: '',
      keywords: '',
      description: '',
      gtagid: '',
      appName: '',
      debug: ''
    }
  }
})
