<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const outerRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

const columns = [
    [
        '/realisations/col_1/1 CICA_site_pink 1.jpg',
        '/realisations/col_1/2 CICA_site_gesa 1.jpg',
        '/realisations/col_1/3 CICA_site_cremo 1.jpg',
        '/realisations/col_1/4 CICA_site_gesa 1.jpg',
        '/realisations/col_1/5 CICA_site_bcf 1.jpg',
    ],
    [
        '/realisations/col_2/1 CICA_site_bcf 1.jpg',
        '/realisations/col_2/2 CICA_site_bumotec 1.jpg',
        '/realisations/col_2/3 CICA_site_redbull 1.jpg',
        '/realisations/col_2/4 CICA_site_cremo 1.jpg',
        '/realisations/col_2/5 CICA_site_pink 1.jpg',
    ],
    [
        '/realisations/col_3/1 CICA_site_gesa 1.jpg',
        '/realisations/col_3/2 CICA_site_pink 1.jpg',
        '/realisations/col_3/4 CICA_site_bcf 1.jpg',
        '/realisations/col_3/5 CICA_site_cremo 1.jpg',
        '/realisations/col_3/5 CICA_site_mariage 2.jpg',
    ],
    [
        '/realisations/col_4/1 CICA_site_garage 1.jpg',
        '/realisations/col_4/2 CICA_site_redbull 1.jpg',
        '/realisations/col_4/3 CICA_site_bcf 1.jpg',
        '/realisations/col_4/4 CICA_site_chantier 1.jpg',
        '/realisations/col_4/5 CICA_site_bcf 2.jpg',
    ],
];

const ease = 'none';

onMounted(async () => {
    await nextTick();

    const container = containerRef.value!;
    const cols = Array.from(container.querySelectorAll('.real-col')) as HTMLElement[];
    const containerHeight = container.clientHeight;

    function colContentHeight(col: HTMLElement) {
        const last = col.querySelector('img:last-child') as HTMLElement | null;
        return last ? last.offsetTop + last.offsetHeight : col.scrollHeight;
    }

    function colOverflow(col: HTMLElement) {
        return Math.max(0, colContentHeight(col) - containerHeight);
    }

    function maxOverflow() {
        return Math.max(100, ...cols.map((c) => colOverflow(c)));
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: outerRef.value,
            start: 'top top',
            end: () => `+=${maxOverflow() * 0.75}`,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
        },
    });

    cols.forEach((col, i) => {
        tl.fromTo(
            col,
            { y: i % 2 === 1 ? () => -maxOverflow() * 0.08 : 0 },
            {
                y: () => -colOverflow(col),
                duration: 1,
                ease,
            },
            0,
        );
    });

    // Set initial stagger for odd columns
    cols.forEach((col, i) => {
        if (i % 2 === 1) {
            gsap.set(col, { y: () => -maxOverflow() * 0.08 });
        }
    });

    const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
    if (!imgs.every((img) => img.complete)) {
        await Promise.all(
            imgs.map((img) =>
                img.complete
                    ? Promise.resolve()
                    : new Promise<void>((resolve) => {
                          img.onload = () => resolve();
                          img.onerror = () => resolve();
                      }),
            ),
        );
        ScrollTrigger.refresh();
    }
});
</script>

<template>
    <section id="realisations" class="outer-section pt-16">
        <div class="border-fg/50 border-t">
            <div class="px-6 pt-10 pb-6">
                <h2 class="text-3xl tracking-wide uppercase lg:text-5xl">Nos Réalisations</h2>
            </div>

            <div ref="outerRef" class="relative z-10 flex h-dvh flex-col">
                <div ref="containerRef" class="relative flex-1 overflow-hidden">
                    <div class="grid h-full grid-cols-2 gap-3 lg:grid-cols-4">
                        <div
                            v-for="(col, i) in columns"
                            :key="i"
                            class="real-col flex flex-col gap-3 will-change-transform"
                            :class="{ 'hidden lg:flex': i >= 2 }"
                        >
                            <img
                                v-for="(src, j) in col"
                                :key="j"
                                :src="src"
                                class="w-full object-cover"
                                alt=""
                                draggable="false"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-20 flex justify-center">
                <a
                    href="#"
                    class="border-fg hover:bg-fg hover:text-bg border px-14 py-3 text-sm tracking-wide uppercase transition-colors duration-300"
                >
                    Voir plus
                </a>
            </div>
        </div>
    </section>
</template>
