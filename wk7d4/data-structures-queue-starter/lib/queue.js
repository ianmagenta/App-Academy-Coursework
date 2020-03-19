// ============================================================================
// Implementation Exercise: Queue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Queue and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
//
// -----------
// Let's Code!
// -----------

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    enqueue(param) {
        const newNode = new Node(param);
        if (this.length === 0) {
            this.front = newNode;
            this.back = newNode;
        } else if (this.length > 0) {
            this.back.next = newNode;
            this.back = newNode;
        }
        this.length++;
        return this.length;
    }

    // Pointers that belong to the Queue class
    // HEAD                             BACK

    // list of nodse / this.head.ext --> ;                          this.tail.next
    // {A, {ref -> B}}, {B, {ref -> C}}, {C, {ref -> NewNode}} {NewNode, {ref -> null}}

    dequeue() {
        if (this.length === 0) return null;
        const frontValue = this.front;
        if (this.length === 1) {
            this.front = null;
            this.back = null;
        } else {
            this.front = this.front.next;
        }
        this.length--;
        return frontValue.value;
    }

    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.Queue = Queue;
