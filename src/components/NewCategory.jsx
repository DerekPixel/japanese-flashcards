import React, { useState } from 'react';
import { duplicateObjectsInArrayOrObject } from '../functions.jsx';


function NewCategory({allCards, setAllCards}) {

  const [categoryTitle, setCategoryTitle] = useState('');

  function addNewCategoryToAllCards() {
    var allCardsClone = duplicateObjectsInArrayOrObject(allCards);

    var categoryObject = createCategoryObject()

    allCardsClone[categoryTitle] = categoryObject;

    setAllCards(allCardsClone);
  }

  function createCategoryObject() {
    var newObj = {};
    newObj.cards = [];
    newObj.selected = false;
    newObj.title = categoryTitle;
    return newObj;
  }

  function handleChange(e) {
    setCategoryTitle(e.target.value);
  }

  function handleClick() {
    addNewCategoryToAllCards();
  }

  return <div className='new-category' >

    <h2>Add a New Category</h2>

    <label htmlFor="category Title">Category Title</label>
    <input className='new-category-input' type="text" name='category Title' onChange={handleChange} value={categoryTitle} />

    <button id="submit" onClick={handleClick}>Make New Category</button>
  </div>;
}

export default NewCategory;
