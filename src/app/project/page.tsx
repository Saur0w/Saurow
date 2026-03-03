"use client";
import styles from './style.module.scss';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface Project {
    title: string;
    subtitle: string;
    link?: string;
    external?: boolean;
    docs?: DocData;
}

interface DocData {
    title: string;
    status: string;
    description: string;
    link?: string;
}

const projects: Project[] = [
    {
        title: 'JPA',
        subtitle: 'Design & Development',
        link: 'https://joshipayalandassociates.com/',
        external: true
    },
    {
        title: 'SnS',
        subtitle: 'Design & Development',
        link: 'https://snssat.vercel.app/',
        external: true
    },
    {
        title: 'TrustSnare',
        subtitle: 'Animation & Front-End',
        docs: {
            title: 'TrustSnare Browser Extension',
            status: 'Live',
            description: 'A browser extension my friends and I built. I worked on animation and front-end development, creating smooth transitions and an intuitive interface. It helps users [main functionality].',
            link: 'https://example.com/trustsnare'
        }
    },
    {
        title: 'Orange Circle',
        subtitle: 'Design & Development',
        docs: {
            title: 'Orange Circle',
            status: 'In Production',
            description: 'This project is currently in production. Full documentation and case study will be available upon release.'
        }
    },
    {
        title: 'MOSS',
        subtitle: 'Design & Development',
        docs: {
            title: 'MOSS',
            status: 'In Production',
            description: 'MOSS is currently in production. It is an experimental platform focused on [concept]. More details coming soon.'
        }
    },
    {
        title: 'LogoDeck',
        subtitle: 'UI & Animation',
        docs: {
            title: 'LogoDeck',
            status: 'In Production',
            description: 'LogoDeck is currently in production. It is an experimental platform focused on [concept]. More details coming soon.'
        }
    }
];

export default function Projects() {
    const [selectedDoc, setSelectedDoc] = useState<DocData | null>(null);
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

    const handleProjectClick = (project: Project) => {
        if (project.link && project.external) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
        } else if (project.docs) {
            setSelectedDoc(project.docs);
        }
    };

    const closeModal = () => setSelectedDoc(null);

    return (
        <section className={styles.projects} ref={sectionRef}>
            <div className={styles.list}>
                {projects.map((p) => (
                    <div className={`${styles.projectItem} projectItem`} key={p.title} onClick={() => handleProjectClick(p)}>
                        <div className={styles.title}>{p.title}</div>
                        <div className={styles.subtitle}>{p.subtitle}</div>
                    </div>
                ))}
            </div>
            {selectedDoc && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedDoc.title}</h2>
                        {selectedDoc.status && <p><strong>Status:</strong> {selectedDoc.status}</p>}
                        <p>{selectedDoc.description}</p>
                        {selectedDoc.link && (
                            <p>
                                <a href={selectedDoc.link} target="_blank" rel="noopener noreferrer">
                                    Learn more ↗
                                </a>
                            </p>
                        )}
                        <button className={styles.closeButton} onClick={closeModal}>✕</button>
                    </div>
                </div>
            )}
        </section>
    );
}