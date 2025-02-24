# Best Time To Buy And Sell Stock IV
[Leetcode Link](https://leetcode.com/problems/)

## Restating Problem
---------------------------------------------------------

You're given an input array called `prices` and an integer `k`. Where `prices`, represents the price of a particular for a consecutive amount of days, and `k`, represents the number of times you can transact a buy-sell. Find the maximum profit you can achieve with at most `k` transactions.

## Solution
------------

#### Intuition

The intuition for solving this problem is very similar to how I achieved the solution in [Buy And Sell Stock III](../best-time-to-buy-and-sell-stock-iii%20(123)/README.md). Please read that post for a more detailed explanation.

The core concept to take away from that solution was the logic around using previous profits to calculate total profits.

Essentially, the key difference between this problem and the previous one is that rather than having a fixed `2` transactions. We're using `k` transactions. So we'll need to use arrays and a nested `for..loop`.

#### Approach

1. Instantiate two arrays `prices` and `buys` with a length of `k`. Fill them with the lowest possible integer and the highest possible integer, respectively. In `javascript`, we can make use of `-Infiniy` and `Infinity`.
2. Next, initialize the first `for..loop` that will iterate through the prices array.
	1. Now since the first buy stock buy does not have a previous, we'll handle this case separately. For the first buy, we compare it to the current price to see if we can get a lower buy. Then we compare the current profit to the profit as if we sold our current stock at this price.
	2. Next, we will initialize another for..loop that will loop`k-1` times since we handled the first case separately.
		1. Similarly to the first `buy` comparison, we will also look to see if the current price is lower and thus a better time to `buy`. However, rather than simply comparing, we will deduct the profit from the previous transaction.

		   An easy way to think about this is using the money gained from our first transaction to our new one.
		 2. Next, we will calculate the profit as if we sold the current stock at the current price and see if we get a larger profit.
3. Finally, after the loop terminates, we will return the last element in the `profits` array.

   This is the maximum total profit because we've accounted for all previous profits in our `kth` profit.

#### Code

```js

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

```


## Results
----------

#### Runtime:  2ms Beats 97.83%

#### Memory:  57.16MB

#### Complexity

Runtime:  O(kn) = O(n)

Memory: O(1)