'use client';
import React from 'react'
import styles from './style.module.scss';

interface ProjectProps {
    index: number;
    title: string;
    type: string;
    manageModal: (active: boolean, index: number, x: number, y: number) => void;
}

export default function index({ index, title, type, manageModal }: ProjectProps) {

    return (
        <div onMouseEnter={(e: React.MouseEvent) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e: React.MouseEvent) => {manageModal(false, index, e.clientX, e.clientY)}} className={styles.project}>
            <h2>{title}</h2>
            <p>{type}</p>
        </div>
    )
}