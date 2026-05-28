<script setup lang="ts">
import gsap from 'gsap';

const heroSection = ref<{ $el: HTMLElement } | null>(null);
const heroText = ref<HTMLElement | null>(null);
const heroCitron = ref<HTMLElement | null>(null);
const heroCaviar = ref<HTMLElement | null>(null);
const heroSubtitle = ref<HTMLElement | null>(null);

onMounted(() => {
    const sectionEl = heroSection.value?.$el as HTMLElement | undefined;
    if (!sectionEl || !heroText.value) return;

    // Intro animation
    const nav = document.querySelector('nav');

    gsap.set(nav, { y: -30 });
    const words = [heroCitron.value, heroCaviar.value];
    gsap.set(words, { scale: 0.9, filter: 'blur(12px)', opacity: 0, y: 5 });
    gsap.set(heroSubtitle.value, { opacity: 0, y: 10 });

    const intro = gsap.timeline({ delay: 0.3 });
    intro
        .to(nav, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
        .to(
            words,
            { scale: 1, filter: 'blur(0px)', opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.1 },
            0.4,
        )
        .to(heroSubtitle.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.2);

    // Scroll-driven fade out
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    gsap.to(heroText.value, {
        scale: 0.7,
        filter: 'blur(20px)',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: isMobile ? '70% top' : 'bottom top',
            pin: isMobile ? false : sectionEl,
            pinSpacing: false,
            scrub: true,
        },
    });
});
</script>

<template>
    <ImageTrail ref="heroSection" class="hero-section flex h-svh items-center justify-center">
        <div ref="heroText" class="relative z-20 text-center">
            <h1 class="hero-title font-sans font-bold lowercase">
                <span ref="heroCitron" class="block opacity-0 lg:inline-block">citron</span>
                {{ ' ' }}
                <span ref="heroCaviar" class="block opacity-0 lg:inline-block">caviar</span>
            </h1>
            <p ref="heroSubtitle" class="mt-2 tracking-widest uppercase opacity-0">Agence événementielle</p>
        </div>
    </ImageTrail>
    <SectionRealisations />
    <SectionPartenaires />
    <SectionServices />
    <TheFooter />
</template>

<style scoped>
.hero-title {
    font-size: clamp(4rem, 25vw, 16rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
    @media (min-width: 1024px) {
        font-size: clamp(3rem, 12vw, 10rem);
        line-height: 1;
    }
}
</style>
