
export function duplicateObjectsInArrayOrObject(thingThatNeedsToBeDupped) {
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

export function shuffleArray(array) {

  var arrayCopy = array.slice();

  var m = arrayCopy.length, t, i;

  while(m) {
    i = Math.floor(Math.random() * m--);

    t = arrayCopy[m];
    arrayCopy[m] = arrayCopy[i];
    arrayCopy[i] = t;
  }

  return arrayCopy
}

export function returnTrueIfInputIsAnArray(objectToCheck) {
  return Array.isArray(objectToCheck);
}

function pimp() {
  console.log('pimp');
  return 'pimp';
}

export default pimp;