// you may assume that the array will always have a null element at the 0-th index
function isMaxHeap(array, idx=1) {
  for (idx; idx < array.length; idx++) {
    if (array[idx] < array[idx * 2] || array[idx] < array[idx * 2 + 1]) return false;
  }
  return true;
}


module.exports = {
  isMaxHeap
};
