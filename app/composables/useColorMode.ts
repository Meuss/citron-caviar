export function useColorMode() {
    const mode = useState<'dark' | 'light'>('color-mode', () => 'dark');

    function toggle() {
        mode.value = mode.value === 'dark' ? 'light' : 'dark';
    }

    function apply() {
        document.documentElement.classList.toggle('light', mode.value === 'light');
    }

    if (import.meta.client) {
        const saved = localStorage.getItem('color-mode') as 'dark' | 'light' | null;
        if (saved) mode.value = saved;

        watch(
            mode,
            (val) => {
                localStorage.setItem('color-mode', val);
                apply();
            },
            { immediate: true },
        );
    }

    return { mode, toggle };
}
