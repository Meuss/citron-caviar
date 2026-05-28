<template>
    <footer id="contact" class="relative z-10 px-6 pt-16 pb-12 lg:px-10 lg:pt-20 lg:pb-16">
        <div class="flex justify-center">
            <a
                href="mailto:info@citroncaviar.ch"
                class="border-fg bg-fg/0 hover:bg-fg hover:text-bg border px-14 py-3 text-sm tracking-wide uppercase transition-colors duration-300"
            >
                Nous contacter
            </a>
        </div>

        <h2 class="footer-title mt-16 text-center font-sans font-bold lowercase lg:mt-20">citron caviar</h2>

        <div class="mt-16 grid grid-cols-[3fr_2fr] gap-10 lg:mt-20 lg:grid-cols-3">
            <div class="text-sm">
                <p class="tracking-wide uppercase">Adresse</p>
                <p>
                    Rue de la Lécheretta 12<br />
                    1630 Bulle
                </p>
            </div>

            <div class="order-3 text-sm lg:order-0 lg:text-center">
                <p class="tracking-wide uppercase">Contact</p>
                <a href="mailto:info@citroncaviar.ch" class="inline-block"> info@citroncaviar.ch </a>
            </div>

            <div class="order-2 text-sm lg:order-0 lg:text-right">
                <p class="tracking-wide uppercase">Réseaux</p>
                <div class="flex flex-col lg:items-end">
                    <a href="https://www.instagram.com/citron_caviar__/" target="_blank" rel="noopener"> Instagram </a>
                    <a href="https://www.facebook.com/citroncaviaragenceevenementielle/" target="_blank" rel="noopener">
                        Facebook
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-title {
    font-size: clamp(4rem, 30vw, 16rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
}
</style>
