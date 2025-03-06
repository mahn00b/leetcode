# Merge Two Lists
[Leetcode Link](https://leetcode.com/problems/merge-two-sorted-lists/)

## Restating Problem
---------------------------------------------------------

Given two sorted linked lists, merge the two linked lists into one sorted list.

## Solution
------------

#### Intuition

Since our lists are already sorted, we can take advantage of that problem property to fill a new list starting with the initial nodes from the input lists. Since they're sorted, we know that these will be the lowest numbers in the respective lists.

All that's left at that point is to compare those the initial nodes, and fill our new list with what we know to be the least numbers in the array.

Two further thing to consider is the nature of the input itself. It's possible for one or both of these lists to be empty. If one of the lists is empty, then we know our new list should be comprised entirely of the list that's not empty. If both are undefined, then the problem expects us to return null. We can consider these to be our base cases.

#### Approach

1. Handle our base cases mentioned above
	1. If one of the lists is undefined, return the other.
	2. If both are undefined, return null
2. Set up two pointers to iterate through our lists
3. Then set up a pointer for the `newHead` of our linked list. We can use an empty node to start the list. This will help us reduce code by containing all comparisons to our loop, and not require us to do an initial comparison to figure out the actual head. Also set up a pointer called `curr` we can use to move along our new list
4. Initialize a while loop to do the following while both list pointers are truthy:
	1. Check if the `pt1` has a value that's less than or equal to the next `pt2` node.
		1. If it does, then assign the next pointer in the current node to the the `pt1` node, then set the `pt1` pointer to the next node in `list1`.
		2. Conversely, if `pt2` is less than `pt1`, perform the same operation as above but using `pt2`
	2. Move along the new list by setting `curr` to the most recently added node
5. Initialize two more loops to cover any remaining nodes in `list1` or `list2`. This will only happen of one of the lists is shorter than the other.
6. Once we've iterated through all the nodes, we can return the `next` pointer on the `newHead` we initialized earlier to get the start of the new list.


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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    if (!list1 && !list2) return null;
    if (!list1 || !list2) return list1 || list2;
    let pt1 = list1, pt2 = list2;
    let newHead = new ListNode();
    let curr = newHead;

    while (pt1 && pt2) {
        if (pt1.val <= pt2.val) {
            curr.next = pt1
            pt1 = pt1.next
        } else {
            curr.next = pt2
            pt2 = pt2.next
        }

        curr = curr.next
    }

    while (pt1) {
        curr.next = pt1
        pt1 = pt1.next
        curr = curr.next
    }

    while (pt2) {
        curr.next = pt2
        pt2 = pt2.next
        curr = curr.next
    }

    return newHead.next;
};


```

#### Complexity

Runtime:  O(n)
Memory: O(1)

## Results
----------

**Runtime** 0ms Beats 100.00%
**Memory** 51.37MB Beats 85.16%
