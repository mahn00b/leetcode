/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    const n = ratings.length;
	// Counter. Starts at n because all children recieve 1 candy
    let allocation = n;
    let i = 1;

    while (i < n) {
        if (ratings[i] === ratings[i - 1]) {
	        // skip because we already allocated 1 candies to each
            i++;
            continue;
        }

        let upwards = 0;
        while (i < n && ratings[i - 1] > ratings[i]) {
            upwards++;
            allocation += upwards;
            i++;
        }

        let downwards = 0;
        while (i < n && ratings[i - 1] < ratings[i]) {
            downwards++;
            allocation += downwards
            i++;
        }
	    // The tricky part here is realizing that this is when we have the
	    // opportunity to minimize.
		// When there is an consecuitive increasing subsequnce and decreasing
		// subsequence, respectively, the shorter subsequence determines
		// how many extra candies we allocated to the last child.
        allocation -= Math.min(upwards, downwards)
    }

    return allocation;
};
