<script setup lang="ts">
import Toast from "@/models/Toast"

const toasts = useState<Toast[]>('mainToast', () => [])

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
