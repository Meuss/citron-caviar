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
                { name: 'apple-mobile-web-app-title', content: 'citron caviar' },
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
                { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
                { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
                { rel: 'manifest', href: '/favicons/site.webmanifest' },
            ],
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
