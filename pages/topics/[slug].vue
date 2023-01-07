<script setup lang="ts">
import TopicViewComponent from "@/components/TopicView.vue"
import CommentComponent from "@/components/Comment.vue"
import AddCommentComponent from "@/components/AddComment.vue"
import AddReplyComponent from "@/components/AddReply.vue"

import { dataFetch, nativeFetch } from "@/helpers/api";
import { Topic } from "@/models/Topic";
import Comment from "@/models/Comment";
import { getPersistData, setPersistData } from "@/helpers/cookie";
import { showToast } from "@/helpers/appState";
import Message from "@/models/Message";

const route = useRoute()

const comments = useState<Comment[]>('commentsData', () => [])
const pendingComments = useState('pendingComments', () => true)
const errorComments = useState('errorComments', () => false)
let isInit = true
// let page = route.query.page ? Number(route.query.page) : 1
let page = 1


const floatReply = useState('floatReply', () => false)
/* replyTo will save [reply of comment-id, reply of type, trimmed body, and base comment-id] */
const replyTo = useState('replyTo', () => ['', '', '', -1])

const { data: topicData, pending, error: error } = dataFetch<{ topic: Topic }>(`/topics/${route.params.slug}/`)

const fetchCommentData = (time: string) => {
	nativeFetch<{ comments: Comment[] }>(`/topics/${route.params.slug}/`, '&res=comments&page=' + page, 'GET')
		.then((data) => {
			comments.value = data.comments

			setPersistData(`${route.params.slug}=${page}`, { comments: data.comments, time: time }, 0, false)
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
const fetchCommentDataIfNeed = () => {
	pendingComments.value = true
	let time = new Date().toString();

	try {
		if (getPersistData(`${route.params.slug}=${page}`, false)) {
			nativeFetch<{ time: string }>(`/topics/${route.params.slug}/`, '&res=time&page=' + page, 'GET')
				.then((res) => {
					const data = getPersistData(`${route.params.slug}=${page}`, false)

					time = res.time

					if (res.time === data.time) {
						comments.value = data.comments
						pendingComments.value = false
						return;
					}
					fetchCommentData(time)
				})
				.catch((err) => {
					fetchCommentData(time)
				});
		} else {
			fetchCommentData(time)
		}
	} catch (er) {
		fetchCommentData(time)
	}
}

const addReplyCB = (id: string, type: string, body: string, commentId: number) => {
	replyTo.value = [id, type, body, commentId]
	floatReply.value = !floatReply.value
}

onMounted(() => {
	fetchCommentDataIfNeed()
})

const markUserful = (commentId: number) => {
	let remove = topicData.value.topic.answer == commentId

	nativeFetch<{ message: Message, id: number }>(`/comments/markuseful/`, `&comment-id=${commentId}&topic-id=${route.params.slug}`, remove ? 'DELETE' : 'GET')
		.then((data) => {
			if (data.message) {
				showToast(data.message.desc, data.message.tag, 5000)
				if (data.message.tag === "success") {
					topicData.value.topic.answer = remove ? null : data.id
				}
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

const insertComment = (newComment: Comment) => {
	comments.value.unshift(newComment)
}

const insertReply = (newReply) => {
	comments.value.forEach(comment => {
		if (comment.id === replyTo.value[3]) {
			newReply.reply_of.username = comment.authorUsername
			comment.replies.push(newReply)
		}
	})
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

		<section class='flex-fill' :class="{ 'opacity-low': floatReply }">
			<div class="heading px-5">
				<h1 class="topic-view-title upper-first">
					{{ topicData.topic.name }}
				</h1>

				<div class='d-flex justify-content-between'>

					<span v-if="topicData.topic.isactive"
						title="Topic will be closed after 15 days of no activity"
						class="topic-view-status">OPEN</span>

					<span v-else
						title="Topic closed because of no activity from 15 days."
						class="topic-view-status closed">CLOSED</span>

					<ClientOnly>
						<span>{{ topicData.topic.time.asTime() }}</span>
					</ClientOnly>
				</div>
			</div>

			<TopicViewComponent :topic="topicData.topic" callback=""
				:commentsCount="pendingComments ? 0 : comments.length" />

			<div v-if="pendingComments" id="comments">
				<h2 class="loading text-center">Loading...</h2>
			</div>
			<div v-else-if="errorComments" id="comments">
				<h2>Unable to get comments!</h2>
			</div>

			<div class="card-group hover-light" id="comments"
				v-else-if="topicData.topic.isactive">
				<!-- <ClientOnly> -->
				<CommentComponent v-for="comment of comments" :key="comment.id"
					:replyCallback="addReplyCB"
					:class="{ 'answer': comment.id == topicData.topic.answer }"
					:topicIsActive="topicData.topic.isactive"
					:author="topicData.topic.authorUsername" :comment="comment"
					:markUserful="markUserful" />
				<!-- </ClientOnly> -->
			</div>

		</section>

		<section v-if="topicData.topic.isactive">

			<!-- <ClientOnly> -->
			<AddCommentComponent v-if="topicData.topic.isactive"
				:slug="topicData.topic.slug" :insertComment="insertComment" />
			<!-- </ClientOnly> -->

			<div class='container modal'
				:class="{ 'show': floatReply, 'hidden': !floatReply }">
				<!-- <ClientOnly> -->
				<AddReplyComponent :insertReply="insertReply"
					:toggleFloat="() => { floatReply = !floatReply }" />
				<!-- </ClientOnly> -->
			</div>
		</section>
	</div>
</template>

<style>
@import "~/assets/css/TopicView.globals.css";
</style>
