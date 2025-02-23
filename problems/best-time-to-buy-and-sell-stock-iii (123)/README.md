
# Best Time To Buy And Sell Stock III (123)
[Leetcode Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii)

## Restating Problem
---------------------------------------------------------

We're given an array of integers `prices`, that represents the daily price for a given stock in a set of particular days. For example, array element `0` represents the first day, and element `1` the second day, etc.

You're goal is to maximize profit given that you buy a stock on a particular day and then sell it at a later day. You can perform at most `2 transactions`, but however, you can only hold `1` stock at a time. So you must sell the stock you bought from the first transaction before buying the second stock.


## Solution
------------

#### Intuition

There are several different ways to approach this problem, however, I landed on a very elegant solution that I loved over all others.

Given that we've solved this problem before using a greedy solution, let's recount our observations from the previous problems:

- The best time to buy stock is the lowest price of the stock.
- The best time to sell stock is the highest price of the stock
- Selling stock as often as possible will allow us to maximize the total profit we get from all sales

I would like to extend these observations by discussing one more that will be incredibly useful in forming our solution:

- By accounting for the profit in the first transaction when selecting our second transaction, the next calculated profit will include profit from the previous output.

Now that might be a tricky thing to wrap our head around, but it will be much clearer when we discuss the approach.
#### Approach


1. We'll start by initializing variables to track the our `buys` and `profits`. Assign the `profits` to the lowest possible number and the `buys` to the highest possible. So they get replaced when we perform our comparisons later on. <small>(In my example, I would array tuples, however, this can be done with 4 individual variables or some other data structure.)</small>
2. Then initialize a `for..loop` to iterate through the `prices` array
3. For each day on the prices array, perform the following steps:
	1. If the current price at `i` is lower than the first `buy`, then we'll hold this stock
	2. Next, we'll compare our current `proft1` with the potential profit we can gain from selling our `buy1` stock at `prices[i]` to grab the max.
	3. Next, we check if the current `prices[i] - profits1` will be a lower price than our current `buy2`. **Note: We subtract the current price by our first profits, in order to calculate our total profit into `profit2`.**
	4. To end the loop, we calculate the potential `profits2` if the current stock is sold at `prices[i]`. Since we subtracted our previous profits, we'll get a total profit in `profits2`
4. When the loop terminates, as mentioned before, we can find our `maxProfit` in 2, since it will account for an previous profits when assigning a new price to our `buy2`


#### Code

```js

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

```

#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

#### Runtime:  12ms

#### Memory:  71.7MB