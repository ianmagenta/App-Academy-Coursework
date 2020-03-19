function quickSort(array) {
  let n = array.length;

  if (n === 0 || n === 1) return array;

  let pivot = array.shift();

  let left = [];
  let right = [];
  for (let i = 0; i < n - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  // console.log(left, pivot, right);
  let leftSort = quickSort(left);
  let rightSort = quickSort(right);

  return [...leftSort, pivot, ...rightSort];

  // if the length of the array is 0 or 1, return the array

  // set the pivot to the first element of the array
  // remove the first element of the array

  // put all values less than the pivot value into an array called left
  // put all values greater than the pivot value into an array called right

  // call quick sort on left and assign the return value to leftSorted
  // call quick sort on right and assign the return value to rightSorted

  // return the concatenation of leftSorted, the pivot value, and rightSorted
}


module.exports = {
  quickSort
};
