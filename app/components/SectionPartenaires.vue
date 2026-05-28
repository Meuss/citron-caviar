<script setup lang="ts">
const sectionTitle = ref<HTMLElement | null>(null);

useTitleReveal(sectionTitle);

const partners = [
    { name: 'Le Buro', logo: '/images/partners/logo-le-buro.svg' },
    { name: 'Le Buro', logo: '/images/partners/logo-le-buro.svg' },
    { name: 'Le Buro', logo: '/images/partners/logo-le-buro.svg' },
    { name: 'Le Buro', logo: '/images/partners/logo-le-buro.svg' },
    { name: 'Le Buro', logo: '/images/partners/logo-le-buro.svg' },
    { name: 'Le Buro', logo: '/images/partners/logo-le-buro.svg' },
];
</script>

<template>
    <section class="relative z-10 pt-20 pb-10 lg:pb-20">
        <div class="px-6 pb-10 lg:pb-20">
            <h2 ref="sectionTitle" class="text-3xl tracking-wide uppercase lg:text-5xl">Nos Partenaires</h2>
        </div>

        <div class="marquee-wrap overflow-hidden">
            <div class="marquee-track flex w-max items-center">
                <img
                    v-for="(partner, i) in partners"
                    :key="'a' + i"
                    :src="partner.logo"
                    :alt="partner.name"
                    class="partner-logo mx-6 h-12 w-auto shrink-0 lg:mx-16 lg:h-24"
                />
                <img
                    v-for="(partner, i) in partners"
                    :key="'b' + i"
                    :src="partner.logo"
                    :alt="partner.name"
                    class="partner-logo mx-6 h-12 w-auto shrink-0 lg:mx-16 lg:h-24"
                />
            </div>
        </div>
    </section>
</template>

<style>
.marquee-track {
    animation: marquee 30s linear infinite;
}

@keyframes marquee {
    to {
        transform: translateX(-50%);
    }
}

.partner-logo {
    transition: filter 0.4s;
}

:root.light .partner-logo {
    filter: invert(1);
}
</style>
