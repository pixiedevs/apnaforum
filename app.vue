<template>
  <HeadTags />
  <a href="#main" class='button skip-to-main'>Go to Main Content</a>

  <Navbar />
  <div id="main-loading" :class="{ 'show': mainLoading }"></div>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <MainToast />
  <Footer />

</template>

<script setup>
import '@/assets/css/mili.css';
import '@/assets/css/style.css';

import Navbar from "@/components/Navbar.vue";
import HeadTags from "@/components/HeadTags.vue";
import MainToast from "@/components/view/MainToast.vue";
import Footer from "@/components/Footer.vue";
import "@/helpers/mixinGlobals"

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

const runtimeConfig = useRuntimeConfig()
const mainLoading = useState('mainLoading', () => false)

useHead({
  titleTemplate: (titleChuck) => {
    return titleChuck ? (titleChuck + " | " + runtimeConfig.public.appName) : (runtimeConfig.public.appName ?? '')
  },
  meta: [{
    name: 'description',
    content: runtimeConfig.public.description ?? ''
  },
  {
    name: 'keywords',
    content: runtimeConfig.public.keywords ?? ''
  },
  ]
})

onMounted(() => {
  if (!runtimeConfig.public.debug) {
    var gtmScript = document.createElement("script")
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + runtimeConfig.public.gtagid
    gtmScript.setAttribute("defer", true)

    document.head.appendChild(gtmScript)
  }
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all .2s;
}
.page-enter-from,
.page-leave-to {
  opacity: .2;
}
</style>
