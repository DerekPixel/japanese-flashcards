export function makeNewlocalStorageObject(){

  var Data = [
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
  ]

  return JSON.stringify(Data);
};

export function returnDataObjectIfExistsOrCreateDataObjectIfNot() {
  if(window.localStorage.getItem('userData') === null) {
    window.localStorage.setItem('userData', makeNewlocalStorageObject());
  } else {
    return JSON.parse(window.localStorage.getItem('userData'));
  }

  return JSON.parse(window.localStorage.getItem('userData'));
};

export const shuffleArray = (array) => {

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