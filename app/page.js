"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Nav from './components/Nav';
import Card from './components/Card';
import styles from './styles/Home.module.css';

import pics from './data/data';
import { shuffle } from './utils/shuffle';

const Home = () => {
  const [listo, setListo] = useState([]);
  const [names, setNames] = useState([]);
  const [count, setCount] = useState(0);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const shuffledPics = shuffle(pics);
    let doubledPics = [];
    for (let i = 0; i < 8; i++) {
      doubledPics.push(shuffledPics[i]);
      doubledPics.push({ ...shuffledPics[i], id: shuffledPics[i].id + 0.5 });
    }
    setListo(shuffle(doubledPics));
  }, []);

  useEffect(() => {
    if (names.length === 2) {
      if (names[0].name !== names[1].name) {
        setTimeout(() => {
          setListo(prevListo =>
            prevListo.map(x => {
              if (x.name === names[0].name || x.name === names[1].name) {
                return { ...x, isFlipped: false };
              }
              return x;
            })
          );
        }, 800);
      } else {
        const hasWon = listo.every(x => x.isFlipped);
        setWin(hasWon);
        if (hasWon) {
          alert(`You won with ${count} clicks. Now click on Wikipedia links to learn about these amazing people.`);
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
    <div className={styles.pageContainer}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={styles.content}>
      <button className={styles.refreshButton} onClick={() => window.location.reload()}>
          Play Again
        </button>
        <ul className={styles.cardList}>
          {listo.map((fig, index) => (
            <Card
              key={fig.id}
              fig={fig}
              onClick={() => handleCardClick(fig, index)}
              win={win}
            />
          ))}
        </ul>
      </div>
      <footer className={styles.footer}>
        <i className="fa-brands fa-github"></i>
        <h4>
          Created By: <a href="https://github.com/nigorita/femory-refactored">Negar Rahbar</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
