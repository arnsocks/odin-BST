import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

function buildTree(array) {
  array.sort((a, b) => a - b); // Sort based on integer value not strings, Javascript!
  array = [...new Set(array)]; // get rid of duplicated data
  return arrayToBST(array, 0, array.length - 1);
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
