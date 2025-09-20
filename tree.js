import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value) {
    insertRecursive(this.root, value);
  }

  delete(value) {
    delNode(this.root, value);
  }

  find(value) {
    // returns the node that matches the given value
    let current = this.root;
    while (current) {
      if (value === current.data) return current;
      if (value < current.data) {
        current = current.left;
      }
      if (value > current.data) {
        current = current.right;
      }
      return null;
    }
  }
}

function buildTree(array) {
  array.sort((a, b) => a - b); // Sort based on integer value not strings, Javascript!
  array = [...new Set(array)]; // get rid of duplicated data
  return arrayToBST(array, 0, array.length - 1);
}

function insertRecursive(root, value) {
  if (root === null) {
    return new Node(value);
  }

  if (value === root.data) {
    return root;
  } else if (value < root.data) {
    root.left = insertRecursive(root.left, value);
  } else if (value > root.data) {
    root.right = insertRecursive(root.right, value);
  }
  return root;
}

function delNode(root, value) {
  //Base case
  if (root === null) {
    return root;
  }

  if (value < root.data) {
    root.left = delNode(root.left, value);
  } else if (value > root.data) {
    root.right = delNode(root.right, value);
  } else {
    // if root matches the given value

    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    let successor = getSuccessor(root);
    root.data = successor.data;
    root.right = delNode(root.right, successor.data);
  }
  return root;
}

function arrayToBST(array, start, end) {
  if (start > end) return null;

  // find the middle element
  let mid = start + Math.floor((end - start) / 2);

  // create root node
  let root = new Node(array[mid]);

  // create left subtree
  root.left = arrayToBST(array, start, mid - 1);

  // create right subtree
  root.right = arrayToBST(array, mid + 1, end);

  return root;
}
// UTILITIES

function getSuccessor(current) {
  current = current.right;
  while (current !== null && current.left !== null) {
    current = current.left;
  }
  return current;
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
