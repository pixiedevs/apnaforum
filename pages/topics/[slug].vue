<script setup lang="ts">
import TopicViewComponent from "@/components/TopicViewComponent.vue"
import CommentComponent from "@/components/CommentComponent.vue"
import AddCommentComponent from "@/components/AddCommentComponent.vue"
import AddReplyComponent from "@/components/AddReplyComponent.vue"

import { dataFetch, nativeFetch } from "@/helpers/api";
import { Topic } from "@/models/Topic";
import Comment from "@/models/Comment";

const route = useRoute()

const comments = useState<Comment[]>('commentsData', () => [])
const pendingComments = useState('pendingComments', () => true)
const errorComments = useState('errorComments', () => false)
let isInit = true

const floatReply = useState('floatReply', () => false)
const replyTo = useState('replyTo', () => ['', '', ''])

const { data: topicData, pending, error: error } = dataFetch<{ topic: Topic }>(`/api/topics/${route.params.slug}/`)

const fetchCommentData = () => {
	pendingComments.value = true
	nativeFetch(`/api/topics/${route.params.slug}/`, { query: '&res=comments', method: 'GET', auth: true })
		.then((res) => res.json())
		.then((data) => {
			comments.value = data.comments
			pendingComments.value = false
			if (isInit && route.hash) {
				setTimeout(() => {
					document.querySelector(route.hash)?.scrollIntoView(true)
				}, 500);
				isInit = false
			}
		})
		.catch((err) => { pendingComments.value = false, errorComments.value = true })
}
const addReplyCB = (id: string, type: string, body: string) => {
	replyTo.value = [id, type, body]
	floatReply.value = !floatReply.value
}

onMounted(() => {
	fetchCommentData()
})

const markUserful = (commentId: number) => {
	console.log("markUseful ", commentId);	
}


</script>

<template>
	<div class='page' v-if="pending">
		<h2 class="loading text-center">Loading...</h2>
	</div>
	<div class='page' v-else-if="error">
		<h2>Unable to get data!</h2>
	</div>

	<div class='page' v-else>

		<Head>
			<Title>{{ topicData.topic.name }}</Title>
		</Head>

		<section class='flex-fill'>
			<div class="heading px-5">
				<h1 class="topic-view-title">{{ topicData.topic.name }}</h1>

				<div class='d-flex justify-content-between'>

					<span v-if="topicData.topic.isactive"
						title="Topic will be closed after 15 days of no activity"
						class="topic-view-status">OPEN</span>

					<span v-else
						title="Topic closed because of no activity from 15 days."
						class="topic-view-status closed">CLOSED</span>

					<!-- <ClientOnly> -->
						<span v-once>{{ topicData.topic.time.asTime() }}</span>
					<!-- </ClientOnly> -->
				</div>
			</div>

			<TopicViewComponent :topic="topicData.topic" callback="" />

			<!-- <ClientOnly> -->
				<AddCommentComponent v-if="topicData.topic.isactive"
					:slug="topicData.topic.slug"
					:refreshComments="fetchCommentData" />
			<!-- </ClientOnly> -->

			<div v-if="pendingComments" id="comments">
				<h2 class="loading text-center">Loading...</h2>
			</div>
			<div v-else-if="errorComments" id="comments">
				<h2>Unable to get comments!</h2>
			</div>

			<div class="card-group hover-light" id="comments" v-else>
				<!-- <ClientOnly> -->
					<CommentComponent v-for="comment of comments"
						:key="comment.id" :replyCallback="addReplyCB"
						:topicIsActive="topicData.topic.isactive"
						:author="topicData.topic.authorUsername"
						:comment="comment" :markUserful="markUserful" />
				<!-- </ClientOnly> -->
			</div>

		</section>

		<section>
			<div class='modal'
				:class="{ 'show': floatReply, 'hidden': !floatReply }">
				<span class="close close-top"
					@click="floatReply = !floatReply"></span>
				<!-- <ClientOnly> -->
					<AddReplyComponent :refreshComments="fetchCommentData" />
				<!-- </ClientOnly> -->
			</div>
		</section>
	</div>
</template>

<style>
@import "~/assets/css/TopicView.globals.css";
</style>