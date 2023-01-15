<script setup lang="ts">
import TopicCardList from "@/components/TopicCardList.vue"
import ErrorPage from "@/components/view/ErrorPage.vue";
import LoadingPage from "@/components/view/LoadingPage.vue";
import { dataFetch } from "@/helpers/api";
import { TopicBase } from "@/models/Topic";

useHead({
	title: 'Home'
})

const { data: topicsData, error, pending } = dataFetch<{ topics: TopicBase[] }>('/topics/', '', 'GET', false)

</script>

<template>
	<LoadingPage v-if="pending">
	</LoadingPage>
	<ErrorPage v-else-if="error">
	</ErrorPage>

	<div class='page' v-else>
		<div class="heading text-center">
			<h1>Hot - trending Topics</h1>
		</div>
		<section class="container mt-5">
			<TopicCardList v-if="!pending && !error"
				:topics="topicsData.topics" />
		</section>
	</div>
</template>
