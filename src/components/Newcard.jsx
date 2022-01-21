import React, { useState, useEffect } from "react";
import { duplicateObjectsInArrayOrObject, shuffleArray } from '../functions.jsx';
import NewcardDropDown from "./NewcardDropDown.jsx";

const Newcard = ({allCards, setAllCards, setRandomizedCards, resetCard, selectedCategory}) => {

  const [allCardsDupe, setAllCardsDupe] = useState(duplicateObjectsInArrayOrObject(allCards));

  const [japaneseInput, setJapaneseInput] = useState('');
  const [engInput, setEngInput] = useState('');
  const [categoryInput, setCategoryInput] = useState(selectedCategory);

  useEffect(() => {
    setAllCardsDupe(duplicateObjectsInArrayOrObject(allCards));
  }, [allCards]);
  

  function pushNewFlashcardToCardsArrayAndUpdateLocalStorage() {
    var newFlashcard = {};

    newFlashcard.japanese = japaneseInput;
    newFlashcard.eng = engInput;

    setJapaneseInput('');
    setEngInput('');

    var allCardsCopy = duplicateObjectsInArrayOrObject(allCards);
    allCardsCopy[categoryInput].cards.push(newFlashcard);

    resetCard();

    setAllCards(allCardsCopy);
    setRandomizedCards(shuffleArray(allCardsCopy[categoryInput].cards));

    window.localStorage.setItem('usersFlashcards', JSON.stringify(allCardsCopy));
  }

  return (

    <div className='form'>
      <label htmlFor='japanese' >Japanese</label>
      <textarea name="japanese" id="jap" value={japaneseInput} onChange={(e) => setJapaneseInput(e.target.value)} ></textarea>
      <label htmlFor="english">English</label>
      <textarea name="english" id="eng" value={engInput} onChange={(e) => setEngInput(e.target.value)} ></textarea>
      <label htmlFor="category">Choose a Category</label>

      <NewcardDropDown
        originalDropDownObject={allCardsDupe}
        setOriginalDropDownObject={setAllCardsDupe}
        setCategoryInput={setCategoryInput}
        title={'Select Category'}
      />
      
      <button onClick={() => pushNewFlashcardToCardsArrayAndUpdateLocalStorage()} >Make New Card</button>
    </div>

  )
}

export default Newcard
