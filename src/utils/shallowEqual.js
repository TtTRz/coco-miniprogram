
const shallowEqual = (objA, objB) => {
  if (objA.__webviewId__) {
    delete objA.__webviewId__
  }

  if (objA === objB) {
    return true;
  }

  let keysA = Object.keys(objA);
  let keysB = Object.keys(objB);

  if (keysA.length!== keysB.length) {
    return false;
  }

  for(let keyA of keysA) {
    if (!Object.prototype.hasOwnProperty(objB, keyA) || objA[keyA] !== objB[keyA]) {
      return false
    }
  }

  return true;
}

export default shallowEqual


