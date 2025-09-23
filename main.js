import Tree from "./tree.js";

// ====================
// Testing driver code
// ====================

// 1) Create a BST from a random numbers < 100
const data = randomArray(20);
let myTree = new Tree(data);

// 2) Confirm that the tree is balanced
console.log(`Is balanced: ${myTree.isBalanced()}`);

// 3) Print out all elements in level, pre, post and in order
console.log("Level Order:");
myTree.levelOrderForEach(printData);
console.log("\nPreOrder:");
myTree.levelOrderForEach(printData);
console.log("\nPost order");
myTree.postOrderForEach(printData);
console.log("\nIn order");
myTree.inOrderForEach(printData);

// 4) Unbalance the array by adding several numbers > 100;
[101, 160, 115, 104, 219, 199084].forEach((num) => myTree.insert(num));

// 5) confirm that the tree is unbalanced
console.log(`Tree is balanced? ${myTree.isBalanced()}`);

// 6) rebalance the tree
myTree.rebalance();

// 7) Confirm that the tree is now balanced
console.log(`Tree is balanced? ${myTree.isBalanced()}`);

// 8) print out all elements in level, pre, post and in order
console.log("Level Order:");
myTree.levelOrderForEach(printData);
console.log("\nPreOrder:");
myTree.levelOrderForEach(printData);
console.log("\nPost order");
myTree.postOrderForEach(printData);
console.log("\nIn order");
myTree.inOrderForEach(printData);

// Utility functions
function randomArray(length) {
  let output = [];
  for (let i = 0; i < length; i++) {
    let n = Math.floor(Math.random() * 100);
    output.push(n);
  }
  return output;
}

function prettyPrint(node, prefix = "", isLeft = true) {
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
}

function printData(node) {
  console.log(node.data);
}
