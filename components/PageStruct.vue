<template>
    <div class="d-flex align-items-stretch justify-content-between flex-column mb-3 h-100">
        <div class="header text-center">
            <h2>{{ $attrs.heading }}</h2>
        </div>
        <div class="d-flex align-items-baseline h-100 justify-content-center"
            :class="{'flex-column': !$attrs.row, 'flex-wrap': $attrs.wrap}">
            <slot> <strong>Comming Soon...</strong> </slot>
        </div>
        <slot name="bottom" />
    </div>
</template>

<script setup>
    // onMounted(() => {
    //     document.getElementsByclass('page-body')[0].classList.add(this.$attrs?.justify??'just-not')
    // })
    // function getJustify() {
    //     return this.$attrs?.justify??'not-just'
    // }
    // function getClasses() {
    //     let classes = {'flex-column': !this.$attrs?.row, 'flex-wrap': this.$attrs?.wrap}
    //     if (this.$attrs?.justify) {
    //         classes['justify-content-' + this.$attrs.justify] = 'true'
    //     } else {
    //         console.log(this.$attrs?.justify);
    //         classes['justify-content-center'] = 'true'
    //     }
    //     // return 
    //     return classes
    // }
</script>

<style scoped>
</style>