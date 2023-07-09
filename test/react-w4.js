function findDiff(arr1, arr2) {
  let updated = 0, added = 0;
  for (let i = 0; i<arr2.length; i++) {
    let item = arr2[i];
    let found = false;
    for(let j = 0; j<arr1.length; j++) {
      if (arr1[j] === arr2[i]) {
        found = true;
      }
    }
    if (found) {
      updated = updated + 1;
    } else {
      added = added +1;
    }
  }
  
  return {
    updated: updated,
    added: added,
  }
}

let diff = findDiff([1, 2, 3], [1, 2, 3, 4, 5]);
console.log(diff);