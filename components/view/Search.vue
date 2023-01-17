<script setup>
import { nativeFetch } from '@/helpers/api';

const results = ref([])
const field = ref('name')
var delayTimer;
const mainLoading = useState('mainLoading')

function searchHandler(e) {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(() => {
        if (e.target.value.length < 2) {
            results.value = []
            return;
        }

        mainLoading.value = true
        nativeFetch('/search/', { 'q': e.target.value, 'f': field.value })
            .then((data) => {
                if (data.results && data.results.length) {
                    results.value = data.results
                    mainLoading.value = false
                } else throw new Error()
            })
            .catch(() => { results.value = [{ name: 'No results found!', slug: '' }]; mainLoading.value = false })
    }, 1000);
}
</script>

<template>
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-between flex-wrap-reverse">
            <div><strong>Search:</strong></div>
            <div class="d-flex justify-content-end flex-wrap col-gap-1">
                <small>With:</small>
                <input type="radio" name="f" class="fancy" id="f-name"
                    value="name" v-model="field">
                <label for="f-name"> Name</label>
                <input type="radio" name="f" class="fancy" id="f-forum"
                    value="forum" v-model="field">
                <label for="f-forum"> Forum</label>
                <input type="radio" name="f" class="fancy" id="f-tag"
                    value="tag" v-model="field">
                <label for="f-tag"> Tag</label>
            </div>
        </div>
        <input type="search" name="search" id="search" @keypress="searchHandler"
            placeholder="search topics">
        <ul class="search-results rounded">
            <li v-for="result in results" :key="result.slug">
                <NuxtLink :to="'/topics/' + result.slug"
                    class="route shadow py-2 m-0 underline">{{ result.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>
