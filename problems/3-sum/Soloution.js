var merge = function(nums, start, mid, end) {
    let n1 = new Array(mid - start + 1)
    let n2 = new Array(end - mid)

    for (let i = 0; i < n1.length; i++) {
        n1[i] = nums[start + i];
    }

    for (let i = 0; i < n2.length; i++) {
        n2[i] = nums[mid + 1 + i]
    }

    let i = 0, p1 = 0, p2 = 0;

    while (p1 < n1.length && p2 < n2.length) {
        if (n1[p1] <= n2[p2]) {
            nums[start + i] = n1[p1];
            p1++;
        } else {
            nums[start + i] = n2[p2];
            p2++;
        }

        i++
    }

    while (p1 < n1.length) {
        nums[start + i] = n1[p1];
        p1++;
        i++;
    }

    while (p2 < n2.length) {
        nums[start + i] = n2[p2];
        p2++;
        i++;
    }
};


var merge_sort = function(nums, start = 0, end = nums.length - 1) {
    if (start >= end) return;
    const mid = start + (Math.floor((end - start) / 2));

    merge_sort(nums, start, mid)
    merge_sort(nums, mid + 1, end)
    merge(nums, start, mid, end)
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    merge_sort(nums)
    const solution = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) return solution;

        let lo = i + 1;
        let hi = nums.length - 1;

        while (lo < hi) {
            const sum = nums[i] + nums[lo] + nums[hi];

            if (sum < 0) {
                lo++;
                while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
            } else if (sum > 0) {
                hi--;
                while (lo < hi && nums[hi] === nums[hi + 1] ) hi--;
            } else {
                solution.push([nums[i], nums[lo], nums[hi]]);

                lo++;
                hi--;

                while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
                while (lo < hi && nums[hi] === nums[hi + 1] ) hi--;
            }

        }

        while (i < nums.length && nums[i] === nums[i + 1]) i++;
    }

    return solution;
};