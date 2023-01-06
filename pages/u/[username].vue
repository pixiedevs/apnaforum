<script setup lang="ts">
import { dataFetch } from '@/helpers/api';
import User from '@/models/User';

const route = useRoute()

const { data, pending, error } = dataFetch<{ user: User }>(`/user/${route.params.username}/`)

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
            <Title>{{ data.user.username }}</Title>
            <Meta name="description"
                :content="`${data.user.full_name}(${data.user.username}), ${data.user.profile.public.about}`" />
        </Head>

        <section class='flex-fill mt-5'>
            <div class="heading px-5 text-center">
                <h2 class="topic-view-title">Username: {{ data.user.username }}
                </h2>

                <h4>Name: {{ data.user.full_name }}</h4>
                <div v-if="data.user.profile.public.status">
                    <small>{{ data.user.profile.public.status }}</small>
                </div>
            </div>

            <div class="container">
                <div v-if="data.user.profile.public.about">
                    <strong>About: </strong>
                    <p>{{ data.user.profile.public.about }}</p>
                </div>

                <div class='row px-3'>
                    <div class="col-sm-2">

                        <span class="row border-b my-2 p-1 ps-2">
                            Avatar</span>
                        <span class="row border-b my-2 p-1 ps-2">
                            Email</span>
                        <span class="row border-b my-2 p-1 ps-2">
                            Company</span>
                        <span class="row border-b my-2 p-1 ps-2">
                            Location</span>
                        <span class="row border-b my-2 p-1 ps-2"
                            v-for="(value, key) in data.user.profile.public.social">
                            {{ key }}
                        </span>
                    </div>

                    <div class="col-sm-4">
                        <span class="row border-b my-2 p-1 ps-2">
                            : {{ data.user.profile.public.avatar }}
                        </span>
                        <span class="row border-b my-2 p-1 ps-2">
                            : {{ data.user.profile.public.email }}
                        </span>
                        <span class="row border-b my-2 p-1 ps-2">
                            : {{ data.user.profile.public.company }}
                        </span>
                        <span class="row border-b my-2 p-1 ps-2">
                            : {{ data.user.profile.public.location }}
                        </span>

                        <span class="row border-b my-2 p-1 ps-2"
                            v-for="(value, key) in data.user.profile.public.social">:
                            {{ value }}
                        </span>
                    </div>

                </div>
            </div>

        </section>

    </div>

</template>