
"use client";

import React from 'react';
import styles from '../styles/Card.module.css';

const Card = ({ fig, onClick, win }) => (
  <div className={styles.cardContainer}>
    <div className={`${styles.cardInner} ${fig.isFlipped ? styles.isFlipped : ''}`}>
      <div className={styles.cardface + ' ' + styles.front}>
        <button className={styles.cardButton} onClick={onClick}></button>
      </div>
      <div className={styles.cardface + ' ' + styles.back}>
        <img className={styles.cardImage} src={fig.image} alt={fig.name} />
        <a className={styles.wikis} hidden={!win} target="_blank" href={fig.wiki}>{fig.name}
        </a>
      </div>
    </div>
  </div>
);

export default Card;
