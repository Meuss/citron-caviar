<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const serviceCards = ref<HTMLElement[]>([]);
const sectionTitle = ref<HTMLElement | null>(null);

useTitleReveal(sectionTitle);

onMounted(() => {
    gsap.set(serviceCards.value, { opacity: 0 });

    ScrollTrigger.batch(serviceCards.value, {
        start: 'top 75%',
        once: true,
        onEnter: (batch) => {
            gsap.to(batch, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15,
            });
        },
    });
});

const services = [
    {
        title: "Organisation d'événements",
        description:
            'De la conception à la réalisation, nous prenons en charge chaque détail pour créer des événements uniques et mémorables.',
        image: '/images/services/organisation.jpg',
    },
    {
        title: 'Décoration & Scénographie',
        description:
            "Imagination et conception d'univers visuels sur mesure pour sublimer chaque événement et marquer les esprits.",
        image: '/images/services/decoration.jpg',
    },
    {
        title: 'Coordination & Logistique',
        description:
            'Organisation et gestion de chaque étape avec précision pour assurer un déroulement fluide et sans stress le jour&nbsp;J.',
        image: '/images/services/coordination.jpg',
    },
    {
        title: 'Location de matériel',
        description:
            "Mise à disposition d'une sélection de matériel de qualité pour répondre à tous les besoins et donner vie à chaque projet.",
        image: '/images/services/location.jpg',
    },
    {
        title: 'Mariage',
        description:
            "Accompagnement dans l'organisation du grand jour afin de créer une journée à votre image, élégante et inoubliable.",
        image: '/images/services/mariage.jpg',
    },
    {
        title: 'Communication événementielle',
        description:
            "Création de stratégies et de supports de communication pour valoriser chaque événement et en maximiser l'impact.",
        image: '/images/services/communication.jpg',
    },
];

const expandedSet = reactive(new Set<number>());

function toggle(index: number) {
    expandedSet.has(index) ? expandedSet.delete(index) : expandedSet.add(index);
}
</script>

<template>
    <section id="services" class="relative z-10">
        <div class="px-6 pt-10 pb-6">
            <div class="pt-10 pb-6">
                <h2 ref="sectionTitle" class="text-3xl tracking-wide uppercase lg:text-5xl">Services</h2>
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <button
                    v-for="(service, i) in services"
                    :ref="
                        (el) => {
                            if (el) serviceCards[i] = el as HTMLElement;
                        }
                    "
                    :key="i"
                    class="service-card group relative aspect-3/4 transform-gpu cursor-pointer overflow-hidden text-left"
                    @click="toggle(i)"
                >
                    <NuxtImg
                        :src="service.image"
                        :alt="service.title"
                        class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform backface-hidden"
                        :class="expandedSet.has(i) ? 'scale-105' : 'group-hover:scale-105'"
                        loading="lazy"
                        sizes="sm:50vw lg:33vw"
                    />

                    <div
                        class="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/30 transition-opacity duration-500"
                        :class="expandedSet.has(i) ? 'opacity-100' : 'opacity-70'"
                    />

                    <div class="relative z-10 flex h-full flex-col p-5 lg:p-6">
                        <div class="flex items-start justify-between gap-3">
                            <h3 class="text-white uppercase">
                                {{ service.title }}
                            </h3>

                            <div class="relative h-7 w-7 shrink-0">
                                <span
                                    class="absolute top-1/2 left-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white"
                                />
                                <span
                                    class="absolute top-1/2 left-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-white transition-transform duration-300"
                                    :class="expandedSet.has(i) ? 'scale-y-0' : 'scale-y-100'"
                                />
                            </div>
                        </div>

                        <div
                            class="grid transition-all duration-500 ease-out"
                            :class="
                                expandedSet.has(i) ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            "
                        >
                            <div class="overflow-hidden">
                                <p
                                    class="leading-relaxed text-white sm:pr-10 md:pr-20 lg:pr-10 xl:pr-20 2xl:pr-[30%]"
                                    v-html="service.description"
                                />
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </section>
</template>
