<script setup lang="ts">
import TopicCardList from "@/components/TopicCardList.vue"
import { nativeFetch } from "@/helpers/api";
import { TopicBase } from "@/models/Topic";
import PaginationPage, { defaultPaginationPage } from "@/models/PaginationPage";

useHead({
	title: 'Topics'
})

const route = useRoute()
const router = useRouter()
const topicsData = ref({ topics: [], page: defaultPaginationPage() })
const pending = ref(true)
let page = route.query.page ? Number(route.query.page) : 1

const fetchData = () => {
	pending.value = true
		nativeFetch<{ topics: TopicBase[], page: PaginationPage }>('/topics/', '&page=' + page)
			.then((res) => {
				pending.value = false
				topicsData.value = res
				page = res.page.curr
				if (route.query.page !== page.toString())
					router.push({ query: page == 1 ? {} : { page: page } })

			}).catch((err) => { pending.value = false });
}

fetchData()

function prevPage() {
	page--
	fetchData()
}
function nextPage() {
	page++
	fetchData()
}

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