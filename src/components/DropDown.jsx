import React, { useRef, useState, useEffect } from 'react'
import { duplicateObjectsInArrayOrObject } from '../functions.jsx';

const DropDown = ({dropdownArray = Array, title = String, setDropdownArray, setSelectedCategory}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(title)

  const dropDownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, [])

  var dropDown = Object.keys(dropdownArray).map((keyname, i, list) => {
    return (
      <div
        className={dropdownArray[keyname].selected ? 'dropdown-item selected' : 'dropdown-item'}
        key={keyname}
        onClick={(e) => {handleItemClick(e, keyname, dropdownArray)}}
      >
        {keyname}
      </div>
    )
  })

  function handleDropdownHeaderClick() {
    if(isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleItemClick(e, keyname, item = Object) {

    var itemCopy = duplicateObjectsInArrayOrObject(item);

    for(var i = 0; i < Object.keys(itemCopy).length; i++) {
      if(itemCopy[Object.keys(itemCopy)[i]].selected === true) {
        itemCopy[Object.keys(itemCopy)[i]].selected = false;
      }
    }

    itemCopy[keyname].selected = true

    setDropdownArray(itemCopy);
    setSelectedCategory(itemCopy[keyname]);
    setIsOpen(false);
    setHeaderTitle(e.target.textContent);
  }

  function handleDocumentClick(e) {
    if(dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  return (
    <div className='dropdown' ref={dropDownRef} >

      <div 
        className='dropdown-header'
        onClick={() => {handleDropdownHeaderClick()}} 
      >
        {headerTitle}
      </div> 

      {
        isOpen &&
        <div 
          className='dropdown-list'
        >
          {
            dropDown.length === 0 ?
            <div
              className='no-palettes'
            >Nothing Here</div> :
            dropDown
          }
        </div>
      }
    </div>
  )
}

export default DropDown
