"use client";

import styles from "./page.module.css";
import Landing from '@/components/Landing/index';
import Show from '@/components/Projects/index';
import { ReactLenis } from "lenis/react";
import Des from '@/components/Des/index';

export default function Home() {
  return (
      <ReactLenis root>
          <div className={styles.page}>
              <Landing />
              <Des />
              <Show />
          </div>
      </ReactLenis>
  );
}
