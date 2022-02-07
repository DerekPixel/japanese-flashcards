import React, { useState, useEffect} from 'react';

import './App.css';
import CategoryDropDown from './components/CategoryDropDown.jsx';
import Flashcard from './components/Flashcard.jsx';
import Newcard from './components/Newcard.jsx';
import NewCategory from './components/NewCategory.jsx';
import RightAndWrongButtons from './components/RightAndWrongButtons.jsx';

import {duplicateObjectsInArrayOrObject, shuffleArray} from './functions.jsx';

function App() {

  //STATES
  
  const [allCards, setAllCards] = useState(returnDataObjectIfExistsOrCreateDataObjectIfNot())
  const [selectedCategory, setSelectedCategory] = useState(allCards[Object.keys(allCards)[0]]);

  const [randomizedCards, setRandomizedCards] = useState(shuffleArray(selectedCategory.cards));

  const [flip, setFlip] = useState('');
  const [isVisiable, setIsVisiable] = useState(true);
  const [answerIsRevealed, setAnswerIsRevealed] = useState(false);

  //EFFECTS

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
    resetCardFlipAndVisibility();

    var arrayCopy = array.slice();
    arrayCopy.shift();
    return arrayCopy;
  }

  function pushAndShiftWrongAnswer(array) {
    resetCardFlipAndVisibility();

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

    var category = allCardsCopy[selectedCategory.title];

    for(var i = 0; i < category.cards.length; i++) {
      if(category.cards[i].eng === removedObject.eng && category.cards.length >= 1) {
        category.cards.splice(i, 1);
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
      <main>
        <div className='flashcard-and-category-select'>

          <div className="flashcard-and-category-select-inner-container">

            <h1>Flashcard</h1>

            <CategoryDropDown
              originalDropDownObject={allCards}
              setOriginalDropDownObject={(cards) => setAllCards(cards)}
              setSelectedCategory={(obj) => setSelectedCategory(obj)}
              title='Select Category'
            />
          

            <Flashcard
              cards={randomizedCards}
              onDelete={() => deleteFlashcard()}
              flip={flip}
              visiable={isVisiable}
              onClick={() => handleSetFlip()}
            />

            <RightAndWrongButtons
              answerIsRevealed={answerIsRevealed}
              randomizedCards={randomizedCards}
              setRandomizedCards={setRandomizedCards}
              shiftCorrectAnswer={shiftCorrectAnswer}
              pushAndShiftWrongAnswer={pushAndShiftWrongAnswer}
              handleSetFlip={handleSetFlip}
            />
          </div>

        </div>

        <div className="new-category-and-new-cards">

          <NewCategory
            allCards={allCards}
            setAllCards={setAllCards}
          />

          <Newcard
            setAllCards={(cards) => setAllCards(cards)}
            setRandomizedCards={(array) => setRandomizedCards(array)}
            allCards={allCards}
            resetCard={() => resetCardFlipAndVisibility()}
            selectedCategory={selectedCategory.title}
          />

        </div>
      </main>
    </div>
  );
}

export default App;
