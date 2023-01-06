<script setup lang="ts">
import TopicCardList from "@/components/TopicCardList.vue"
import { dataFetch, nativeFetch } from "@/helpers/api";
import { TopicBase } from "@/models/Topic";
import PaginationPage, { defaultPaginationPage } from "@/models/PaginationPage";
import { getPersistData, setPersistData } from "@/helpers/cookie";

useHead({
	title: 'Topics'
})

const route = useRoute()
const router = useRouter()
const topicsData = ref({ topics: [], page: defaultPaginationPage() })
let page = route.query.page ? Number(route.query.page) : 1

const fetchData = () => {
	try {
		if (process.client && getPersistData('topics__page_' + page)) {
			nativeFetch<{ time: string }>('/topics/', '&res=time&page=' + page)
				.then((res) => {
					if (res.time !== topicsData.value.topics[0].time)
						throw new Error()
				}).catch((err) => { /* console.info("Cached version.") */ });
			const data = getPersistData('topics__page_' + page)
			if (data.topics[0].time !== topicsData.value.topics[0].time)
				topicsData.value = data
		} else throw new Error()
	}
	catch (er) {
		dataFetch<{ topics: TopicBase[], page: PaginationPage }>('/topics/', '&page=' + page)
			.then((res) => {
				topicsData.value = res.data.value
				page = res.data.value.page.curr
				if (route.query.page !== page.toString())
					router.push({ query: page == 1 ? {} : { page: page } })
				setPersistData('topics__page_' + page, res.data.value)

			}).catch((err) => { });
	}
}

fetchData(/* page */)
// onUpdated(() => console.log("updated"))

function prevPage() {
	page--
	fetchData(/* page */)
}
function nextPage() {
	page++
	fetchData(/* page */)
}

</script>

<template>
	<div class='page'>

		<div class="heading text-center">
			<h1>Topics</h1>
		</div>

		<section>

			<div class="container hm-80v d-flex flex-column t-delay-200"
				v-if="topicsData.topics.length > 0">
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