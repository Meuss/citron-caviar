/**
 * Scales text so it always fills the full content width of its container.
 *
 * By default the element is kept on one line and fitted as a whole. Pass
 * `stackBelow` (a viewport width in px) to make each word (each `<span>`
 * produced by the reveal split) sit on its own line, each fitted to full
 * width, below that width — e.g. "citron" / "caviar" stacked on mobile.
 *
 * Text width scales linearly with font-size, so one measurement per node
 * is exact. Re-fits on resize and once webfonts have loaded.
 */
export function useFitText(el: Ref<HTMLElement | null>, opts: { stackBelow?: number } = {}) {
    const { stackBelow = 0 } = opts;

    // Set `node`'s font-size so its text spans exactly `target` px wide.
    const fitNode = (node: HTMLElement, target: number) => {
        const range = document.createRange();
        range.selectNodeContents(node);
        const textWidth = range.getBoundingClientRect().width;
        if (!textWidth) return;

        const current = parseFloat(getComputedStyle(node).fontSize);
        node.style.fontSize = `${(current * target) / textWidth}px`;
    };

    const fit = () => {
        const node = el.value;
        if (!node) return;

        const spans = [...node.querySelectorAll<HTMLElement>('span')];
        const stacked = stackBelow > 0 && spans.length > 1 && window.innerWidth < stackBelow;
        const target = node.clientWidth; // container content width (viewport − layout padding)

        if (stacked) {
            // Each word on its own line, each stretched to full width.
            node.style.whiteSpace = '';
            node.style.fontSize = '';
            for (const span of spans) {
                span.style.display = 'block';
                span.style.whiteSpace = 'nowrap';
                fitNode(span, target);
            }
        } else {
            // Whole title on one line, stretched to full width.
            for (const span of spans) {
                span.style.display = '';
                span.style.whiteSpace = '';
                span.style.fontSize = '';
            }
            node.style.whiteSpace = 'nowrap';
            fitNode(node, target);
        }
    };

    onMounted(() => {
        fit();
        // Metrics change once the webfont swaps in — re-fit then.
        document.fonts?.ready.then(fit);
        window.addEventListener('resize', fit);
    });

    onBeforeUnmount(() => window.removeEventListener('resize', fit));
}
