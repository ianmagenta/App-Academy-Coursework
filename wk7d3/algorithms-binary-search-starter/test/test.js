const { expect } = require('chai');
const { binarySearch, binarySearchIndex } = require('../lib/binary_search.js');


describe('binarySearch', () => {
    // it should accept an sorted array of numbers and a target as an arg

    context('when the target is contained in the array', () => {
        it ('should return true', () => {
            expect(binarySearch([5, 10, 11, 12, 20, 30, 70], 12)).to.equal(true);
            expect(binarySearch([1, 2, 2, 3], 1)).to.equal(true);
        });
    });

    context('when the target is not contained in the array', () => {
        it('should return false', () => {
            expect(binarySearch([5, 10, 12, 15, 20, 30, 70], 24)).to.equal(false);
            expect(binarySearch([], 3)).to.equal(false);
        });
    });
});

describe('binarySearchIndex', () => {
    // it should accept an sorted array of unique numbers and a target as an arg

    context('when the target is contained in the array', () => {
        it('should return the index of where the target is found', () => {
            expect(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 12)).to.equal(2);
            console.log('passed1');
            expect(binarySearchIndex([1, 2, 3], 1)).to.equal(0);
            console.log('passed2');
            expect(binarySearchIndex([1, 2, 3], 2)).to.equal(1);
            console.log('passed3');
            // expect(binarySearchIndex([1, 2, 3], 3)).to.equal(2);

        });
    });

    context('when the target is not contained in the array', () => {
        it('should return -1', () => {
            expect(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 24)).to.equal(-1);
            expect(binarySearchIndex([], 3)).to.equal(-1);
        });
    });
});
