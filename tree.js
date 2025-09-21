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
    }
    return null;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function is required");
    }
    if (this.root === null) return;

    let queue = [this.root];

    while (queue.length > 0) {
      let current = queue[0];
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      callback(current);
      queue.shift();
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function is required");
    }
    inOrderRecursive(callback, this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function is required");
    }
    preOrderRecursive(callback, this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function is required");
    }
    postOrderRecursive(callback, this.root);
  }

  height(value) {
    // returns the height of the node with the given value;
    let root = this.find(value);
    return heightRecursive(root);
  }

  depth(value) {
    let target = this.find(value);
    if (!target) return null;

    return depthRecursive(this.root, target);
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
  // Traverse to find a matching node
  if (value < root.data) {
    root.left = delNode(root.left, value);
  } else if (value > root.data) {
    root.right = delNode(root.right, value);
  } else {
    // if root matches given value

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

function inOrderRecursive(callback, root) {
  if (!root) return;
  inOrderRecursive(callback, root.left);
  callback(root);
  inOrderRecursive(callback, root.right);
}

function preOrderRecursive(callback, root) {
  if (!root) return;
  callback(root);
  preOrderRecursive(callback, root.left);
  preOrderRecursive(callback, root.right);
}

function postOrderRecursive(callback, root) {
  if (!root) return;
  postOrderRecursive(callback, root.left);
  postOrderRecursive(callback, root.right);
  callback(root);
}

function heightRecursive(root) {
  if (!root) return -1;
  let lHeight = heightRecursive(root.left);
  let rHeight = heightRecursive(root.right);
  return Math.max(lHeight, rHeight) + 1;
}

function depthRecursive(root, target) {
  if (!root) return -1;

  let dist = -1;

  if (
    root === target ||
    (dist = depthRecursive(root.left, target)) >= 0 ||
    (dist = depthRecursive(root.right, target)) >= 0
  ) {
    return dist + 1;
  }
  return dist;
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
