import React, { useState } from 'react';

import './App.css';
import Flashcard from './components/Flashcard';
import Newcard from './components/Newcard';

function App() {

  //FUNCTIONS
  const makeNewlocalStorageObject = () => {

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

  const returnDataObjectIfExistsOrCreateDataObjectIfNot = () => {
    if(window.localStorage.getItem('usersFlashcards') === null) {
      window.localStorage.setItem('usersFlashcards', makeNewlocalStorageObject());
    } else {
      return JSON.parse(window.localStorage.getItem('usersFlashcards'));
    }

    return JSON.parse(window.localStorage.getItem('usersFlashcards'));
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

  const shiftCorrectAnswer = (array) => {
    if(flip === 'flip') {
      setIsVisiable('invisiable');
      setFlip('');
    }
    var arrayCopy = array.slice();
    arrayCopy.shift();
    return arrayCopy;
  }

  const pushAndShiftWrongAnswer = (array) => {
    if(flip === 'flip') {
      setIsVisiable('invisiable');
      setFlip('');
    }
    var arrayCopy = array.slice();
    arrayCopy.push(arrayCopy.shift());
    return arrayCopy;
  }

  const resetRandomCardsState = () => {
    if(typeof randomizedCards[0] === 'undefined') {
      setRandomizedCards(shuffleArray(allCards));
    }
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
    setRandomizedCards(shuffleArray(allCardsCopy));

    window.localStorage.setItem('usersFlashcards', JSON.stringify(allCardsCopy));
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

  const handleSetFlip = () => {
    if(flip === '') {
      setIsVisiable('');
      setFlip('flip');
    } else {
      setIsVisiable('invisiable');
      setFlip('');
    }
  }

  //STATES
  const [allCards, setAllCards] = useState(returnDataObjectIfExistsOrCreateDataObjectIfNot())

  const [randomizedCards, setRandomizedCards] = useState(shuffleArray(allCards))

  const [japaneseInput, setJapaneseInput] = useState('');
  const [engInput, setEngInput] = useState('');

  const [flip, setFlip] = useState('');
  const [isVisiable, setIsVisiable] = useState('');

  //catching if the cards array is empty and reseting it
  resetRandomCardsState();

  return (
    <div className="App">
      <div>
        <Flashcard 
          cards={randomizedCards} 
          onDelete={() => deleteFlashcard()} 
          flip={flip}
          visiable={isVisiable}
          onClick={() => handleSetFlip()} 
        />
        <div className="right-wrong-buttons">
          <button
            className='correct'
            onClick={() => setRandomizedCards(shiftCorrectAnswer(randomizedCards))}
          >
            I got it right
          </button>
          <button
            className='incorrect'
            onClick={() => setRandomizedCards(pushAndShiftWrongAnswer(randomizedCards))}
          >
            I got it wrong
          </button>
        </div>
      </div>
      <Newcard 
        engInput={engInput} 
        japaneseInput={japaneseInput} 
        engChange={event => setEngInput(event.target.value)}
        japChange={event => setJapaneseInput(event.target.value)}
        onClick={() => pushNewFlashcardToCardsArrayAndUpdateLocalStorage()}
      />
    </div>
  );
}

export default App;
