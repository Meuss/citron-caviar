<template>
    <footer id="contact" class="bg-bg relative z-10 px-6 pt-16 pb-12 lg:px-10 lg:pt-20 lg:pb-16">
        <div class="flex justify-center">
            <a
                href="mailto:info@citroncaviar.ch"
                class="border-fg/50 hover:bg-fg hover:text-bg inline-block border px-10 py-4 text-xs font-semibold tracking-[0.25em] uppercase transition-colors duration-300"
            >
                Nous contacter
            </a>
        </div>

        <h2 class="footer-title mt-16 text-center font-sans font-black lowercase lg:mt-20">citron caviar</h2>

        <div class="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            <div>
                <p class="text-xs font-semibold tracking-[0.2em] uppercase">Adresse</p>
                <p class="mt-2 text-sm leading-relaxed opacity-70">
                    Rue de la Lécheretta 12<br />
                    1630 Bulle
                </p>
            </div>

            <div>
                <p class="text-xs font-semibold tracking-[0.2em] uppercase">Contact</p>
                <a
                    href="mailto:info@citroncaviar.ch"
                    class="mt-2 inline-block text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                    info@citroncaviar.ch
                </a>
            </div>

            <div class="lg:text-right">
                <p class="text-xs font-semibold tracking-[0.2em] uppercase">Réseaux</p>
                <div class="mt-2 flex flex-col gap-1 lg:items-end">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener"
                        class="text-sm opacity-70 transition-opacity hover:opacity-100"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener"
                        class="text-sm opacity-70 transition-opacity hover:opacity-100"
                    >
                        Facebook
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-title {
    font-size: clamp(4rem, 18vw, 16rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
}
</style>
