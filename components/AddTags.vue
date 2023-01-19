<script setup>
const { tags } = defineProps({ tags: "" })

const chips = ref(tags ?? '')

function rmChip(t) {
    let value = chips.value.split(",").filter(c => c !== t).join(',')
    value = value.replace(/ ,/g, ',')
    value = value.replace(/  /g, ' ')
    value = value.trim()
    chips.value = value
}

function chipsList() {
    if (chips.value === '') return []
    return chips.value.trim().split(",")
}

</script>

<template>
    <input type="text" placeholder="Tags" name="topic-tags"
        :title="chips.split(',').length <= 5 ? 'add , separated values' : 'Can add only 5 tags. remove from below to add more.'"
        v-model="chips" :disabled="chips.split(',').length > 5">
    <div class="chip-group my-2">
        <div class="chip icn" v-for="c in chipsList()" :key="c">
            {{ c }}<span @click="rmChip(c)" class="remove"
                title="Click to remove"></span>
        </div>
    </div>

</template>

<style scoped>
.chip-group {
    display: flex;
    column-gap: .5rem;
    row-gap: .5rem;
    flex-wrap: wrap;
}

.chip {
    background-color: var(--card-bg);
    padding: .1rem 1rem;
    border-radius: 2rem;
}

.chip .remove::after {
    padding-left: 1rem;
    content: 'x';
    color: var(--text-color-tr);
}
</style>