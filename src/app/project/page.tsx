"use client";

import styles from './style.module.scss';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DocData {
    title: string;
    status: string;
    description: string;
    link?: string;
}

interface Project {
    title: string;
    subtitle: string;
    link?: string;
    external?: boolean;
    docs?: DocData;
}

const projects: Project[] = [
    {
        title: 'JPA',
        subtitle: 'Design & Development',
        link: 'https://joshipayalandassociates.com/',
        external: true
    },
    {
        title: 'CASVA',
        subtitle: 'Design & Development',
        link: 'https://casva.vercel.app/',
        external: true
    },
    {
        title: 'SnS',
        subtitle: 'Design & Development',
        link: 'https://snssat.vercel.app/',
        external: true
    },
    {
        title: 'Socials with Pooja',
        subtitle: 'Design & Development',
        link: 'https://socialswithpooja-d26z.vercel.app/',
        external: true
    },
    {
        title: 'TrustSnare',
        subtitle: 'Animation & Front-End',
        docs: {
            title: 'TrustSnare Extension',
            status: 'Live',
            description: 'A custom security-focused extension built with an emphasis on fluid interactive micro-interactions, low overhead state architecture, and clear visual systems.',
            link: 'https://example.com/trustsnare'
        }
    },
    {
        title: 'Orange Circle',
        subtitle: 'Design & Development',
        docs: {
            title: 'Orange Circle',
            status: 'In Production',
            description: 'This project is currently in production. Full documentation and a thorough interactive case study will be published immediately upon release.'
        }
    }
];

export default function Projects() {
    const [selectedDoc, setSelectedDoc] = useState<DocData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const modalOverlayRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            `.${styles.projectItem}`,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.out",
                stagger: 0.08,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%"
                }
            }
        );
    }, { scope: containerRef });

    const handleProjectClick = (project: Project) => {
        if (project.link && project.external) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
        } else if (project.docs) {
            setSelectedDoc(project.docs);
            setTimeout(() => {
                if (modalOverlayRef.current && modalContentRef.current) {
                    gsap.timeline()
                        .to(modalOverlayRef.current, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
                        .fromTo(modalContentRef.current,
                            { y: 25, scale: 0.98 },
                            { y: 0, scale: 1, duration: 0.45, ease: "power4.out" },
                            "-=0.2"
                        );
                }
            }, 10);
        }
    };

    const closeModal = () => {
        if (modalOverlayRef.current && modalContentRef.current) {
            gsap.timeline({
                onComplete: () => setSelectedDoc(null)
            })
                .to(modalContentRef.current, { y: 15, scale: 0.98, opacity: 0, duration: 0.25, ease: "power2.in" })
                .to(modalOverlayRef.current, { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, "-=0.15");
        }
    };

    return (
        <section className={styles.projects} ref={containerRef}>
            <div className={styles.list}>
                {projects.map((p, index) => (
                    <div
                        className={styles.projectItem}
                        key={p.title}
                        onClick={() => handleProjectClick(p)}
                    >
                        <div className={styles.hoverBackground} />

                        <div className={styles.metaLeft}>
                            <span className={styles.titleIndex}>
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <h2 className={styles.title}>{p.title}</h2>
                        </div>

                        <div className={styles.metaRight}>
                            <div className={styles.subtitle}>{p.subtitle}</div>
                            <div className={styles.arrowIcon}>↗</div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedDoc && (
                <div className={styles.modalOverlay} ref={modalOverlayRef} onClick={closeModal}>
                    <div className={styles.modalContent} ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
                        <span className={styles.statusTag}>{selectedDoc.status}</span>
                        <h2>{selectedDoc.title}</h2>
                        <p>{selectedDoc.description}</p>
                        {selectedDoc.link && (
                            <a href={selectedDoc.link} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                                Case Study Architecture ↗
                            </a>
                        )}
                        <button className={styles.closeButton} onClick={closeModal} aria-label="Close Modal">✕</button>
                    </div>
                </div>
            )}
        </section>
    );
}