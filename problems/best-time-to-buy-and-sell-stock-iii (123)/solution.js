/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const buys = [Infinity, Infinity]
    const profits = [-Infinity, -Infinity]
    for (let i = 0; i < prices.length; i++) {
        const [buy1, buy2] = buys;
        const [profits1, profits2] = profits;
        // check if the current buy price is better than the previous price
        buys[0] = Math.min(buy1, prices[i])
        // checks if the current the profit is more at this point than the previous
        profits[0] = Math.max(profits1, prices[i] - buys[0])

        // Calculates the buy2 by checking if the current price is better after subtracting our first profits
        buys[1] = Math.min(buy2, prices[i] - profits[0])
        // calculates the profit from the second buy
        profits[1] = Math.max(profits2, prices[i] - buys[1])
    }

    return profits[1]
};