"use client";

import styles from './first.module.scss';
import Image from 'next/image';

export default function About() {
    return (
        <section className={styles.about}>
            <div className={styles.left}>
                <h1>ABOUT</h1>
                <p>
                    I’m a 22-year-old front-end developer from India with a passion for bringing designs to life
                    through pixel-perfect precision and smooth animations.
                    <br className={styles.desktopBreak} /> With a strong foundation in modern web technologies
                    <br className={styles.desktopBreak} /> and a keen eye for visual storytelling, I specialize in crafting
                    <br className={styles.desktopBreak} /> seamless micro-interactions and engaging user experiences.
                    <br className={styles.desktopBreak} /> My work reflects a blend of creativity and
                    technical expertise, <br className={styles.desktopBreak} />focused on transforming
                    ideas into interactive digital realities.
                </p>
            </div>

            <div className={styles.right}>
                <Image
                    src="/images/about.jpg"
                    alt="profile"
                    width={700}
                    height={700}
                    quality={90}
                    priority
                />
            </div>
        </section>
    );
}
