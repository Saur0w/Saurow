"use client";
import styles from './style.module.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
const projects = [
    { title: 'MOSS', subtitle: 'Design & Development' },
    { title: 'JPA (Joshi Payal & Associates)', subtitle: 'Design & Development' },
    { title: 'Orange Circle', subtitle: 'Design & Development'},
    { title: 'LogoDeck', subtitle: 'UI & Animation' },
    { title: 'FinSaver', subtitle: 'Product & Front-End' }
];
export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        gsap.fromTo(
            ".projectItem",
            { y: 64, opacity: 0 },
            {
                delay: 0.5,
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1
            }
        );
    }, { scope: sectionRef });
    return (
        <section className={styles.projects} ref={sectionRef}>
            <div className={styles.list}>
                {projects.map((p, i) => (
                    <div className={`${styles.projectItem} projectItem`} key={p.title}>
                        <div className={styles.title}>{p.title}</div>
                        <div className={styles.subtitle}>{p.subtitle}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}