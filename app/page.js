// /app/page.js

"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Nav from './components/Nav';
import Card from './components/Card';
import pics from './data/data';
import { shuffle } from './utils/shuffle';
import styles from './styles/Home.module.css';

const Home = () => {
  const [listo, setListo] = useState([]);
  const [names, setNames] = useState([]);
  const [count, setCount] = useState(0);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const shuffledPics = shuffle(pics);

    if (shuffledPics.length < 8) {
      console.error("Not enough pictures to create pairs.");
      return;
    }

    let doubledPics = [];
    for (let i = 0; i < 8; i++) {
      if (!shuffledPics[i]) {
        console.error(`shuffledPics[${i}] is undefined`);
        continue;
      }
      doubledPics.push({ ...shuffledPics[i], isFlipped: false });
      doubledPics.push({ ...shuffledPics[i], id: shuffledPics[i].id + 0.5, isFlipped: false });
    }
    setListo(shuffle(doubledPics));
  }, []);

  useEffect(() => {
    if (names.length === 2) {
      if (names[0].name !== names[1].name) {
        setTimeout(() => {
          setListo(prevListo =>
            prevListo.map(item =>
              item.name === names[0].name || item.name === names[1].name
                ? { ...item, isFlipped: false }
                : item
            )
          );
        }, 800);
      } else {
        const hasWon = listo.every(item => item.isFlipped);
        setWin(hasWon);
        if (hasWon) {
          setTimeout(() => {
            alert(`You won with ${count} clicks. Now click on Wikipedia links to learn about these amazing people.`);
          }, 1200);
        }
      }
      setNames([]);
    }
  }, [names, listo, count]);

  const handleCardClick = (fig, index) => {
    if (!fig.isFlipped) {
      setCount(count + 1);
      setNames([...names, { name: fig.name, id: fig.id }]);
      setListo(prevListo => {
        const newList = [...prevListo];
        newList[index].isFlipped = true;
        return newList;
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <h4>Created By: Negar Rahbar</h4>
      <button className={styles.refreshButton} onClick={() => window.location.reload()}>
        Play Again
      </button>
      <ul className={styles.cardList}>
        {listo.map((fig, index) => (
          <Card
            key={index}
            fig={fig}
            onClick={() => handleCardClick(fig, index)}
            win={win}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
