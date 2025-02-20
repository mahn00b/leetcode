
# Lowest Common Ancestor of a Binary Tree
[Leetcode Link](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

## Restating Problem
---------------------------------------------------------

Given a binary tree whose nodes are made up of unique integer values, and two nodes `p` and `q`, find their [ lowest common ancestor](https://en.wikipedia.org/wiki/Lowest_common_ancestor) (`LCA`) on the binary tree.

These nodes are guaranteed to be in the tree. All nodes are guaranteed to have unique values in the tee.

## Solution
------------

#### Intuition

So at first the solution seems a little daunting for a leetcode medium. There are a few tricky problems here. But this can be simplified by intuiting a few observations from the nature of the data. Keep in mind:

Since we're working with a binary tree, we will search top to bottom. This means at every new root node we traverse could be the right solution could if:
-  The solution includes the current root node and one if it's subtrees
- `p` and `q` are each in different subtrees. One on the left and one on the right

We can come up with a recursive solution to traverse the tree and look for the root node that matches the properties stated above. Some additional observations that will be helpful:

- If the solution is just in one subtree, then the `LCA` is a descendent of the current root node and will follow the properties stated above.
- If any `root node` is equivalent to `p` or `q` then we can assume that this is a candidate for the `LCA`. Even if this is the root of the given tree, since the values are unique, we can guarantee there is no better candidate in it's subtrees


#### Approach

1. Create a recursive function to traverse the tree at any node `r`
2. Check if the current parameter `r` is a valid node, if not, then return null
3. Check the value of the current `r`. If it is equal to `p` or `q` then we have found a candidate for the `LCA`. We return `r` to indicate we have found one of our values.

   There is no further need to check it's children because even if the other value is in one of it's subtrees, it will still be the `LCA`.
4. If the current `r` is not part of the solution, we'll recursively traverse the left and right children and follow the same steps above.
5. Next, we analyze the return values of our sub-traversals. If we find that:
		   1. If both the right & left traversals return valid `p` & `q` values, then we can assume that the `LCA` is the current `root`
		   2. If only one of the traversals return a value, then we can safely assume both `p` & `q` were found in one of the subtrees. We can return that sole value.
		   3. If none of the above is true, we return `null` to indicate that we haven't found any of our targets.
6. The recursive traversal will end once it has traversed all the nodes once or found the target `p` & `q` values
#### Code

```js

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

```

#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

Runtime: 61ms

Memory: 64.85MB