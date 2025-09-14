"use client";

import styles from './first.module.scss';
import Image from 'next/image';

export default function About() {
    return (
        <section className={styles.about}>
            <div className={styles.left}>
                <h1>ABOUT</h1>
                <p>I’m a 22-year-old front-end developer from<br /> India with a passion for bringing designs to life<br /> through pixel-perfect precision and smooth animations.<br />
                    With a strong foundation in modern web technologies<br/> and a keen eye for visual storytelling, I specialize in crafting<br/> seamless micro-interactions and engaging user experiences.<br />
                    My work reflects a blend of creativity and<br /> technical expertise, focused on transforming<br /> ideas into interactive digital realities.</p>
            </div>

            <div className={styles.right}>
                <Image src="/images/about.jpg" alt="profile" width={700} height={700} />
            </div>
        </section>
    );
}
