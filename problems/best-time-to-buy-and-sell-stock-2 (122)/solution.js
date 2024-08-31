/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let maxTotalProfit = 0, lowestPricePoint = prices[0];

  for (let i = 1; i < prices.length; i++) {
      if (prices[i] < lowestPricePoint) {
          lowestPricePoint = prices[i]
      } else if (prices[i] > lowestPricePoint) {
          maxTotalProfit += prices[i] - lowestPricePoint;
          lowestPricePoint = prices[i];
      }
  }

  return maxTotalProfit;
};
