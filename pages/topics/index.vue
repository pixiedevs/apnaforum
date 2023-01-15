<script setup lang="ts">
import TopicCardList from "@/components/TopicCardList.vue"
import { dataFetch } from "@/helpers/api";
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

	dataFetch<{ topics: TopicBase[], page: PaginationPage }>('/topics/', route.query)
		.then((res) => {
			topicsData.value = res.data.value
			page.value = res.data.value.page.curr
			if (route.query.page !== page.toString()) {
				route.query.page = page.value.toString()
				router.push({ query: route.query })
			}
			pending.value = false

		}).catch(() => { pending.value = false });
}

fetchData()

function prevPage() {
	page.value--
}
function nextPage() {
	page.value++
}

watch([route, page], () => {
	fetchData()
})

</script>

<template>
	<div class='page'>

		<div class="heading text-center">
			<h1>Topics</h1>
		</div>

		<section>

			<div class="container hm-80v d-flex flex-column t-delay-200"
				v-if="!pending">
				<TopicCardList class="flex-fill" :topics="topicsData.topics" />

				<div class="d-flex justify-content-around">
					<button :disabled="!topicsData.page.has_prev"
						@click="prevPage()">Prev
						Page</button>
					<div class="px-5"></div>
					<button :disabled="!topicsData.page.has_next"
						@click="nextPage()">Next
						Page</button>
				</div>
			</div>
			<div v-else class="loading loading-center text-center"> Loading...
			</div>

		</section>

	</div>
</template>

<style>

</style>