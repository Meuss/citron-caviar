<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const outerRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const sectionTitle = ref<HTMLElement | null>(null);

useTitleReveal(sectionTitle);

const columns = [
    [
        '/images/realisations/col_1/1_pink_1.jpg',
        '/images/realisations/col_1/2_gesa_1.jpg',
        '/images/realisations/col_1/3_cremo_1.jpg',
        '/images/realisations/col_1/4_gesa_1.jpg',
        '/images/realisations/col_2/5_pink_1.jpg',
    ],
    [
        '/images/realisations/col_2/1_bcf_1.jpg',
        '/images/realisations/col_2/2_bumotec_1.jpg',
        '/images/realisations/col_2/3_redbull_1.jpg',
        '/images/realisations/col_2/4_cremo_1.jpg',
        '/images/realisations/col_1/5_bcf_1.jpg',
    ],
    [
        '/images/realisations/col_3/1_gesa_1.jpg',
        '/images/realisations/col_3/2_pink_1.jpg',
        '/images/realisations/col_3/4_bcf_1.jpg',
        '/images/realisations/col_3/5_cremo_1.jpg',
        '/images/realisations/col_3/5_mariage_2.jpg',
    ],
    [
        '/images/realisations/col_4/1_garage_1.jpg',
        '/images/realisations/col_4/2_redbull_1.jpg',
        '/images/realisations/col_4/3_bcf_1.jpg',
        '/images/realisations/col_4/4_chantier_1.jpg',
        '/images/realisations/col_4/5_bcf_2.jpg',
        '/images/realisations/col_4/1_garage_1.jpg',
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
            { y: 0 },
            {
                y: () => -colOverflow(col),
                duration: 1,
                ease,
            },
            0,
        );
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
    <section id="realisations" class="outer-section relative pt-16">
        <div class="border-fg/50 bg-bg border-t">
            <div class="px-6 pt-10 pb-6">
                <h2 ref="sectionTitle" class="text-3xl tracking-wide uppercase lg:text-5xl">Nos Réalisations</h2>
            </div>

            <div ref="outerRef" class="relative z-10 flex h-dvh flex-col">
                <div ref="containerRef" class="relative flex-1 overflow-hidden">
                    <div class="grid h-full grid-cols-2 gap-1 lg:grid-cols-[1fr_2fr_2fr_1fr] lg:gap-3">
                        <div
                            v-for="(col, i) in columns"
                            :key="i"
                            class="real-col flex flex-col gap-1 will-change-transform lg:gap-3"
                            :class="{ 'hidden lg:flex': i >= 2 }"
                        >
                            <NuxtImg
                                v-for="(src, j) in col"
                                :key="j"
                                :src="src"
                                class="w-full object-cover"
                                alt=""
                                draggable="false"
                                loading="lazy"
                                sizes="50vw lg:25vw"
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
