# Linked List Cycle (141)
[Leetcode Link](https://leetcode.com/problems/linked-list-cycle)

## Restating Problem
---------------------------------------------------------

Given a linked list `l`, determined whether there exists a cycle. A cycle exists when there is a node $l_i$ that leads to a previous node $l_{i-1}$.

## Solution
------------

#### Intuition

This straight forward problem can be solved a few different ways, but with this particular solution, I used the mutability of javascript objects to record visited nodes. If we find that the next node has a `pos` property, then we can safely assume we have visited this node & return `true` to indicate that we found a cycle.

#### Approach

1. Initialize a variable `curr` to iterate through the linked list.
2. Initialize a loop to run while we haven't reach the end of the list. We know we've reached the end when `curr === null`. _<small>If there exists a cycle, this logic will loop infinitely, but if we return in the loop, then we don't to worry about that.</small>
3. We mark the current node as `visited`, then assign it to the next.
4. Before the loop terminates, we check if our next node is not `null` and if it has been `visited` before. If so, we can return `true` to indicate that we found the cycle.
5. If the loop terminates, then the linked list is linear and there isn't a cycle. We can safely return `false`.

#### Code

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let curr = head;

    while (curr !== null) {
        curr.visited = true;
        curr = curr.next;

        if (curr && curr.visited) {
            return true;
        }
    }

    return false;
};

```

#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

Runtime: 67 ms, faster than 44.08% of JavaScript online submissions for Linked List Cycle.

Memory Usage: 53.4 MB, less than 30.83% of JavaScript online submissions for Linked List Cycle.