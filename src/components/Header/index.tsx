"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, useGSAP);
}

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/project" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const pill = pillRef.current;
        const nav = navRef.current;
        const list = listRef.current;

        if (!container || !pill || !nav || !list) return;

        const menuSplit = new SplitText(".menu-text", { type: "chars" });

        const tl = gsap.timeline({ paused: true });

        tl.to(container, {
            width: "600px",
            duration: 0.7,
            ease: "power4.inOut",
        }, 0);

        tl.to(menuSplit.chars, {
            y: -20,
            opacity: 0,
            stagger: 0.03,
            duration: 0.4,
            ease: "power2.inOut",
        }, 0);

        tl.to(nav, {
            opacity: 1,
            duration: 0.3,
        }, 0.3);

        tl.fromTo(
            list.querySelectorAll("a"),
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.02,
                duration: 0.5,
                ease: "power3.out",
            },
            0.35
        );

        const onMouseEnterHeader = () => tl.play();
        const onMouseLeaveHeader = () => tl.reverse();

        const onMouseEnterItem = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLLIElement;
            const { offsetLeft, offsetWidth } = target;
            const link = target.querySelector("a");

            gsap.to(pill, {
                x: offsetLeft,
                width: offsetWidth,
                opacity: 1,
                duration: 0.4,
                ease: "power3.out",
            });

            if (link) gsap.to(link, { color: "#000000", duration: 0.3 });

            const items = list.querySelectorAll("li");
            items.forEach((li) => {
                if (li !== target) {
                    gsap.to(li.querySelector("a"), { color: "#ffffff", opacity: 0.6, duration: 0.3 });
                }
            });
        };

        const onMouseLeaveList = () => {
            gsap.to(pill, { opacity: 0, duration: 0.3 });
            gsap.to(list.querySelectorAll("a"), { color: "#ffffff", opacity: 1, duration: 0.3 });
        };

        container.addEventListener("mouseenter", onMouseEnterHeader);
        container.addEventListener("mouseleave", onMouseLeaveHeader);
        list.addEventListener("mouseleave", onMouseLeaveList);

        const navItems = list.querySelectorAll("li");
        navItems.forEach((item) => {
            item.addEventListener("mouseenter", onMouseEnterItem as EventListener);
        });

        return () => {
            menuSplit.revert();
            container.removeEventListener("mouseenter", onMouseEnterHeader);
            container.removeEventListener("mouseleave", onMouseLeaveHeader);
            list.removeEventListener("mouseleave", onMouseLeaveList);
            navItems.forEach((item) => {
                item.removeEventListener("mouseenter", onMouseEnterItem as EventListener);
            });
        };
    }, { scope: containerRef });

    return (
        <header className={styles.header}>
            <div className={styles.container} ref={containerRef}>
                <p className="menu-text">Menu</p>
                <nav ref={navRef} className={styles.nav}>
                    <ul ref={listRef}>
                        <div className={styles.pill} ref={pillRef} />
                        {NAV_ITEMS.map((navLink) => (
                            <li key={navLink.label}>
                                <Link href={navLink.href} className="nav-link-text">
                                    {navLink.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}