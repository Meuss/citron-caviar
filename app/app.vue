<script setup lang="ts">
import { ScrollSmoother } from 'gsap/ScrollSmoother';

onMounted(() => {
    ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
    });
});
</script>

<template>
    <TheNav />
    <div class="font-medium">
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
