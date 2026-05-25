// Lenis smooth scroll + GSAP ScrollTrigger.
// The work section is pinned and the panels scroll horizontally as you wheel,
// then the page resumes normal vertical scroll.

(function () {
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ----- Lenis: smooth, animated scroll (the "dynamic glide between sections" feel) -----
    let lenis;
    if (window.Lenis && !prefersReducedMotion) {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.4,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Anchor links → smooth scroll via Lenis
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    lenis.scrollTo(target, { duration: 1.4 });
                }
            });
        });
    }

    // ----- GSAP ScrollTrigger -----
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Bridge Lenis → ScrollTrigger so pinning stays in sync
        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
        }

        // ===== Horizontal pinned projects =====
        const track = document.querySelector('.work-track');
        const panels = gsap.utils.toArray('.work-panel');

        if (track && panels.length && !isMobile) {
            const getDistance = () => track.scrollWidth - window.innerWidth;

            const horiz = gsap.to(track, {
                x: () => -getDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: '#work',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    end: () => '+=' + getDistance(),
                }
            });

            // Subtle panel fade-in as each enters the viewport from the right
            panels.forEach((panel, i) => {
                if (i === 0) return; // intro panel already visible
                gsap.from(panel.querySelector('.panel-card'), {
                    opacity: 0,
                    scale: 0.94,
                    y: 30,
                    ease: 'power2.out',
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: horiz,
                        start: 'left center',
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        } else if (track && isMobile) {
            // On mobile, let it scroll vertically as a stack
            track.style.flexDirection = 'column';
            track.style.height = 'auto';
            document.querySelectorAll('.work-panel').forEach(p => {
                p.style.flex = '0 0 auto';
                p.style.height = 'auto';
                p.style.padding = '3rem 1.25rem';
            });
            const pin = document.querySelector('.work-pin');
            if (pin) { pin.style.height = 'auto'; pin.style.overflow = 'visible'; }
        }

        // ===== Section reveal animations =====
        gsap.utils.toArray('.section-head, .about-grid, .side-card, .lab-list li, .contact-card').forEach((el, i) => {
            gsap.from(el, {
                opacity: 0,
                y: 36,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });
        });

        // ===== Hero entrance =====
        gsap.from('#hero .status-badge, #hero h1, .hero-desc, .cta-buttons, .meta-row', {
            opacity: 0,
            y: 28,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.1,
        });

        gsap.from('.hero-photo', {
            opacity: 0,
            x: 40,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3,
        });

        // Refresh once images load so pin distances are accurate
        window.addEventListener('load', () => ScrollTrigger.refresh());
    }
})();
