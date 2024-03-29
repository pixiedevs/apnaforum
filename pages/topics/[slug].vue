<script setup lang="ts">
import TopicViewComponent from "@/components/TopicView.vue"
import AddCommentComponent from "@/components/AddComment.vue"
import AddReplyComponent from "@/components/AddReply.vue"
import CommentComponent from "@/components/Comment.vue"

import { dataFetch, nativeFetch } from "@/helpers/api";
import { Topic } from "@/models/Topic";
import Comment from "@/models/Comment";
import Reply from "@/models/Reply";
import { markCommentUserful } from "@/helpers/topicServices";
import PaginationPage from "@/models/PaginationPage";

const route = useRoute()

const comments = useState<Comment[]>('commentsData', () => [])
const pendingComments = useState('pendingComments', () => true)
const errorComments = useState('errorComments', () => false)
let isInit = true
const page = ref(route.query.page ? Number(route.query.page) : 1)
const paginationData = ref<PaginationPage>()
/* 
	Add only 10 Observer add 5 until comments completed
 */

const floatReply = useState('floatReply', () => false)
/* replyTo will save [reply of comment-id, reply of type, trimmed body, and base comment-id] */
const replyTo = useState<[string, string, string, number]>('replyTo', () => ['', '', '', -1])

const { data: topicData, pending, error } = dataFetch<{ topic: Topic }>(`/topics/${route.params.slug}/`)

const fetchCommentData = (onlyReplies = false, id?: number, index?: number) => {
	let query = onlyReplies ? { res: "replies", "comment-id": id } : { res: 'comments' }
	query["page"] = page.value

	nativeFetch<{ comments: Comment[], page: PaginationPage, replies: Reply[] }>(`/topics/${route.params.slug}/`, query, 'GET')
		.then((data) => {
			if (onlyReplies) {
				comments.value[index].replies = data.replies
			} else {
				comments.value.push(...data.comments)
				paginationData.value = data.page
				pendingComments.value = false
				if (isInit && route.hash) {
					setTimeout(() => {
						document.querySelector(route.hash)?.scrollIntoView(true)
					}, 500);
					isInit = false
				}
			}
		})
		.catch(() => { pendingComments.value = false, errorComments.value = true })
}


const addReplyCB = (id: string, type: string, body: string, commentId: number) => {
	replyTo.value = [id, type, body, commentId]
	floatReply.value = !floatReply.value
}

onMounted(() => {
	if (!error.value)
		fetchCommentData()
})

watch(page, () => {
	if (!error.value)
		fetchCommentData()
})

const markUserful = (commentId: number) => {
	let remove = topicData.value.topic.answer == commentId
	markCommentUserful(route.params.slug as string, commentId, remove,
		(id: number | null) => {
			topicData.value.topic.answer = remove ? null : id
		})

}

const insertComment = (newComment: Comment) => {
	comments.value.unshift(newComment)
}

const insertReply = (newReply) => {
	comments.value.forEach(comment => {
		if (comment.id === replyTo.value[3]) {
			newReply.reply_of.username = comment.authorUsername
			comment.replies.unshift(newReply)
			comment.repliesCount++
		}
	})
}

function onIntersect(e, o) {

	if (e.intersectionRatio === 1) {
		if (paginationData.value.has_next) {
			page.value++
		} else if (paginationData.value.last === page.value) {
			o.disconnect()
		}
	}
}

</script>

<template>
	<LoadingPage v-if="pending">
	</LoadingPage>
	<TopicErrorPage v-else-if="error">
	</TopicErrorPage>

	<div class='page' v-else>

		<Head>
			<Title>{{ topicData.topic.name }}</Title>
			<Meta name="description"
				:content="topicData.topic.body.substring(0, 150)" />
			<Meta name="keywords" :content="topicData.topic.name" />
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

			<div class="card-group hover-light" id="comments" v-else>
				<!-- <ClientOnly> -->
				<CommentComponent v-for="(comment, index) of comments"
					:key="comment.id" :index="index" :replyCallback="addReplyCB"
					:moreReplies="fetchCommentData"
					:class="{ 'answer': comment.id == topicData.topic.answer }"
					:topicIsActive="topicData.topic.isactive"
					:author="topicData.topic.authorUsername" :comment="comment"
					:markUserful="markUserful" />

				<Observer :id="'comments-datafetch'"
					:onIntersect="onIntersect" />
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
