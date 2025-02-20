/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    const traverse = (r) => {
        if (!r) return null;
        if (r.val === p.val || r.val ===  q.val) return r

        const right = traverse(r.right)
        const left = traverse(r.left)

        if (right !== null && left !== null) return r
        if (right !== null) return right
        if (left !== null) return left

        return null;
    }

    return traverse(root)
};