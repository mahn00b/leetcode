/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let maxProfit = 0, lowestPricePoint = prices[0];

  for (let i = 1; i < prices.length; i++) {
      if (prices[i] < lowestPricePoint) {
          lowestPricePoint = prices[i]
      } else if (prices[i] > lowestPricePoint) {
          const profit = prices[i] - lowestPricePoint;
          maxProfit = Math.max(profit, maxProfit);
      }

  }

  return maxProfit
};
