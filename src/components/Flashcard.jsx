
function Flashcard({cards, onDelete, flip, visiable,  onClick, returnTrueIfSelectedCategoryIsEmpty}) {

  var jap, eng;

  if(returnTrueIfSelectedCategoryIsEmpty()) {
    jap = 'This Cateogry is Empty';
    eng = 'This Cateogry is Empty';
  } else {
    jap = cards[0].japanese;
    eng = cards[0]. eng;
  }

  return (
    <div className='card'>
      <button className='delete' onClick={onDelete} >Delete</button>
      <div onClick={onClick} className="flip-card" >
        <div className="flip-card-inner" id={flip}>
          <div className="flip-card-front">
            <p className="flip-card-text" >{jap}</p>
          </div>
          <div className="flip-card-back">
            {
              visiable && <p className="flip-card-text" >{eng}</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
