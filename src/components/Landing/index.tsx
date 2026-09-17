'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Magnetic from '@/ui/Magnetic';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Scene = dynamic(() => import('./scene'), { ssr: false });

interface ImageProps {
    src: string;
    alt: string;
}

const images: ImageProps[] = [
    { src: '/images/look.jpg', alt: 'm' },
    { src: '/images/h.jpg', alt: 'h' },
    { src: '/images/t.jpg', alt: 't' },
    { src: '/images/b.jpg', alt: 'b' },
    { src: '/images/f.jpg', alt: 'look at the sky' },
    { src: '/images/musician.jpg', alt: 'Musician' },
    { src: '/images/rosa.jpg', alt: 'rosa' },
    { src: '/images/nurture.jpg', alt: 'Nurture' },
    { src: '/images/adf.jpg', alt: 'adf' },
    { src: '/images/green.jpg', alt: 'green' },
    { src: '/images/narin.jpg', alt: 'Narin' },
];

export default function Landing() {
    const landingRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu();
        };

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    useGSAP(() => {
        const imgs = containerRef.current?.querySelectorAll('img');
        if (!imgs) return;

        const tl2 = gsap.timeline();
        tl2.to(lineRef.current, {
            width: '75vw',
            duration: 2.5,
            ease: 'expo.inOut',
        });

        gsap.from(paraRef.current, {
            delay: 2.2,
            x: 300,
            duration: 1.5,
            ease: 'expo.inOut',
        });

        tl2.to(lineRef.current, {
            width: 0,
            duration: 1.2,
            ease: 'expo.inOut',
        });

        const tl = gsap.timeline({ delay: 1 });

        imgs.forEach((img, i) => {
            tl.set(
                img,
                {
                    opacity: 0,
                },
                i * 0.15
            );
        });

        tl.set(sceneRef.current, {
            opacity: 1,
        });

        const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 768;
        const headerDelay = isSmallScreen ? 0.3 : 2.8;

        const headerInners = headerRef.current?.querySelectorAll(`.${styles.maskInner}`);
        if (headerInners && headerRef.current) {
            gsap.set(headerRef.current, { opacity: 1 });
            gsap.fromTo(
                headerInners,
                {
                    yPercent: 120,
                },
                {
                    yPercent: 0,
                    duration: 1.1,
                    stagger: 0.04,
                    ease: 'power4.out',
                    delay: headerDelay,
                }
            );

            const hamburger = headerRef.current?.querySelector(`.${styles.hamburger}`);
            if (hamburger) {
                gsap.fromTo(
                    hamburger,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: headerDelay }
                );
            }
        }

        const footerInners = footerRef.current?.querySelectorAll(`.${styles.maskInner}`);
        if (footerInners && footerRef.current) {
            gsap.set(footerRef.current, { opacity: 1 });
            gsap.fromTo(
                footerInners,
                {
                    yPercent: 120,
                },
                {
                    yPercent: 0,
                    duration: 1.1,
                    stagger: 0.04,
                    ease: 'power4.out',
                    delay: 2.9,
                }
            );
        }

        // Parallax effects on landing page scrolling
        if (landingRef.current) {
            const isMobile = window.innerWidth <= 768;

            if (sceneRef.current) {
                gsap.to(sceneRef.current, {
                    y: isMobile ? -50 : -90,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: landingRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.6,
                    },
                });
            }

            if (paraRef.current) {
                gsap.to(paraRef.current, {
                    y: isMobile ? -95 : -170,
                    opacity: 0.35,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: landingRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.6,
                    },
                });
            }

            if (headerRef.current) {
                gsap.to(headerRef.current, {
                    y: -35,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: landingRef.current,
                        start: 'top top',
                        end: '35% top',
                        scrub: 0.5,
                    },
                });
            }

            if (footerRef.current) {
                gsap.to(footerRef.current, {
                    y: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: landingRef.current,
                        start: 'top top',
                        end: '35% top',
                        scrub: 0.5,
                    },
                });
            }
        }
    }, []);

    return (
        <section ref={landingRef} className={styles.landing}>
            <header ref={headerRef} style={{ opacity: 0 }}>
                <div className={styles.colBrand}>
                    <div className={styles.mask}>
                        <Link href="/" className={`${styles.brandTitle} ${styles.maskInner}`} onClick={closeMenu}>
                            SAUROW
                        </Link>
                    </div>
                </div>

                <div className={`${styles.col} ${styles.colStatus}`}>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>AVAILABLE TO DO FREELANCE</p>
                    </div>
                    <div className={styles.mask}>
                        <Link href="mailto:sauurow@gmail.com" className={`${styles.metaLink} ${styles.maskInner}`}>
                            SAUUROW@GMAIL.COM
                        </Link>
                    </div>
                </div>

                <div className={`${styles.col} ${styles.colRole}`}>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>Frontend Dev.</p>
                    </div>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>WEB DESIGN UI UX</p>
                    </div>
                </div>

                <div className={styles.colSocial}>
                    <div className={styles.mask}>
                        <p className={`${styles.metaLabel} ${styles.maskInner}`}>SOCIAL</p>
                    </div>
                    <ul>
                        <Magnetic>
                            <li className={styles.maskInline}>
                                <Link href="https://x.com/sauroww" className={styles.maskInner}>X</Link>
                            </li>
                        </Magnetic>
                        <Magnetic>
                            <li className={styles.maskInline}>
                                <Link href="https://www.linkedin.com/in/saurabh-thapliyal-76a0a6306/" className={styles.maskInner}>Li</Link>
                            </li>
                        </Magnetic>
                        <Magnetic>
                            <li className={styles.maskInline}>
                                <Link href="https://www.instagram.com/saur0w" className={styles.maskInner}>In</Link>
                            </li>
                        </Magnetic>
                    </ul>
                </div>

                <div className={styles.mobileNav}>
                    <Magnetic>
                        <button
                            className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ''}`}
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
                            <span className={styles.line1} />
                            <span className={styles.line2} />
                        </button>
                    </Magnetic>
                </div>
            </header>

            {/* Mobile Drawer Overlay */}
            <div
                className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}
                aria-hidden={!isMenuOpen}
            >
                <div className={styles.drawerContent}>
                    <nav className={styles.drawerNav}>
                        <ul>
                            <li>
                                <Link href="/" onClick={closeMenu}>
                                    <span className={styles.navNum}>01</span>
                                    <span className={styles.navText}>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/project" onClick={closeMenu}>
                                    <span className={styles.navNum}>02</span>
                                    <span className={styles.navText}>Projects</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" onClick={closeMenu}>
                                    <span className={styles.navNum}>03</span>
                                    <span className={styles.navText}>About</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" onClick={closeMenu}>
                                    <span className={styles.navNum}>04</span>
                                    <span className={styles.navText}>Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className={styles.drawerFooter}>
                        <div className={styles.drawerMeta}>
                            <p className={styles.drawerLabel}>STATUS</p>
                            <p className={styles.drawerVal}>AVAILABLE FOR FREELANCE</p>
                            <Link href="mailto:sauurow@gmail.com" className={styles.drawerEmail} onClick={closeMenu}>
                                SAUUROW@GMAIL.COM
                            </Link>
                        </div>

                        <div className={styles.drawerSocials}>
                            <p className={styles.drawerLabel}>SOCIAL</p>
                            <div className={styles.drawerSocialLinks}>
                                <Link href="https://x.com/sauroww" target="_blank" rel="noopener noreferrer">
                                    X (Twitter)
                                </Link>
                                <Link href="https://www.linkedin.com/in/saurabh-thapliyal-76a0a6306/" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </Link>
                                <Link href="https://www.instagram.com/saur0w" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scene} ref={sceneRef} style={{ opacity: 0 }}>
                <Scene />
            </div>

            <div className={styles.imageContainer} ref={containerRef}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="200px"
                        style={{
                            objectFit: 'cover',
                            zIndex: images.length - index,
                        }}
                    />
                ))}
            </div>

            <div className={styles.line} ref={lineRef} />

            <div className={styles.heading} ref={paraRef}>
                <h1>
                    AS<span className={styles.dot}>●</span>01<br />/04
                </h1>
            </div>

            <footer ref={footerRef} style={{ opacity: 0 }}>
                <div className={styles.footerLeft}>
                    <div className={styles.mask}>
                        <p className={styles.maskInner}>© DESIGN</p>
                    </div>
                    <div className={styles.mask}>
                        <p className={styles.maskInner}>SAUROW</p>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    <div className={styles.mask}>
                        <p className={styles.maskInner}>DEV. SAUROW</p>
                    </div>
                </div>
            </footer>
        </section>
    );
}