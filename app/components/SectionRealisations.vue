<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sectionRef = ref<HTMLElement | null>(null);
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
            trigger: sectionRef.value,
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
    <section id="realisations" ref="sectionRef" class="bg-bg relative z-10 flex h-dvh flex-col">
        <div class="px-6 pt-12 pb-6 lg:px-10">
            <h2
                class="text-center text-3xl font-bold tracking-[0.15em] uppercase lg:text-left lg:text-sm lg:font-semibold lg:tracking-[0.3em] lg:opacity-70"
            >
                Nos Réalisations
            </h2>
        </div>

        <div ref="containerRef" class="relative flex-1 overflow-hidden">
            <div class="grid h-full grid-cols-2 gap-2 px-2 lg:grid-cols-4">
                <div
                    v-for="(col, i) in columns"
                    :key="i"
                    class="real-col flex flex-col gap-2 will-change-transform"
                    :class="{ 'hidden lg:flex': i >= 2 }"
                >
                    <img
                        v-for="(src, j) in col"
                        :key="j"
                        :src="src"
                        class="w-full rounded-sm object-cover"
                        alt=""
                        draggable="false"
                    />
                </div>
            </div>

            <div
                class="from-bg pointer-events-none absolute inset-x-0 bottom-0 flex h-40 items-end justify-center bg-linear-to-t to-transparent pb-8 lg:hidden"
            >
                <button
                    class="border-fg/40 pointer-events-auto rounded-full border px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase"
                >
                    Voir plus
                </button>
            </div>
        </div>
    </section>
</template>
