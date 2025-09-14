"use client";

import styles from "./style.module.scss";
import { Link } from 'next-view-transitions';
import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Magnetic from '@/ui/Magnetic/index';
import { usePathname } from "next/navigation";

export default function Header() {
    const container = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const pathname = usePathname();
    // isDarkPage determines color switch for desktop nav and logo only!
    const isDarkPage = pathname === "/work" || pathname === "/contact";

    const isActive = (href: string): boolean => pathname === href;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const closeMenu = useCallback((): void => {
        setIsMenuOpen(false);
        document.body.style.overflow = "auto";
    }, []);

    const handleNavClick = useCallback((): void => {
        closeMenu();
    }, [closeMenu]);

    const toggleMobileMenu = useCallback((): void => {
        setIsMenuOpen(!isMenuOpen);
    }, [isMenuOpen]);

    useGSAP(() => {
        gsap.set(".menuLinkItemHolder", {
            y: 75,
            opacity: 0,
        });

        tl.current = gsap
            .timeline({ paused: true })
            .to(".menuOverlay", {
                duration: 1.25,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut",
            })
            .to(".menuLinkItemHolder", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power4.inOut",
                delay: -0.75,
            });
    }, { scope: container });

    useEffect(() => {
        if (tl.current) {
            if (isMenuOpen) {
                tl.current.play();
                document.body.style.overflow = "hidden";
            } else {
                tl.current.reverse();
                document.body.style.overflow = "auto";
            }
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    return (
        <div
            className={`${styles.headerContainer} ${isDarkPage ? styles.darkHeader : ""}`}
            ref={container}
        >
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.brand} onClick={handleNavClick}>
                        <div className={styles.logoText}>
                            <h1>
                                <span className={styles.headText}>@Saurow</span>
                            </h1>
                        </div>
                    </Link>

                    <nav className={styles.desktopNav}>
                        <Magnetic>
                            <div className={styles.el}>
                                <Link
                                    href="/work"
                                    className={`${styles.navItem} ${isActive("/work") ? styles.activeNavItem : ""}`}
                                    onClick={handleNavClick}
                                >
                                    Work
                                    <div className={styles.indicator}></div>
                                </Link>
                            </div>
                        </Magnetic>

                        <Magnetic>
                            <div className={styles.el}>
                                <Link
                                    href="/about"
                                    className={`${styles.navItem} ${isActive("/about") ? styles.activeNavItem : ""}`}
                                    onClick={handleNavClick}
                                >
                                    About
                                    <div className={styles.indicator}></div>
                                </Link>
                            </div>
                        </Magnetic>

                        <Magnetic>
                            <div className={styles.el}>
                                <Link
                                    href="/contact"
                                    className={`${styles.navItem} ${isActive("/contact") ? styles.activeNavItem : ""}`}
                                    onClick={handleNavClick}
                                >
                                    Contact
                                    <div className={styles.indicator}></div>
                                </Link>
                            </div>
                        </Magnetic>
                    </nav>

                    <div
                        className={`${styles.mobileMenuBtn} ${isDarkPage ? styles.mobileMenuBtnWhite : ""}`}
                        onClick={toggleMobileMenu}
                    >
                        <span>Menu</span>
                    </div>
                </div>
            </header>

            <div className={`${styles.menuOverlay} menuOverlay`}>
                <div className={styles.menuOverlayBar}>
                    <div className={styles.menuClose} onClick={closeMenu}>
                        <span>&#x2715;</span>
                    </div>
                </div>
                <div className={styles.menuContent}>
                    <div className={styles.menuLinks}>
                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link href="/" className={styles.menuLink} onClick={handleNavClick}>
                                    Home
                                </Link>
                            </div>
                        </div>
                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link href="/work" className={styles.menuLink} onClick={handleNavClick}>
                                    Work
                                </Link>
                            </div>
                        </div>
                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link href="/about" className={styles.menuLink} onClick={handleNavClick}>
                                    About
                                </Link>
                            </div>
                        </div>
                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link href="/contact" className={styles.menuLink} onClick={handleNavClick}>
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.menuFooter}>
                    <p>&copy; 2025 Saurow</p>
                </div>
            </div>
        </div>
    );
}
