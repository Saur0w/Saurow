"use client";

import styles from './style.module.scss';

export default function Landing() {
    return (
      <section className={styles.landing}>
          <div className={styles.heading}>
              <h1>Saurow</h1>
          </div>

          <div className={styles.text}>
              <p>
                    <span className={styles.lineOne}>
                        Building for the web,
                    </span>
                  <br />
                  <span className={styles.lineTwo}>
                        Crafting motion rich web experiences.
                    </span>
              </p>
          </div>
      </section>
    );
}