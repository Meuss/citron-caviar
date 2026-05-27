<script setup lang="ts">
import gsap from 'gsap';

const images = Object.values(
    import.meta.glob('~/assets/images/header/header_*.jpg', {
        eager: true,
        import: 'default',
    }),
) as string[];

// how many images can be visible at once (more = denser trail)
const POOL_SIZE = 15;
// min cursor distance (px) before spawning the next image (lower = more frequent)
const THRESHOLD = 140;

const containerRef = ref<HTMLElement | null>(null);
let imgEls: HTMLElement[] = [];
let idx = 0;
let lastX = 0;
let lastY = 0;
let isFirstMove = true;

onMounted(async () => {
    await nextTick();
    imgEls = Array.from(containerRef.value!.querySelectorAll('.trail-img'));
    gsap.set(imgEls, { opacity: 0, scale: 0 });
});

function onMove(e: MouseEvent) {
    const rect = containerRef.value!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isFirstMove) {
        lastX = x;
        lastY = y;
        isFirstMove = false;
        return;
    }

    const dx = x - lastX;
    const dy = y - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > THRESHOLD) {
        activate(x, y);
        lastX = x;
        lastY = y;
    }
}

function activate(x: number, y: number) {
    const el = imgEls[idx % POOL_SIZE] as HTMLElement;
    if (!el) return;
    idx++;

    gsap.killTweensOf(el);

    gsap.set(el, {
        left: x,
        top: y,
        xPercent: -50,
        yPercent: -50,
        // rotation: random tilt range in degrees (try [-5,5] for subtle, [-30,30] for wild)
        rotation: gsap.utils.random(-5, 5),
        scale: 0.6,
        opacity: 1,
        filter: 'blur(12px)',
        zIndex: (idx % POOL_SIZE) + 1,
    });

    // --- appear animation ---
    gsap.to(el, {
        scale: 1, // try 1.2 for a "pop" overshoot
        filter: 'blur(0px)',
        duration: 0.45, // speed of the scale-in (lower = snappier)
        ease: 'back.out(1.1)', // bounce intensity: increase the number for more elastic
    });

    // --- disappear animation ---
    gsap.to(el, {
        opacity: 0,
        scale: 0.8, // shrink target (0 = shrink to nothing, 1 = just fade)
        filter: 'blur(12px)',
        duration: 0.5, // how fast it fades out
        delay: 0.4, // how long the image stays fully visible before fading
        ease: 'power2.in',
    });
}

function onLeave() {
    isFirstMove = true;
}
</script>

<template>
    <div ref="containerRef" class="relative overflow-hidden" @mousemove="onMove" @mouseleave="onLeave">
        <!-- image size: h-70 w-47.5 (~280×190px). Try h-50 w-34 for smaller, h-90 w-60 for bigger -->
        <!-- rounded-sm = slight corners. Try rounded-lg or rounded-full for pill/circle shapes -->
        <ClientOnly>
            <div
                v-for="i in POOL_SIZE"
                :key="i"
                class="trail-img pointer-events-none absolute h-70 w-47.5 overflow-hidden rounded-sm"
            >
                <img
                    :src="images[(i - 1) % images.length]"
                    class="h-full w-full object-cover"
                    alt=""
                    draggable="false"
                />
            </div>
        </ClientOnly>

        <slot />
    </div>
</template>
