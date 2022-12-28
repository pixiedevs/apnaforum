import { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {

    if (savedPosition) { return savedPosition }

    if (_to.path === _from.path && _to.hash) {
      try {
        return { top: document.querySelector(_to.hash).getBoundingClientRect().top + document.documentElement.scrollTop, behavior: 'smooth' }
      } catch (er) {
      }
    }

    return { top: 0, behavior: 'smooth' }
  }
}