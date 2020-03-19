class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}


class BST {
    constructor() {
        this.root = null;
    }

    insert(val, currentNode = this.root) {
        const newNode = new TreeNode(val);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        if (currentNode.val > val) {
            if (!currentNode.left) {
                currentNode.left = newNode
            } else {
                this.insert(val, currentNode.left);
            }
        } else if (currentNode.val <= val) {
            if (!currentNode.right) {
                currentNode.right = newNode
            } else {
                this.insert(val, currentNode.right);
            }
        }
    }

    searchRecur(val, currentNode = this.root) {
        if (!this.root) return false;
        if (currentNode.val > val) {
            if (!currentNode.left) {
                return false;
            } else {
                return this.searchRecur(val, currentNode.left);
            }
        } else if (currentNode.val < val) {
            if (!currentNode.right) {
                return false;
            } else {
                return this.searchRecur(val, currentNode.right);
            }
        } else {
            return true;
        }
    }

    searchIter(val) {
        let currentNode = this.root;
        if (!this.root) return false;
        while (currentNode) {
            if (currentNode.val > val) {
                currentNode = currentNode.left;
            } else if (currentNode.val < val) {
                currentNode = currentNode.right;
            } else if (currentNode.val === val) {
                return true;
            }
        }
        return false;
    }
}

module.exports = {
    TreeNode,
    BST
};
