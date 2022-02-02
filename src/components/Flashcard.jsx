
const Flashcard = ({cards, onDelete, flip, visiable,  onClick}) => {

  var jap, eng;

  jap = cards[0].japanese;
  eng = cards[0]. eng;
  
  return (
    <div className='card'>
      <button className='delete' onClick={onDelete} >Delete</button>
      <div onClick={onClick} className="flip-card" >
        <div className="flip-card-inner" id={flip}>
          <div className="flip-card-front">
            <p>{jap}</p>
          </div>
          <div className="flip-card-back">
            {
              visiable && <h2>{eng}</h2>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
