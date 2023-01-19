<script setup lang="ts">
import useToasts from "@/composables/Toasts"
import Toast from "@/models/Toast";

const toasts = useToasts()

const doAction = (action: Function, toast: Toast) => {
    action(toast)
    toast.show = false
}

</script>

<template>
    <div id="main-toast" class="toasts">
        <div class="toast d-flex justify-content-between1" :title="toast.tag"
            :class="toast.tag + (toast.show ? ' show' : '')"
            v-for="toast in toasts" :key="toast.desc">
            <span class="toast-msg my-auto me-auto" v-html="toast.desc"></span>
            <div class="d-flex">
                <button class="small my-0 mx-1" v-if="toast.actions"
                    v-for="action in toast.actions" :key="action.name"
                    @click="doAction(action.do, toast)">{{ action.name }}</button>
                <span else class="icn close ms-3" title="close"
                    @click="toast.show = false"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.toast {
    position: fixed;
    bottom: .5rem;
    left: 50%;
    z-index: 1111;
    user-select: none;
    transition: .5s all;
    color: var(--card-color);
    background: var(--card-bg);
    border-radius: 10px;
    width: clamp(50%, 400px, 99vw);
    line-height: 1.2;
    padding: 10px 15px;
    transform: translate(-50%, 50vh);
    text-shadow: 1px 1px 1px black;
}

.toast.info {
    border: var(--border);
}

.toast.success {
    border: 1px solid var(--primary-bg2);
}

.toast.error {
    border: 1px solid red;
}

.toast.warning {
    border: 1px solid var(--theme-color1);
}

.toast.debug {
    border: 1px solid var(--secondary-bg2);
}

.toast:first-of-type {
    box-shadow: 2px 2px 15px #0005, -2px -2px 15px #0005;
}

/* adding delay */
.toast:nth-of-type(2) {
    transition-delay: .1s;
}

.toast:nth-of-type(3) {
    transition-delay: .2s;
}

.toast:nth-of-type(4) {
    transition-delay: .3s;
}

.toast:nth-of-type(5) {
    transition-delay: .4s;
}

/* .toast:hover, */
.toast.show {
    transform: translate(-50%, -50%);
}
</style>