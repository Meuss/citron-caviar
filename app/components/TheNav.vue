<script setup lang="ts">
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const route = useRoute();
const mobileMenuOpen = ref(false);
const navRef = ref<HTMLElement | null>(null);

// Reveal the nav itself (it starts at opacity-0) so it appears on every page —
// not only on the homepage, whose intro used to be the only thing that showed it.
onMounted(() => {
    gsap.fromTo(
        navRef.value,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 },
    );
});

const navItems = [
    { label: 'Accueil', target: '#smooth-content' },
    { label: 'Réalisations', target: '#realisations' },
    { label: 'Services', target: '#services' },
    { label: 'Contact', target: '#contact' },
];

async function scrollTo(target: string) {
    mobileMenuOpen.value = false;

    // The nav's sections all live on the home page. From a sub-page (e.g.
    // /realisations), navigate home first, then jump to the section. The home page's
    // pinned ScrollTriggers + lazy images settle asynchronously, shifting section
    // positions, so refresh + re-scroll a few times until the target lands at the top.
    if (route.path !== '/') {
        await navigateTo('/');
        await nextTick();

        // Re-scroll to the section on every ScrollTrigger refresh: the home page's
        // pinned sections refresh as their (lazy) images load, which is exactly when
        // the section's final position becomes known.
        const go = () => ScrollSmoother.get()?.scrollTo(target, false, 'top top');
        const onRefresh = () => go();
        ScrollTrigger.addEventListener('refresh', onRefresh);
        setTimeout(go, 150);
        setTimeout(() => ScrollTrigger.removeEventListener('refresh', onRefresh), 2500);
        return;
    }

    ScrollSmoother.get()?.scrollTo(target, true, 'top top');
}

function onMenuEnter(el: Element, done: () => void) {
    const items = el.querySelectorAll('.menu-item');
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(items, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ onComplete: done });
    tl.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.inOut' });
    tl.to(items, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '-=0.15');
}

function onMenuLeave(el: Element, done: () => void) {
    const items = el.querySelectorAll('.menu-item');
    const tl = gsap.timeline({ onComplete: done });
    tl.to(items, { y: -15, opacity: 0, duration: 0.25, stagger: 0.03, ease: 'power2.in' });
    tl.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.4, ease: 'power3.inOut' }, '-=0.1');
}
</script>

<template>
    <nav
        ref="navRef"
        class="bg-bg fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 opacity-0 transition-colors duration-400 lg:px-10"
    >
        <a href="/" class="font-medium" @click.prevent="scrollTo('#smooth-content')"> citron caviar </a>

        <ul class="hidden items-center gap-6 lg:flex">
            <li v-for="item in navItems" :key="item.label">
                <a :href="`/${item.target}`" class="uppercase" @click.prevent="scrollTo(item.target)">
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
        <Transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
            <div v-if="mobileMenuOpen" class="bg-bg fixed inset-0 z-40 flex flex-col gap-3 pt-30 lg:hidden">
                <a
                    v-for="item in navItems"
                    :key="item.label"
                    :href="`/${item.target}`"
                    class="menu-item px-6 text-4xl tracking-wide uppercase"
                    @click.prevent="scrollTo(item.target)"
                >
                    {{ item.label }}
                </a>
                <div class="menu-item px-6 pt-10">
                    <DarkModeToggle />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
