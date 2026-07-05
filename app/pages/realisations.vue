<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RealisationsResponse } from '~~/server/api/realisations.get';

useSeoMeta({ title: 'Nos Réalisations | Citron Caviar' });

// Client-side, non-blocking fetch so the page setup stays synchronous (a top-level
// `await` would make this an async/Suspense component and break the gsap intros).
// The grid sits below the fold, so it doesn't need to be server-rendered.
const { data } = useLazyAsyncData<RealisationsResponse>('realisations', () => $fetch('/api/realisations'), {
    server: false,
});

const source = computed(() => data.value?.source ?? 'local');
const projects = computed(() => data.value?.projects ?? []);
const imageProvider = computed(() => (source.value === 'cloudinary' ? 'cloudinary' : undefined));

const activeFilter = ref<'TOUT' | string>('TOUT');
const visibleProjects = computed(() =>
    activeFilter.value === 'TOUT' ? projects.value : projects.value.filter((p) => p.slug === activeFilter.value),
);

// Layout is driven by orientation, not count: wide/landscape images span the full
// width; portraits flow (3-up on desktop, 2-up on mobile). Works for any number of images.
const LANDSCAPE_RATIO = 1.2;
function isLandscape(image: { width?: number; height?: number }): boolean {
    return !!(image.width && image.height) && image.width / image.height >= LANDSCAPE_RATIO;
}

// Hero
const heroWord1 = ref<HTMLElement | null>(null);
const heroWord2 = ref<HTMLElement | null>(null);
const heroSubtitle = ref<HTMLElement | null>(null);

// Section heading reveal
const sectionTitle = ref<HTMLElement | null>(null);
useTitleReveal(sectionTitle);

onMounted(() => {
    const words = [heroWord1.value, heroWord2.value].filter(Boolean);
    gsap.set(words, { filter: 'blur(12px)', opacity: 0, y: 8 });
    gsap.set(heroSubtitle.value, { opacity: 0, y: 10 });
    gsap.timeline({ delay: 0.15 })
        .to(words, { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1 }, 0)
        .to(heroSubtitle.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5);

    // The page lives inside the global ScrollSmoother wrapper — recalc after mount.
    nextTick(() => ScrollTrigger.refresh());
});

// Filtering changes document height; keep ScrollSmoother/ScrollTrigger in sync.
watch(activeFilter, () => nextTick(() => ScrollTrigger.refresh()));
</script>

<template>
    <div>
        <section class="flex h-svh flex-col items-center justify-center px-6 text-center">
            <h1 class="hero-title font-sans font-bold uppercase">
                <span ref="heroWord1" class="block opacity-0 lg:inline-block">Nos</span>
                {{ ' ' }}
                <span ref="heroWord2" class="block opacity-0 lg:inline-block">Réalisations</span>
            </h1>
            <p ref="heroSubtitle" class="mt-2 font-normal tracking-widest uppercase opacity-0">
                Un peu plus en détails
            </p>
        </section>

        <section class="border-fg/50 bg-bg relative z-10 border-t">
            <div class="px-6 pb-6 lg:px-10 lg:pt-10 lg:pb-8">
                <h2 ref="sectionTitle" class="hidden text-3xl tracking-wide uppercase lg:block lg:text-5xl">
                    Nos Réalisations
                </h2>
            </div>

            <div class="flex flex-wrap justify-center gap-3 px-6 pb-8 lg:justify-start lg:px-10 lg:pb-10">
                <button
                    class="rounded-full px-5 pt-2 pb-1 text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:cursor-pointer lg:text-base"
                    :class="activeFilter === 'TOUT' ? 'bg-fg text-bg' : 'border-fg/50 hover:border-fg border'"
                    @click="activeFilter = 'TOUT'"
                >
                    Tout
                </button>
                <button
                    v-for="project in projects"
                    :key="project.slug"
                    class="rounded-full px-5 pt-2 pb-1 text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:cursor-pointer lg:text-base"
                    :class="activeFilter === project.slug ? 'bg-fg text-bg' : 'border-fg/50 hover:border-fg border'"
                    @click="activeFilter = project.slug"
                >
                    {{ project.label }}
                </button>
            </div>

            <div class="space-y-1 px-6 pb-20 lg:space-y-3 lg:px-10">
                <div v-for="project in visibleProjects" :key="project.slug" class="flex flex-wrap gap-3">
                    <NuxtImg
                        v-for="(image, i) in project.images"
                        :key="i"
                        :provider="imageProvider"
                        :src="image.publicId ?? image.url"
                        :sizes="isLandscape(image) ? '100vw lg:100vw' : '100vw lg:33vw'"
                        :densities="isLandscape(image) ? '1x 2x' : '1x 2x 3x'"
                        :class="
                            isLandscape(image)
                                ? 'aspect-video basis-full'
                                : 'aspect-3/4 grow basis-full lg:aspect-square lg:max-w-[calc(50%-6px)] lg:basis-[calc(33.333%-8px)]'
                        "
                        class="min-w-0 shrink-0 object-cover"
                        loading="lazy"
                        alt=""
                        draggable="false"
                    />
                </div>

                <p v-if="!projects.length" class="py-20 text-center opacity-70">Aucune réalisation pour le moment.</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
.hero-title {
    font-size: clamp(2.75rem, 13vw, 7rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
    @media (min-width: 1024px) {
        font-size: clamp(3rem, 11vw, 7rem);
        line-height: 1;
    }
}
</style>
