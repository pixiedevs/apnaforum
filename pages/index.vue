<script setup lang="ts">
import TopicCardList from "@/components/TopicCardList.vue"
import { dataFetch } from "@/helpers/api";
import { TopicBase } from "@/models/Topic";

useHead({
	title: 'Home'
})

const { data: topicsData, error, pending } = dataFetch<{ topics: TopicBase[] }>('/topics/', '','GET', false)

</script>

<template>
	<div class='page' v-if="pending">
		<h2 class="loading text-center">Loading...</h2>
	</div>
	<div class='page' v-else-if="error">
		<h2>Unable to get data!</h2>
	</div>
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
