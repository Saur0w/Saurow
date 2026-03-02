'use client';
import styles from './style.module.scss'
import React, { useState, useEffect, useRef } from 'react';
import Project from './projects/index';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '@/ui/Rounded/index';
import Link from 'next/link';

interface ProjectType {
    title: string;
    type: string;
    src: string;
    color: string;
}

interface ModalState {
    active: boolean;
    index: number;
}

const projects: ProjectType[] = [
    {
        title: "Expandable Navbar",
        type: "UI Component",
        src: "menu.png",
        color: "#000000"
    },
    {
        title: "SVG Morph",
        type: "Animation Effect",
        src: "morph.png",
        color: "#8C8C8C"
    },
    {
        title: "Parallax Scroll",
        type: "Scroll Effect",
        src: "parallax.png",
        color: "#EFE8D3"
    },
    {
        title: "Magnetic UI",
        type: "Interactive UI",
        src: "magnetic.png",
        color: "#706D63"
    }
];

export default function Home() {
    const [modal, setModal] = useState<ModalState>({ active: false, index: 0 })
    const { active, index } = modal;

    const modalContainer = useRef<HTMLDivElement>(null);
    const cursor = useRef<HTMLDivElement>(null);
    const cursorLabel = useRef<HTMLDivElement>(null);

    const xMoveContainer = useRef<gsap.QuickToFunc | null>(null);
    const yMoveContainer = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);

    useEffect(() => {
        xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
        yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
        xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
        yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
        xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
        yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });
    }, [])

    useEffect(() => {
        if (active) {
            gsap.to(modalContainer.current, {
                scale: 1,
                duration: 0.4,
                ease: "power3.inOut"
            });
            gsap.to(cursor.current, {
                scale: 1,
                duration: 0.4,
                ease: "power3.inOut"
            });
            gsap.to(cursorLabel.current, {
                scale: 1,
                duration: 0.4,
                ease: "power3.inOut"
            });
        } else {
            gsap.to(modalContainer.current, {
                scale: 0,
                duration: 0.4,
                ease: "power3.inOut"
            });
            gsap.to(cursor.current, {
                scale: 0,
                duration: 0.4,
                ease: "power3.inOut"
            });
            gsap.to(cursorLabel.current, {
                scale: 0,
                duration: 0.4,
                ease: "power3.inOut"
            });
        }
    }, [active])

    const moveItems = (x: number, y: number): void => {
        xMoveContainer.current?.(x);
        yMoveContainer.current?.(y);
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
        xMoveCursorLabel.current?.(x);
        yMoveCursorLabel.current?.(y);
    }

    const manageModal = (active: boolean, index: number, x: number, y: number): void => {
        moveItems(x, y);
        setModal({ active, index });
    }

    return (
        <main onMouseMove={(e: React.MouseEvent) => { moveItems(e.clientX, e.clientY) }} className={styles.projects}>
            <div className={styles.body}>
                {
                    projects.map((project: ProjectType, index: number) => {
                        return <Project index={index} title={project.title} type={project.type} manageModal={manageModal} key={index} />
                    })
                }
            </div>
            <Rounded>
                <Link href="/project">More Work</Link>
            </Rounded>
            <>
                <div
                    ref={modalContainer}
                    style={{ transform: "translate(-50%, -50%) scale(0)" }}
                    className={styles.modalContainer}
                >
                    <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
                        {
                            projects.map((project: ProjectType, index: number) => {
                                const { src, color } = project;
                                return (
                                    <div className={styles.modal} style={{ backgroundColor: color }} key={`modal_${index}`}>
                                        <Image
                                            src={`/images/${src}`}
                                            width={300}
                                            height={0}
                                            alt="image"
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div
                    ref={cursor}
                    style={{ transform: "translate(-50%, -50%) scale(0)" }}
                    className={styles.cursor}
                />
                <div
                    ref={cursorLabel}
                    style={{ transform: "translate(-50%, -50%) scale(0)" }}
                    className={styles.cursorLabel}
                >
                    View
                </div>
            </>
        </main>
    )
}