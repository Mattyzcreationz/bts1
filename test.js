class Node {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  class BinarySearchTree {
    constructor(root = null) {
      this.root = root;
    }
  
    /** insert(val): insert a new node into the BST with value val.
     * Returns the tree. Uses iteration. */
    insert(val) {
      if (this.root === null) {
        this.root = new Node(val);
        return this;
      }
      let current = this.root;
      while (true) {
        if (val < current.val) {
          if (current.left === null) {
            current.left = new Node(val);
            return this;
          } else {
            current = current.left;
          }
        } else {
          if (current.right === null) {
            current.right = new Node(val);
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  
    /** insertRecursively(val): insert a new node into the BST with value val.
     * Returns the tree. Uses recursion. */
    insertRecursively(val, current = this.root) {
      if (this.root === null) {
        this.root = new Node(val);
        return this;
      }
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        }
        return this.insertRecursively(val, current.left);
      } else {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        }
        return this.insertRecursively(val, current.right);
      }
    }
  
    /** find(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses iteration. */
    find(val) {
      let currentNode = this.root;
      while (currentNode) {
        if (val === currentNode.val) return currentNode;
        if (val < currentNode.val) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
      return undefined;
    }
  
    /** findRecursively(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses recursion. */
    findRecursively(val, current = this.root) {
      if (current === null) return undefined;
      if (val === current.val) return current;
      if (val < current.val) {
        return this.findRecursively(val, current.left);
      } else {
        return this.findRecursively(val, current.right);
      }
    }
  
    /** dfsPreOrder(): Traverse the array using pre-order DFS.
     * Return an array of visited nodes. */
    dfsPreOrder() {
      let data = [];
      function traverse(node) {
        data.push(node.val);
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
      }
      traverse(this.root);
      return data;
    }
  
    /** dfsInOrder(): Traverse the array using in-order DFS.
     * Return an array of visited nodes. */
    dfsInOrder() {
      let data = [];
      function traverse(node) {
        if (node.left) traverse(node.left);
        data.push(node.val);
        if (node.right) traverse(node.right);
      }
      traverse(this.root);
      return data;
    }
  
    /** dfsPostOrder(): Traverse the array using post-order DFS.
     * Return an array of visited nodes. */
    dfsPostOrder() {
      let data = [];
      function traverse(node) {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
        data.push(node.val);
      }
      traverse(this.root);
      return data;
    }
  
    /** bfs(): Traverse the array using BFS.
     * Return an array of visited nodes. */
    bfs() {
      let node = this.root;
      let queue = [];
      let data = [];
      queue.push(node);
      while (queue.length) {
        node = queue.shift();
        data.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      return data;
    }
  
    /** Further Study!
     * remove(val): Removes a node in the BST with the value val.
     * Returns the removed node. */
    remove(val) {
      // This method can be quite complex and requires careful handling of different cases.
      // Here's a simple version. You might need to extend this to handle all cases properly.
      this.root = this._removeNode(this.root, val);
    }
  
    _removeNode(node, val) {
      if (node === null) return null;
  
      if (val < node.val) {
        node.left = this._removeNode(node.left, val);
        return node;
      } else if (val > node.val) {
        node.right = this._removeNode(node.right, val);
        return node;
      } else {
        // Node with only one child or no child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
  
        // Node with two children, get the inorder successor (smallest in the right subtree)
        node.val = this._minValue(node.right);
        node.right = this._removeNode(node.right, node.val);
        return node;
      }
    }
  
    _minValue(node) {
      let current = node;
      while (current.left !== null) {
        current = current.left;
      }
      return current.val;
    }
  
    /** Further Study!
     * isBalanced(): Returns true if the BST is balanced, false otherwise. */
    isBalanced() {
      const checkHeight = (node) => {
        if (node === null) return 0;
  
        let leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1;
  
        let rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1;
  
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        return Math.max(leftHeight, rightHeight) + 1;
      };
  
      return checkHeight(this.root) !== -1;
    }
  
    /** Further Study!
     * findSecondHighest(): Find the second highest value in the BST, if it exists.
     * Otherwise return undefined. */
    findSecondHighest() {
      if (!this.root || (!this.root.left && !this.root.right)) return undefined;
  
      let current = this.root;
      let parent = null;
  
      while (current.right) {
        parent = current;
        current = current.right;
      }
  
      if (current.left) {
        return this._findMax(current.left).val;
      }
  
      return parent ? parent.val : undefined;
    }
  
    _findMax(node) {
      while (node.right) {
        node = node.right;
      }
      return node;
    }
  
    /** dfsInOrderIterative(): Traverse the array using in-order DFS iteratively.
     * Return an array of visited nodes. */
    dfsInOrderIterative() {
      let current = this.root;
      let stack = [];
      let result = [];
  
      while (stack.length > 0 || current) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
      }
  
      return result;
    }
  }
  
  module.exports = BinarySearchTree;
  