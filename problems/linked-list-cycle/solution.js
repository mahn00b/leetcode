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