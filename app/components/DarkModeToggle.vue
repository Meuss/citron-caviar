<script setup lang="ts">
const { mode, toggle } = useColorMode();
const isDark = computed(() => mode.value === 'dark');
</script>

<template>
    <button class="flex cursor-pointer items-center gap-3" @click="toggle">
        <div class="bg-fg/20 flex h-5 w-9 items-center rounded-full px-0.5 transition-colors">
            <div
                class="bg-fg h-4 w-4 rounded-full transition-transform duration-300"
                :class="isDark ? 'translate-x-0' : 'translate-x-3.5'"
            ></div>
        </div>
        <span class="text-sm tracking-widest uppercase">
            {{ isDark ? 'Nuit' : 'Jour' }}
        </span>
    </button>
</template>
