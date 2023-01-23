<template>
    <div class='page'>

        <Head>
            <Title>404 - Topic not found!</Title>
        </Head>
        <div
            class="d-flex flex-column flex-fill justify-content-around text-center">
            <h2>Topic not found!</h2>
            <div class="container">
                <NuxtLink :to="'/topics/'" class="me-3">
                    <button>Topics</button>
                </NuxtLink>
                <NuxtLink :to="'/'">
                    <button>Home</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
