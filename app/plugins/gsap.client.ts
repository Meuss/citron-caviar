import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
});
