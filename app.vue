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
  <ClientOnly>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe
        :src="'https://www.googletagmanager.com/ns.html?id='+runtimeConfig.public.gtagid"
        height="0" width="0" class="hide"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
  </ClientOnly>
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
  ],
  script: [runtimeConfig.public.debug ? {} : { src: 'https://www.googletagmanager.com/gtm.js?id=' + runtimeConfig.public.gtagid, async: true }]
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

#main-loading {
  position: fixed;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 50%;
  background: transparent;
  width: 98%;
  height: 0.4rem;
  z-index: 4;
}

#main-loading.show {
  animation: shimmer 1s linear infinite forwards;
  background: linear-gradient(90deg, var(--primary-bg2), var(--primary-bg), var(--secondary-bg2));
  margin-top: .5rem;
}
</style>
