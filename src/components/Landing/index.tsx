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
                        Somewhere between logic and art,
                    </span>
                  <br />
                  <span className={styles.lineTwo}>
                        I build things for the web.
                    </span>
              </p>
          </div>
      </section>
    );
}