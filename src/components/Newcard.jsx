import React, { useState, useEffect } from "react";
import { duplicateObjectsInArrayOrObject, shuffleArray } from '../functions.jsx';
import NewcardDropDown from "./NewcardDropDown.jsx";

const Newcard = ({
  allCards, 
  setAllCards, 
  setRandomizedCards, 
  resetCard, 
  selectedCategory,
  returnTrueIfSelectedCategoryIsEmpty
}) => {

  const [allCardsDupe, setAllCardsDupe] = useState(duplicateObjectsInArrayOrObject(allCards));

  const [japaneseInput, setJapaneseInput] = useState('');
  const [engInput, setEngInput] = useState('');
  const [categoryInput, setCategoryInput] = useState(selectedCategory.title);

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

    if(returnTrueIfSelectedCategoryIsEmpty(categoryInput)) {
      allCardsCopy[categoryInput].empty = false;
    }

    resetCard();

    setAllCards(allCardsCopy);
    setRandomizedCards(shuffleArray(allCardsCopy[categoryInput].cards));

    window.localStorage.setItem('usersFlashcards', JSON.stringify(allCardsCopy));
  }

  return (

    <div className='new-card'>

      <h2>Add a New Card</h2>

      <label htmlFor='jap' >Japanese</label>
      <textarea 
        id="jap" 
        value={japaneseInput} 
        onChange={(e) => setJapaneseInput(e.target.value)} 
      ></textarea>

      <label htmlFor="eng">English</label>
      <textarea id="eng" value={engInput} onChange={(e) => setEngInput(e.target.value)} ></textarea>

      <label htmlFor="category">Choose a Category</label>
      <NewcardDropDown
        originalDropDownObject={allCardsDupe}
        setOriginalDropDownObject={setAllCardsDupe}
        setCategoryInput={setCategoryInput}
        title={'Select Category'}
      />
      
      <button id="submit" onClick={pushNewFlashcardToCardsArrayAndUpdateLocalStorage} >Make New Card</button>
    </div>

  )
}

export default Newcard
