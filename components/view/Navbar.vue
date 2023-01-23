<template>
    <nav class="navbar">
        <div class="navbar-body shadow">
            <div class="navbar-brand">
                <NuxtLink class="navbar-brand" :to="'/'">
                    <strong class="navbar-title">Apna Forum</strong>
                </NuxtLink>
            </div>
            <div class="middle">
            </div>
            <input type="checkbox" name="navbar-toggler" class="hidden navbar-toggler" id="navbar-toggler" />
            <label class="navbar-toggler toggler" for="navbar-toggler" @click="leftSidebar = !leftSidebar"></label>
        </div>
    </nav>
</template>

<script setup>
const leftSidebar = useState('leftSidebar')
</script>