<script setup lang="ts">
const sectionTitle = ref<HTMLElement | null>(null);

useTitleReveal(sectionTitle);

// Auto-discover partner logos from assets/images/partners/CICA_sponsors_<order>_<name>.svg
const partnerFiles = import.meta.glob('~/assets/images/partners/CICA_sponsors_*.svg', {
    eager: true,
    query: '?url',
    import: 'default',
});

const partners = Object.entries(partnerFiles)
    .map(([path, logo]) => {
        const file = path.split('/').pop()!.replace(/\.svg$/, '');
        const match = file.match(/^CICA_sponsors_(\d+)_(.+)$/);
        return {
            order: match ? Number(match[1]) : 0,
            name: match ? match[2] : file,
            logo: logo as string,
        };
    })
    .sort((a, b) => a.order - b.order);
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
                    class="partner-logo mx-6 h-16 w-32 shrink-0 object-contain lg:mx-16 lg:h-28 lg:w-56"
                />
                <img
                    v-for="(partner, i) in partners"
                    :key="'b' + i"
                    :src="partner.logo"
                    :alt="partner.name"
                    class="partner-logo mx-6 h-16 w-32 shrink-0 object-contain lg:mx-16 lg:h-28 lg:w-56"
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
