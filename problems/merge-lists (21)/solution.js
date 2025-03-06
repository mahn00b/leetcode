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