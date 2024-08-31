# Best Time to Buy & Sell Stock


## Problem
-------------------------------------
[Leetcode Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return _the maximum profit you can achieve from this transaction_. If you cannot achieve any profit, return `0`.

**Constraints**
-  1 ` <= prices.length <= ` 10<sup>5</sup>
-  0 ` <= prices[i] <= ` 10<sup>4</sup>

## Solution
------------
> Before I begin describing the solution I went with, it's worth mentioning that there is there is another solution that leverages [Kandane's Algorithm](https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's_algorithm) to solve this as a maximum subarray problem. Worth noting for future iterations of this solution.

##### Intuition
For this solution, we'll take a greedy approach to a solution design. Every greedy approach starts with making a few assumptions, so we'll state ours:

- The best time to buy stock is the lowest price of the stock.
- The best time to sell stock is the highest price of the stock

Using these two assumptions we can design a greedy algorithm that will aim to buy at the lowest point and sell at the next highest point

#### Algorithm

1. initialize a `maxProfit` variable to `0` and initialize another variable called `lowestPricePoint` to the first element in the array.
2. Next, we will create a `for...loop` that will iterate through the array starting at the second index (or index `1`).

   For each index `i`, we will check if the current price is lower or higher than the current price point.
   a. If the current price point is higher than `lowestPricePoint`, then we will calculate the profit from selling the stock at that point. Then we will compare to our previous maxProfit to take the higher number.
   b. If the current price point is lower than the `lowestPricePoint`, then we will take the lower number as the new `lowestPricePoint` and continue to calculate our profits using that value.
3. Once we've looped through the entire array we will have found our `maxProfit`. Return the `maxProfit` at the end.

## Results
----------

#### Javascript
#### Runtime - `84ms`
##### Memory - `58.9MB`

