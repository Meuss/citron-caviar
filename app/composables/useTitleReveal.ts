import gsap from 'gsap';

/**
 * Splits an h2 into per-word spans and fades them in on scroll
 * with blur + opacity, staggered if multiple words.
 */
export function useTitleReveal(el: Ref<HTMLElement | null>) {
    onMounted(() => {
        const heading = el.value;
        if (!heading) return;

        const text = heading.textContent?.trim() ?? '';
        const words = text.split(/\s+/);

        heading.innerHTML = words.map((w) => `<span class="inline-block opacity-0">${w}</span>`).join(' ');

        const spans = heading.querySelectorAll('span');

        gsap.set(spans, { filter: 'blur(8px)', opacity: 0, y: 5 });

        gsap.to(spans, {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
                once: true,
            },
        });
    });
}
