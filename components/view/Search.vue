<script setup>
import { nativeFetch } from '@/helpers/api';
import { showToast } from '@/helpers/appState';

const results = ref([])
var delayTimer;

function searchHandler(e) {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(() => {
        if (e.target.value.length < 4) {
            showToast("Search query must be minimum 4 letters long.", "warning", 5)
            results.value = []
            return;
        }
        nativeFetch('/search/', {'q': e.target.value})
            .then((data) => {
                results.value = data.results
                if (data.message) {
                    showToast(data.message.desc, data.message.tag, 10)
                } else if (!data.results.length)
                    showToast("No results found with this query!", "info", 5)
            })
            .catch((err) => { results.value = [] })
    }, 1000);
}
</script>

<template>
    <div class="d-flex flex-column">
        <strong>Search:</strong>
        <input type="search" name="search" id="search" @keypress="searchHandler"
            placeholder="search topics">
        <ol class="search-results rounded">
            <li v-for="result in results" :key="result.slug">
                <NuxtLink :to="'/topics/' + result.slug"
                    class="route shadow py-2 m-0 underline">{{ result.name }}
                </NuxtLink>
            </li>
        </ol>
    </div>
</template>

<style scoped>
/* .search-results::before {
    content: 'Results:';
} */

.search-results {
    /* position: absolute; */
    /* height: 0;
    overflow: hidden; */
    transition: all var(--transition);
    /* transform: translateY(6rem); */
    /* background-color: var(--card-bg); */
    z-index: 9;
}

/* #search:focus + .search-results,
#search:hover + .search-results,
.search-results:hover {
    height: auto;
} */
</style>
