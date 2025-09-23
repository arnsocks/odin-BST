import Tree from "./tree.js";

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let myTree = new Tree(data);
console.log(`Tree is balanced? ${myTree.isBalanced()}`);
// prettyPrint(myTree.root);
myTree.insert(18);
myTree.insert(23);
myTree.insert(900);
// prettyPrint(myTree.root);
// myTree.delete(8);
// prettyPrint(myTree.root);
// console.log(myTree.find(9));
// console.log(myTree.find(8));
prettyPrint(myTree.root);
myTree.levelOrderForEach(printData);
myTree.inOrderForEach(printData);
myTree.preOrderForEach(printData);
myTree.postOrderForEach(printData);
console.log(`Height of root: ${myTree.height(myTree.root.data)}`);
console.log(`Height of 4: ${myTree.height(4)}`);
console.log(`Depth of root: ${myTree.depth(myTree.root.data)}`);
console.log(`Depth of 324: ${myTree.depth(324)}`);
console.log(`Tree is balanced? ${myTree.isBalanced()}`);

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

function times2(node) {
  node.data *= 2;
}
