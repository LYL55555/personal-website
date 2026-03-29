"use client";
import { useRef } from 'react';
import Interests from '@/components/hobbies/Interest';
import styles from './page.module.css';

const HobbiesPage = () => {
  const containerRef = useRef(null);

  return (
    <div className={styles.container} ref={containerRef}>
      <Interests containerRef={containerRef} />
    </div>
  );
};

export default HobbiesPage; 