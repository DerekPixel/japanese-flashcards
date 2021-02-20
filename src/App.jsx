import React, { useState } from 'react'

import './App.css';
import Flashcard from './components/Flashcard';

function App() {

  

  function makeNewlocalStorageObject(){

    var Data = [
      {
        japanese: 'おはようございます',
        eng: 'Good Morning'
      },
      {
        japanese: 'こんにちは',
        eng: 'Hello / Good Afternoon'
      },
      {
        japanese: 'こんばんは',
        eng: 'Good Evening'
      },
      {
        japanese: 'ありがとうございます',
        eng: 'Thank you very much'
      },
    ]

    return JSON.stringify(Data);
  };

  function returnDataObjectIfExistsOrCreateDataObjectIfNot() {
    if(window.localStorage.getItem('userData') === null) {
      window.localStorage.setItem('userData', makeNewlocalStorageObject());
    } else {
      return JSON.parse(window.localStorage.getItem('userData'));
    }

    return JSON.parse(window.localStorage.getItem('userData'));
  };

  const shuffleArray = (array) => {

    var arrayCopy = array.slice();

    var m = arrayCopy.length, t, i;

    while(m) {
      i = Math.floor(Math.random() * m--);

      t = arrayCopy[m];
      arrayCopy[m] = arrayCopy[i];
      arrayCopy[i] = t;
    }

    return arrayCopy

  }

  const shiftRightAnswer = (array) => {
    var arrayCopy = array.slice();
    arrayCopy.shift();
    return arrayCopy;
  }

  const pushAndShiftWrongAnswer = (array) => {
    var arrayCopy = array.slice();
    arrayCopy.push(arrayCopy.shift());
    return arrayCopy;
  }

  const allCards = returnDataObjectIfExistsOrCreateDataObjectIfNot();

  const [randomizedCards, setRandomizedCards] = useState(shuffleArray(allCards))

  const resetCardsState = () => {
    setRandomizedCards(shuffleArray(allCards));
  }

  if(typeof randomizedCards[0] === 'undefined') {
    resetCardsState();
  }

  return (
    <div className="App">
      <Flashcard cards={randomizedCards} reset={resetCardsState}/>
      <button onClick={() => setRandomizedCards(shiftRightAnswer(randomizedCards))} >I got it right</button>
      <button onClick={() => setRandomizedCards(pushAndShiftWrongAnswer(randomizedCards))} >I got it wrong</button>
    </div>
  );
}

export default App;
