<script setup lang="ts">
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const mobileMenuOpen = ref(false);

const navItems = [
    { label: 'ACCUEIL', target: '#smooth-content' },
    { label: 'RÉALISATIONS', target: '#realisations' },
    { label: 'SERVICES', target: '#services' },
    { label: 'CONTACT', target: '#contact' },
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
        <a href="#" class="text-sm font-bold tracking-tight" @click.prevent="scrollTo('#smooth-content')">
            citron caviar
        </a>

        <ul class="hidden items-center gap-10 lg:flex">
            <li v-for="item in navItems" :key="item.label">
                <a :href="item.target" class="nav-link" @click.prevent="scrollTo(item.target)">
                    {{ item.label }}
                </a>
            </li>
        </ul>

        <button
            class="block cursor-pointer text-xs font-semibold tracking-widest lg:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
        >
            {{ mobileMenuOpen ? 'CLOSE' : 'MENU' }}
        </button>

        <DarkModeToggle />
    </nav>

    <Teleport to="body">
        <Transition name="menu">
            <div
                v-if="mobileMenuOpen"
                class="bg-bg fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            >
                <a
                    v-for="item in navItems"
                    :key="item.label"
                    :href="item.target"
                    class="text-2xl font-bold tracking-widest"
                    @click.prevent="scrollTo(item.target)"
                >
                    {{ item.label }}
                </a>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.nav-link {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: inherit;
    transition: opacity 0.3s;
}

.nav-link:hover {
    opacity: 0.6;
}

.menu-enter-active,
.menu-leave-active {
    transition: opacity 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}
</style>
