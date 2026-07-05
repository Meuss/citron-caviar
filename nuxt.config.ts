import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/image'],
    image: {
        // Netlify's Image CDN (/.netlify/images) only exists when served by Netlify.
        // Locally, fall back to Nuxt's built-in IPX provider so images resolve.
        provider: process.env.NETLIFY ? 'netlify' : 'ipx',
        format: ['avif', 'webp'],
        // Portfolio images live in Cloudinary; use `<NuxtImg provider="cloudinary">` for them.
        cloudinary: {
            baseURL: `https://res.cloudinary.com/${process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'}/image/upload/`,
        },
    },
    runtimeConfig: {
        // Server-only — set on Netlify as NUXT_CLOUDINARY_API_KEY / NUXT_CLOUDINARY_API_SECRET.
        cloudinaryApiKey: '',
        cloudinaryApiSecret: '',
        public: {
            // Public — set on Netlify as NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME.
            cloudinaryCloudName: '',
        },
    },
    css: ['~/assets/css/tailwind.css'],
    app: {
        head: {
            htmlAttrs: { lang: 'fr' },
            title: 'Citron Caviar | Agence événementielle à Bulle',
            meta: [
                {
                    name: 'description',
                    content: "Agence événementielle à Bulle. Organisation d'événements sur mesure, clé en main !",
                },
                { name: 'robots', content: 'noindex, nofollow' },
                { name: 'apple-mobile-web-app-title', content: 'citron caviar' },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Citron Caviar | Agence événementielle à Bulle' },
                {
                    property: 'og:description',
                    content: "Agence événementielle à Bulle. Organisation d'événements sur mesure, clé en main !",
                },
                { property: 'og:image', content: '/og-image.png' },
                { property: 'og:locale', content: 'fr_CH' },
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
        optimizeDeps: {
            include: ['gsap', 'gsap/ScrollSmoother', 'gsap/ScrollTrigger'],
        },
    },
});
