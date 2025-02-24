/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
    const buys = new Array(k).fill(Infinity);
    const profits = new Array(k).fill(-Infinity);

    for (let i = 0; i < prices.length; i++) {
        buys[0] = Math.min(buys[0], prices[i])
        profits[0] = Math.max(profits[0], prices[i] - buys[0])

        for (let j = 1; j < k; j++) {
            // we're accounting for the previous buys in the next buys
            buys[j] = Math.min(buys[j], prices[i] - profits[j-1])
            profits[j] = Math.max(profits[j], prices[i] - buys[j])
        }
    }

    return profits[k-1]
};