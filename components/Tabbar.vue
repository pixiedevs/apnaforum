<!-- Example -->
<!-- 
<Tabbar :tabs="['Recent', 'Popular', 'Trending']" :active="1">
    <button class="tab active">Recent</button>
    <button class="tab">Popular</button>
    <button class="tab">Trending</button>
</Tabbar>
-->
<template>
    <div class="tabbar">
        <div class="tabbar-tabs border-y mb-3">
            <button v-for="(tab, index) of $attrs.tabs" :key="tab" class="tab"
                :class="{'active': (index + 1)== activeTab}" @click="changeActiveTab(index)">{{tab}}</button>
        </div>
        <div class="tabbar-content border-x px-3">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup>
const attrs = useAttrs()
const activeTab = useState('activeTab' + attrs.id, () => attrs.active ?? 1)

function changeActiveTab(index) {
    activeTab.value = index + 1
    showActiveDetails()
}

function showActiveDetails() {
    // console.log(`#${attrs.id} .tabbar-content>div`);
    document.querySelectorAll(`#${attrs.id} .tabbar-content>div`).forEach(el => {
        el.classList.remove("active")
    });
    document.querySelector(`#${attrs.id} .tabbar-content>div:nth-of-type(${activeTab.value})`).classList.add("active")
}

onMounted(() => {
    showActiveDetails()
})

</script>

<style>
/* .tabbar {
} */
.tabbar .tabbar-tabs {
    padding: .25rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    /* box-shadow: inset 2px 2px 20px #141214,
        inset -2px -2px 20px #2a262a; */
}

.tabbar .tabbar-tabs .tab {
    background: none;
    border: none;
    margin: .2rem 0;
    transition: .5s all;
}

.tabbar .tabbar-tabs .tab:hover {
    background: var(--blur-bg);
    outline: 2px solid white;
    outline-offset: 2px;
    text-align: center;
    /* color: var(--text-color-gr); */
    /* box-shadow: 5px 5px 2px var(--blur-bg),
        -5px -5px 2px var(--blur-bg); */
}

.tabbar .tabbar-tabs .tab.active {
    background: white;
    border: none;
    /* border: 2px solid transparent; */
    color: var(--text-color-gr);
}
.tabbar .tabbar-content>div {
    text-align: justify;
}

.tabbar .tabbar-content>div:not(.active) {
    display: none;
}
</style>