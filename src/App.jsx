// import * as f from './scripts/functions.js';

import React, { useState } from 'react';

import './App.css';
import Flashcard from './components/Flashcard';
import Newcard from './components/Newcard';

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

  const [allCards, setAllCards] = useState(returnDataObjectIfExistsOrCreateDataObjectIfNot())

  const [randomizedCards, setRandomizedCards] = useState(shuffleArray(allCards))

  const [japaneseInput, setJapaneseInput] = useState('');
  const [engInput, setEngInput] = useState('');

  const resetCardsState = () => {
    setRandomizedCards(shuffleArray(allCards));
  }

  if(typeof randomizedCards[0] === 'undefined') {
    resetCardsState();
  }

  const pushNewFlashcardToCardsArrayAndUpdateLocalStorage = () => {
    var newFlashcard = {};

    newFlashcard.japanese = japaneseInput;
    newFlashcard.eng = engInput;

    setJapaneseInput('');
    setEngInput('');

    var allCardsCopy = allCards.slice();
    allCardsCopy.push(newFlashcard);

    setAllCards(allCardsCopy);
    setRandomizedCards(shuffleArray(allCards));

    window.localStorage.setItem('userData', JSON.stringify(allCards));
  }

  const deleteFlashcard = () => {

    var allCardsCopy = allCards.slice();
    var randomizedCardsCopy = randomizedCards.slice();
    var removedObject = randomizedCardsCopy.shift();

    for(var i = 0; i < allCardsCopy.length; i++) {
      if(allCardsCopy[i].eng === removedObject.eng && allCardsCopy.length > 1) {
        allCardsCopy.splice(i, 1);
      }
    }

    setAllCards(allCardsCopy);
    setRandomizedCards(randomizedCardsCopy);

    window.localStorage.setItem('userData', JSON.stringify(allCardsCopy));

  }

  return (
    <div className="App">
      <Flashcard cards={randomizedCards} reset={resetCardsState}/>
      <button 
        onClick={() => setRandomizedCards(shiftRightAnswer(randomizedCards))} 
      >
        I got it right
      </button>
      <button 
        onClick={() => setRandomizedCards(pushAndShiftWrongAnswer(randomizedCards))} 
      >
        I got it wrong
      </button>
      <Newcard 
        engInput={engInput} 
        japaneseInput={japaneseInput} 
        engChange={event => setEngInput(event.target.value)}
        japChange={event => setJapaneseInput(event.target.value)}
        onClick={() => pushNewFlashcardToCardsArrayAndUpdateLocalStorage()}
      />
      <button
        onClick={() => deleteFlashcard()}
      >
        Delete current Card
      </button>
    </div>
  );
}

export default App;
