function inOrderArray(root) {
  if (!root) return [];
  return [...inOrderArray(root.left), root.val, ...inOrderArray(root.right)];
}

function postOrderArray(root) {
  if (!root) return [];
  return [...postOrderArray(root.left), ...postOrderArray(root.right), root.val];
}

function preOrderArray(root) {
  if (!root) return [];
  return [root.val, ...postOrderArray(root.left), ...postOrderArray(root.right)];
}


module.exports = {
  inOrderArray,
  postOrderArray,
  preOrderArray
};
