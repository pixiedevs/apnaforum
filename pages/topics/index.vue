<script setup lang="ts">
import TopicCardList from "@/components/TopicCardList.vue"
import { dataFetch } from "@/helpers/api";
import { TopicShort } from "@/models/Topic";

useHead({
	title: 'Topics'
})

const { data: topicsData, error, pending } = dataFetch<{ topics: TopicShort[] }>('/api/topics/?res_type=api')

</script>

<template>
	<div class='page'>
		<section class="container mt-5">
			<TopicCardList v-if="!pending && !error" :topics="topicsData.topics" />
		</section>
	</div>
</template>
