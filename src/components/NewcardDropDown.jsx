import React, { useRef, useState, useEffect } from 'react'

import '../css/categoryDropDown.css';

var settingsObject = {
  isSearchable: true,
  canDeleteItems: false,
}

const NewcardDropDown = ({
  title = String, 
  originalDropDownObject, 
  setOriginalDropDownObject, 
  setCategoryInput, 
  settings = settingsObject}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(title);
  const [mappedDropDown, setMappedDropDown] = useState(mapDropDown(originalDropDownObject));
  const [searchInput, setSearchInput] = useState('');

  const dropDownRef = useRef(null);
  const dropDownInputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  })

  useEffect(() => {
    if(searchInput !== '') {
      mapSearchResults(searchInput, originalDropDownObject);
    } else {
      setMappedDropDown(mapDropDown(originalDropDownObject));
    }

    // eslint-disable-next-line
  }, [originalDropDownObject])

  function mapDropDown(dropDownObject) {
    if(returnTrueIfInputIsAnArray(dropDownObject)) {
      return dropDownObject.map((obj) => {
        return returnDropDownItemContainer(obj.title, obj.index);
      })
    } else {
      return Object.keys(dropDownObject).map((keyname) => {
        return returnDropDownItemContainer(keyname, keyname)
      })
    }
  }

  function returnDropDownItemContainer(title, indexOrKeyname) {
    return (
      <div
        className='dropdown-item-container'
        key={title}
      >
        <div
          className={originalDropDownObject[indexOrKeyname].selected ? 'dropdown-item selected' : 'dropdown-item'}
          onClick={(e) => {handleItemClick(e, indexOrKeyname)}}
        >
          {title}
        </div>
        {
          settings.canDeleteItems &&
          <button
            className='dropdown-item-delete-btn'
            onClick={() => {handleDeleteItem(indexOrKeyname)}}
          >X</button>
        }
      </div>
    )
  }

  function handleItemClick(e, indexOrKeyname) {
    var newDropDownObject = duplicateObjectsInArrayOrObject(originalDropDownObject);

    if(returnTrueIfInputIsAnArray(newDropDownObject)) {
      for(var i = 0; i < newDropDownObject.length; i++) {
        newDropDownObject[i].selected = false;
      }
    } else {
      var keysArray = Object.keys(newDropDownObject);
      for(var j = 0; j < keysArray.length; j++) {
        newDropDownObject[keysArray[j]].selected = false;
      }
    }

    newDropDownObject[indexOrKeyname].selected = true;

    setOriginalDropDownObject(newDropDownObject);
    setCategoryInput(indexOrKeyname);

    setIsOpen(false);
    setHeaderTitle(e.target.textContent);
  }

  function handleDeleteItem(indexOrKeyname) {
    var newDropDownObject = duplicateObjectsInArrayOrObject(originalDropDownObject);

    if(returnTrueIfInputIsAnArray(newDropDownObject)) {

      newDropDownObject.splice(indexOrKeyname, 1);

      for(var i = 0; i < newDropDownObject.length; i++) {
        newDropDownObject[i].index = i;
      }
    } else {
      delete newDropDownObject[indexOrKeyname];
    }

    setOriginalDropDownObject(newDropDownObject);

    setHeaderTitle(title);
  }

  function handleDropdownHeaderClick() {
    if(isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleDocumentClick(e) {
    if(dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  function handleSearch(e) {

    mapSearchResults(e.target.value, originalDropDownObject);

    setSearchInput(e.target.value);
  }

  function mapSearchResults(stringToSearch, dropDownObject) {
    if(returnTrueIfInputIsAnArray(dropDownObject)) {

      if(stringToSearch !== '') {
        let results = dropDownObject.filter(obj => {
          return obj.title.includes(stringToSearch)
        });

        for(let i = 0; i < results.length; i++) {
          results[i].index = i;
        }

        setMappedDropDown(mapDropDown(results));
      } else {

        var temp = [...dropDownObject];

        for(let i = 0; i < temp.length; i++) {
          temp[i].index = i;
        }

        setMappedDropDown(mapDropDown(temp));
      }

    } else {
      if(stringToSearch !== '') {
        var objectClone = duplicateObjectsInArrayOrObject(dropDownObject);
        var objectKeys = Object.keys(objectClone);
        let results = {};

        for(let i = 0; i < objectKeys.length; i++) {

          var currentObject = objectClone[objectKeys[i]];

          if(currentObject.title.includes(stringToSearch)) {
            results[currentObject.title] = currentObject;
          }
        }

        for(let j = 0; j < Object.keys(results).length; j++) {
          results[Object.keys(results)[j]].index = j;
        }

        setMappedDropDown(mapDropDown(results));
      } else {
        setMappedDropDown(mapDropDown(dropDownObject));
      }
    }
  }

  function returnDropDownHeaderDivOrSearchInput() {

    return <div
      className='dropdown-header'
      onClick={handleDropdownHeaderClick}
      ref={dropDownRef}
    >
      {
        returnSearchInputOrTitle()
      }

      <div
        className={isOpen ? 'dropdown-indicator opened' : 'dropdown-indicator'}
      >
        <span className="iconify" data-icon="bi:caret-left-fill"></span>
      </div>
    </div>
  }

  function returnSearchInputOrTitle() {
    if(isOpen && settingsObject.isSearchable) {
      return (
        <input
          ref={dropDownInputRef}
          autoFocus
          className='search-input'
          type="search"
          value={searchInput}
          onChange={(e) => handleSearch(e)} 
        />          
      )
    }
    
    return <div className="dropdown-title">{headerTitle}</div> 
  }

  function duplicateObjectsInArrayOrObject(thingThatNeedsToBeDupped) {
    var thingCopy, thingClone, objClone;
  
    if(returnTrueIfInputIsAnArray(thingThatNeedsToBeDupped)) {
      thingCopy = thingThatNeedsToBeDupped.slice();
      thingClone = [];
      for(var i = 0; i < thingCopy.length; i++) {
        objClone = {...thingCopy[i]}
    
        thingClone.push(objClone);
      }
    } else {
      thingCopy = {...thingThatNeedsToBeDupped};
      thingClone = {};
      for(var j = 0; j < Object.keys(thingCopy).length; j++) {
        objClone = {...thingCopy[Object.keys(thingCopy)[j]]}
    
        thingClone[Object.keys(thingCopy)[j]] = objClone;
      }
    }
  
    return thingClone;
  }

  function returnTrueIfInputIsAnArray(objectToCheck) {
    return Array.isArray(objectToCheck);
  }

  return (
    <div className='dropdown' ref={dropDownRef} >

      {
        returnDropDownHeaderDivOrSearchInput()
      }

      {
        isOpen &&
        <div 
          className='dropdown-list'
        >
          {
            mappedDropDown.length === 0 ?
            <div
              className='no-options'
            >Nothing Here</div> :
            mappedDropDown
          }
        </div>
      }
    </div>
  )
}

export default NewcardDropDown
