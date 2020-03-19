// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------

// TODO: Implement a Linked List Node class here
class Node {
    constructor(val, ref = null) {
        this.value = val;
        this.next = ref;
    }

}

// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // TODO: Implement the addToTail method here
    addToTail(val) {
        const newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.length++;
        //console.log(this);
        return this;
    }

    // TODO: Implement the removeTail method here
    removeTail() {
        if (this.length === 0) return undefined;
        let current = this.head;
        let newTail = current;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    // HEAD                              TAIL
    // {A, {ref -> B}}, {B, {ref -> C}}, {C, {ref -> null}}

    // TODO: Implement the addToHead method here
    addToHead(val) {
        const newNode = new Node(val);
        const oldHead = this.head;
        this.head = newNode;
        if (this.length === 0) {
            this.tail = newNode;
        } else {
            this.head.next = oldHead;
        }

        this.length++;
        //console.log(this);
        return this;
    }

    // TODO: Implement the removeHead method here
    removeHead() {
        if (this.length === 0) return undefined;
        const removedHead = this.head;
        this.head = this.head.next;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return removedHead;
    }

    // TODO: Implement the contains method here
    contains(target) {
        let nodePointer = this.head;
        while(nodePointer) {
            if (nodePointer.value === target) {
                return true;
            }
            nodePointer = nodePointer.next;
        }
        return false;
    }

      // HEAD                              TAIL
    // {A, {ref -> B}}, {B, {ref -> C}}, {C, {ref -> null}}

    // TODO: Implement the get method here
    get(index) {
        if (index > this.length || index < 0) {
            return null;
        }
        let counter = 0;
        let headTracker = this.head;
        while (true) {
            if (index !== counter) {
                counter++
                headTracker = headTracker.next;
            } else {
                return headTracker;
            }
        }
    }

    // TODO: Implement the set method here
    set(index, val) {
        let existingNode = this.get(index);
        if (existingNode) {
            existingNode.value = val;
            return true;
        } else {
            return false;
        }
    }

    // TODO: Implement the insert method here
    insert(index, val) {
        const newNode = new Node(val);
        let inbounds = this.get(index);
        if (inbounds && index !== 0) {
            let prevNode = this.get(index - 1);
            prevNode.next = newNode;
            newNode.next = inbounds;
            this.length++;
            return true;
        } else if (index === 0) {
            this.head = newNode;
            this.head.next = inbounds;
            this.length++;
            return true;
        } else {
            return false;
        }
    }

    // TODO: Implement the remove method here
    remove(index) {
        let markedNode = this.get(index);

        if (index === this.length - 1){
            return this.removeTail();
        } else if (index === 0) {
            return this.removeHead();
        } else if (markedNode) {
            let prevNode = this.get(index - 1);
            let nextNode = this.get(index + 1);
            prevNode.next = nextNode;
            this.length--;
            return markedNode;
        } else {
            return undefined;
        }
    }

    // TODO: Implement the size method here
    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
