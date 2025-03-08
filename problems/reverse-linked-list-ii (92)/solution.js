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
