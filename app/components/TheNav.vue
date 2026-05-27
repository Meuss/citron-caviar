<script setup lang="ts">
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const mobileMenuOpen = ref(false);

const navItems = [
    { label: 'Accueil', target: '#smooth-content' },
    { label: 'Réalisations', target: '#realisations' },
    { label: 'Services', target: '#services' },
    { label: 'Contact', target: '#contact' },
];

function scrollTo(target: string) {
    const smoother = ScrollSmoother.get();
    if (smoother) {
        smoother.scrollTo(target, true, 'top top');
    }
    mobileMenuOpen.value = false;
}
</script>

<template>
    <nav class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 lg:px-10">
        <a href="#" class="font-medium" @click.prevent="scrollTo('#smooth-content')"> citron caviar </a>

        <ul class="hidden items-center gap-10 lg:flex">
            <li v-for="item in navItems" :key="item.label">
                <a :href="item.target" class="text-sm uppercase" @click.prevent="scrollTo(item.target)">
                    {{ item.label }}
                </a>
            </li>
        </ul>

        <button
            class="block cursor-pointer tracking-wide uppercase lg:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
        >
            {{ mobileMenuOpen ? 'Fermer' : 'Menu' }}
        </button>

        <div class="hidden lg:block">
            <DarkModeToggle />
        </div>
    </nav>

    <Teleport to="body">
        <Transition name="menu">
            <div v-if="mobileMenuOpen" class="bg-bg fixed inset-0 z-40 flex flex-col gap-3 pt-30 lg:hidden">
                <a
                    v-for="item in navItems"
                    :key="item.label"
                    :href="item.target"
                    class="px-6 text-4xl tracking-wide uppercase"
                    @click.prevent="scrollTo(item.target)"
                >
                    {{ item.label }}
                </a>
                <div class="px-6 pt-10">
                    <DarkModeToggle />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}
</style>
