import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/image'],
    css: ['~/assets/css/tailwind.css'],
    app: {
        head: {
            meta: [
                { name: 'robots', content: 'noindex, nofollow' },
            ],
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
