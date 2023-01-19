<script setup lang="ts">
import TopicCardList from "@/components/TopicCardList.vue"
import { dataFetch, nativeFetch } from "@/helpers/api";
import { TopicBase } from "@/models/Topic";
import PaginationPage, { defaultPaginationPage } from "@/models/PaginationPage";

useHead({
	title: 'Topics'
})

const route = useRoute()
const router = useRouter()
const topicsData = ref({ topics: [], page: defaultPaginationPage() })
const pending = ref(true)
const page = ref(route.query.page ? Number(route.query.page) : 1)

const fetchData = () => {
	pending.value = true
	let query = route.query

	dataFetch<{ topics: TopicBase[], page: PaginationPage }>('/topics/', query)
		.then((res) => {
			topicsData.value = res.data.value
			page.value = res.data.value.page.curr

			if (query.page !== page.value.toString()) {
				query.page = page.value.toString()
				if (query.page === '1')
					delete query.page
				router.push({ query: query })
			}

			pending.value = false


		}).catch(() => { pending.value = false });
}

fetchData()

function prevPage() {
	page.value--
	router.replace({ query: { page: page.value } })
}
function nextPage() {
	page.value++
	router.replace({ query: { page: page.value } })
}

watch(route, () => {
	fetchData()
})

</script>

<template>
	<div class='page'>

		<div class="heading text-center">
			<h1>Topics</h1>
		</div>

		<section>

			<div v-if="pending" class="loading loading-center text-center">
				Loading...
			</div>
			<div v-else class="container hm-80v d-flex flex-column t-delay-200">

				<div class="d-flex justify-content-around">
					<button class="small" :disabled="!topicsData.page.has_prev"
						@click="prevPage()">Prev
						Page</button>

					<div class="px-5">
						<button class="small" @click="$router.push({ query: { page } })"
							:disabled="Object.keys(route.query).length == 0">clear
							query</button>
					</div>

					<button class="small" :disabled="!topicsData.page.has_next"
						@click="nextPage()">Next
						Page</button>
				</div>

				<TopicCardList class="flex-fill" :topics="topicsData.topics" />
			</div>

		</section>

	</div>
</template>

<style>

</style>