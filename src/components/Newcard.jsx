import React, { useState } from "react";
import { duplicateObjectsInArrayOrObject, shuffleArray } from '../functions.jsx';

const Newcard = ({allcards, setAllCards, setRandomizedCards, resetCard}) => {

  const [japaneseInput, setJapaneseInput] = useState('');
  const [engInput, setEngInput] = useState('');
  const [categoryInput, setCategpryInput] = useState('');

  var options = Object.keys(allcards).map((keyname, i, list) => {
    return (
      <option 
        key={keyname}
        value={keyname}
      >{keyname}</option>
    )
  })

  function pushNewFlashcardToCardsArrayAndUpdateLocalStorage() {
    var newFlashcard = {};

    newFlashcard.japanese = japaneseInput;
    newFlashcard.eng = engInput;

    setJapaneseInput('');
    setEngInput('');

    var allCardsCopy = duplicateObjectsInArrayOrObject(allcards);
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
      <select 
        name="category" 
        defaultValue={allcards[Object.keys(allcards)[0]]}
        onChange={(e) => setCategpryInput(e.target.value)}
      >
        {options}
      </select>
      <button onClick={() => pushNewFlashcardToCardsArrayAndUpdateLocalStorage()} >Make New Card</button>
    </div>

  )
}

export default Newcard
