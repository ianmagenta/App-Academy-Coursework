class MaxHeap {
  constructor() {
    this.array = [null];
  }

  getParent(idx) {
    if (idx % 2 === 0) {
      return idx / 2;
    } else {
      return Math.floor(idx / 2);
    }
  }

  getLeftChild(idx) {
    return idx * 2;
  }

  getRightChild(idx) {
    return idx * 2 + 1;
  }

  siftUp(idx) {
    if (idx === 1) return;
    let compareVal = this.getParent(idx);
    if (this.array[compareVal] < this.array[idx]) {
      [this.array[idx], this.array[compareVal]] = [this.array[compareVal], this.array[idx]];
      this.siftUp(compareVal);
    }
  }

  insert(val) {
    this.array.push(val);
    let idx = this.array.length - 1
    if (this.array[idx] > this.array[this.getParent(idx)]) {
      this.siftUp(idx);
    }
  }

  siftDown(idx) {
    if (this.array.length === 1) return null;
    if (this.array.length === 2 ) return this.array.pop();
    let val = this.array[idx];
    let leftIdx = this.getLeftChild(idx);
    let rightIdx = this.getRightChild(idx);
    let leftValue = this.array[leftIdx] ? this.array[leftIdx] : -Infinity;
    let rightValue = this.array[rightIdx] ? this.array[rightIdx] : -Infinity;

    if (val > leftValue && val > rightValue) return;

    let swapIdx;
    if (leftValue > rightValue) {
      swapIdx = leftIdx;
    } else {
      swapIdx = rightIdx;
    }

    [this.array[idx], this.array[swapIdx]] = [this.array[swapIdx], this.array[idx]];

    this.siftDown(swapIdx);
  }

  deleteMax() {
    if (this.array.length === 1) return null;
    if (this.array.length === 2) return this.array.pop();
    let max = this.array[1];
    this.array[1] = this.array.pop();
    this.siftDown(1);
    return max;
  }
}

module.exports = {
  MaxHeap
};
