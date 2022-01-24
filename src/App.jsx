import React, { useState, useEffect} from 'react';

import './App.css';
import DropDown from './components/CategoryDropDown';
import Flashcard from './components/Flashcard';
import Newcard from './components/Newcard';
import NewCategory from './components/NewCategory';

import {duplicateObjectsInArrayOrObject, shuffleArray} from './functions.jsx';

function App() {

  //STATES
  const [allCards, setAllCards] = useState(returnDataObjectIfExistsOrCreateDataObjectIfNot())
  const [selectedCategory, setSelectedCategory] = useState(allCards[Object.keys(allCards)[0]]);

  const [randomizedCards, setRandomizedCards] = useState(shuffleArray(selectedCategory.cards));

  const [flip, setFlip] = useState('');
  const [isVisiable, setIsVisiable] = useState(true);
  const [answerIsRevealed, setAnswerIsRevealed] = useState(false);

  useEffect(() => {
    setRandomizedCards(shuffleArray(selectedCategory.cards))
  }, [selectedCategory]);

  useEffect(() => {
    window.localStorage.setItem('usersFlashcards', JSON.stringify(allCards));
  }, [allCards]);
  

  //FUNCTIONS

  function makeNewlocalStorageObject() {

    var Flashcards = {
      'Common Phrases': {
        cards: [        
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
        ],
        selected: true,
        title: 'Common Phrases',
      },
      'The Home': {
        cards: [        
          {
            japanese: 'いえ',
            eng: 'House'
          },
          {
            japanese: 'へや',
            eng: 'Room'
          },
          {
            japanese: 'だいどころ',
            eng: 'Kitchen'
          },
          {
            japanese: 'しょうじ',
            eng: 'Sliding paper door'
          },
        ],
        selected: false,
        title: 'The Home',
      },

    }

    return JSON.stringify(Flashcards);
  };

  function returnDataObjectIfExistsOrCreateDataObjectIfNot() {
    if(window.localStorage.getItem('usersFlashcards') === null) {
      window.localStorage.setItem('usersFlashcards', makeNewlocalStorageObject());
    } else {
      return JSON.parse(window.localStorage.getItem('usersFlashcards'));
    }

    return JSON.parse(window.localStorage.getItem('usersFlashcards'));
  };

  function resetCardFlipAndVisibility() {
    if(flip === 'flip') {
      setIsVisiable(false);
      setFlip('');
    }
    setAnswerIsRevealed(false);
  }

  function shiftCorrectAnswer(array) {
    if(flip === 'flip') {
      setIsVisiable(false);
      setFlip('');
    }

    setAnswerIsRevealed(false);

    var arrayCopy = array.slice();
    arrayCopy.shift();
    return arrayCopy;
  }

  function pushAndShiftWrongAnswer(array) {
    if(flip === 'flip') {
      setIsVisiable(false);
      setFlip('');
    }

    setAnswerIsRevealed(false);

    var arrayCopy = array.slice();
    arrayCopy.push(arrayCopy.shift());
    return arrayCopy;
  }

  function resetRandomCardsState() {
    if(typeof randomizedCards[0] === 'undefined') {
      setRandomizedCards(shuffleArray(selectedCategory.cards));
    }
  }

  function deleteFlashcard() {

    var allCardsCopy = duplicateObjectsInArrayOrObject(allCards);

    var randomizedCardsCopy = randomizedCards.slice();
    var removedObject = randomizedCardsCopy.shift();

    var len = allCardsCopy[selectedCategory.title].cards.length;

    for(var i = 0; i < len; i++) {
      if(allCardsCopy[selectedCategory.title].cards[i].eng === removedObject.eng && len >= 1) {
        allCardsCopy[selectedCategory.title].cards.splice(i, 1);
        len = allCardsCopy[selectedCategory.title].cards.length;
      }
    }

    setAllCards(allCardsCopy);
    setRandomizedCards(randomizedCardsCopy);

    window.localStorage.setItem('usersFlashcards', JSON.stringify(allCardsCopy));

  }

  function handleSetFlip() {
    if(flip === '') {
      setIsVisiable(true);
      setAnswerIsRevealed(true);
      setFlip('flip');
    } 
    else {
      setFlip('');
    }
  }

  //catching if the cards array is empty and reseting it
  resetRandomCardsState();

  return (
    <div className="App">

      <header>
        <DropDown 
          originalDropDownObject={allCards}
          setOriginalDropDownObject={(cards) => setAllCards(cards)}
          setSelectedCategory={(obj) => setSelectedCategory(obj)}
          title='Select Category'
        />
      </header>

      <div>
        <Flashcard 
          cards={randomizedCards} 
          onDelete={() => deleteFlashcard()} 
          flip={flip}
          visiable={isVisiable}
          onClick={() => handleSetFlip()} 
        />

        <div className="right-wrong-btns-and-reveal-answer-text-container">
          {
            answerIsRevealed ?
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
            </div> :
            <div
              className='reveal-the-answer-text'
              onClick={() => handleSetFlip()}
            >Reveal the Answer</div>
          }
          
        </div>
      </div>
      <Newcard 
        setAllCards={(cards) => setAllCards(cards)}
        setRandomizedCards={(array) => setRandomizedCards(array)}
        allCards={allCards}
        resetCard={() => resetCardFlipAndVisibility()}
        selectedCategory={selectedCategory.title}
      />

      <NewCategory
        allCards={allCards}
        setAllCards={setAllCards}
      />
    </div>
  );
}

export default App;
