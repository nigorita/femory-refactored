
export function shuffle(arr) {
    let j;
    let temp;
    const copyArr = [...arr];
    for (let i = copyArr.length - 1; i >= 0; i--) {
      j = Math.floor(Math.random() * (arr.length));
      temp = copyArr[i];
      copyArr[i] = copyArr[j];
      copyArr[j] = temp;
    }
    return copyArr;
  }
  