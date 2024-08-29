/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  if (n === 0) {
      return;
  }
  const size = m + n;

  // Merge nums2 into nums1
  for (let i = m, j = 0; i < size; i++, j++ ) nums1[i] = nums2[j]

  mergeSort(nums1, 0, size - 1)
 };


 var mergeSort = function(nums, left, right){
    if (left >= right) return;

    const mid = left + Math.floor((right - left) / 2)
    mergeSort(nums, left, mid)
    mergeSort(nums, mid + 1, right)
    merges(nums, left, mid, right)
 }

 var merges = function(nums, left, mid, right) {
  const size1 = mid - left + 1
  const size2 = right - mid

  const l = new Array(size1)
  const r = new Array(size2)

  for(let i = 0; i < size1; i++) {
      l[i] = nums[left + i]
  }
  for (let i = 0; i < size2; i++) {
      r[i] = nums[mid + 1 + i]
  }

  let i = left, li = 0, ri = 0;
  while(li < size1 && ri < size2) {
      if (l[li] <= r[ri]) {
          nums[i] = l[li];
          li++;
      } else {
          nums[i] = r[ri];
          ri++;
      }

      i++;
  }

  while (li < size1) {
    nums[i] = l[li]
    i++;
    li++;
  }

  while (ri < size2) {
    nums[i] = r[ri]
    i++;
    ri++;
  }
 }