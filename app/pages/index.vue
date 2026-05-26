<script setup lang="ts">
import gsap from 'gsap';

const heroSection = ref<{ $el: HTMLElement } | null>(null);
const heroText = ref<HTMLElement | null>(null);

onMounted(() => {
    const sectionEl = heroSection.value?.$el as HTMLElement | undefined;
    if (!sectionEl || !heroText.value) return;

    gsap.to(heroText.value, {
        scale: 0.7,
        filter: 'blur(20px)',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: 'bottom top',
            pin: sectionEl,
            pinSpacing: false,
            scrub: true,
        },
    });
});
</script>

<template>
    <ImageTrail ref="heroSection" class="hero-section flex h-dvh items-center justify-center">
        <div ref="heroText" class="relative z-20 text-center">
            <h1 class="hero-title font-sans font-black lowercase">citron caviar</h1>
            <p class="mt-4 text-xs font-semibold tracking-[0.3em] uppercase opacity-70 sm:text-sm sm:tracking-[0.35em]">
                Agence événementielle
            </p>
        </div>
    </ImageTrail>
    <SectionRealisations />
    <SectionPartenaires />
    <SectionServices />
    <TheFooter />
</template>

<style scoped>
.hero-title {
    font-size: clamp(3rem, 12vw, 10rem);
    line-height: 0.95;
    letter-spacing: -0.03em;
}
</style>
