# Reverse Linked List II (92)
[Leetcode Link](https://leetcode.com/problems/reverse-linked-list-ii)

## Restating Problem
---------------------------------------------------------

The problem is requiring us to partially reverse a linked list. Partially reversing involves reversing nodes from a `start` index until the `end` index.

The problem provides an input `list` that will always have at least `1` node. A `left` pointer which functions as a way to tell us where to start reversing, as well as a `right` pointer which tells us when to stop reversing the nodes.

## Solution
------------

#### Intuition

Let us refer to the nodes we need to reverse as the `sublist`. Firstly, let's discuss the only edge case we need to worry about, which is when the `left` and `right` pointers are equal. This means that there is only `1` item in the `sublist`, which obviously can't be reversed. In that case we can return the head of the input list since no changes will need to be made.

Next, let's talk about all other cases. So, the first thing we need to do, is recognize that the `sublist` nodes aren't the only ones we need to worry about. As a matter of fact, the nodes preceding and following the `sublist` are just as important. Let's use an illustration to further explain this relationship:

![example](../../assets/images/reverse-linked-list-example.png)

In the above image, we can see the solution of one of the example inputs. As can be seen in the example above, the `sublist` is reversed, but that is not the only change. Nodes `1` and `5` have different relationships to the nodes in the `sublist`. `1` now points to the new head in the linked list, while `5` is pointed to by the last node in the `sublist`. We have to keep this in mind when crafting our solution.

#### Approach

1. Firstly, we handle our single edge case by using an `if` to return the input list when the `left` & `right` pointers are the same.
2. Next, we'll look for our first pointer. We use variables called `init`, `prev` to track the nodes, and `i` to count the number of nodes we've previously looked at. In order to avoid expensive `null` checks, we can initialize `prev` to be a dummy node.
3. By the time we find our `left` pointer (or when `i === left`), we'll have the node that precedes the `sublist` and the first node in the `sublist`. We can set a new pointer to help us reverse that node while preserving the preceding node. (We'll use the preceding node later on)
5. Starting with the first node `cur = init`, we can reverse the pointers like in a standard reversing a linked list problem, until we get to our `right` pointer.
6. Once we have reversed all the nodes in our `sublist`, we should find our `curr` pointer pointed to the node that follows the `sublist` or the end of the list. Meanwhile, our `prev` pointer will be the last node in our `sublist`
7. As shown by the illustration above, we'll need to update the pointers to the node preceding the sublist, and the last node in the list.
	1. First we can take the `curr` pointer and have the original first node point to it, successfully joining the end of the sublist and the preceding nodes in the parent list
	2. Next, since we have the node preceding the `sublist` stored in `init` we can change that pointer to the next pointer to the end of the sublist. The `init` pointer should still point to the original first node in the `sublist`.
8. Finally, we need to pass the head of the updated list. The only case this could change is when the left parameter is `1`. That means the original head is at the end of the sublist, and the previous last node in the sublist should be the new head. We can achieve that by returning `prev`.

#### Code

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    if (left === right) return head;

    let i = 1, init = head, prev = new ListNode(Infinity, head);

    while (i < left) {
        prev = init
        init = init.next;
        i++;
    }

    let curr = init;
    init = prev;

    while (i <= right) {
        let temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
        i++
    }

    init.next.next = curr
    init.next = prev

    return left === 1 ? prev : head
};

```

#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

**Runtime** 0ms Beats 100.00%

**Memory** 48.46MB Beats 96.83%

