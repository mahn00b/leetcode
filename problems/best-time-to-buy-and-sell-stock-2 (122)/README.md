# Best Time to Buy and Sell Stock II


## Problem
-------------------------------------
[Leetcode Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share of the stock at any time. However, you can buy it then immediately sell it on the **same day**.

Find and return _the **maximum** profit you can achieve_.

**Constraints**
-  1 ` <= prices.length <= ` 10<sup>5</sup>
-  0 ` <= prices[i] <= ` 10<sup>4</sup>

## Solution
------------
This solution is an adaption of the greedy approach taken by the solution for the simpler version of this problem. [Read Best Time to Buy and Sell Stock](obsidian://open?vault=neurons&file=dev%2Fleetcode%2FBest%20time%20to%20buy%20and%20sell%20stock%20(121)%2FREADME)
### Intuition

Like in the previous solution, we'll start with the same assumptions:

- The best time to buy stock is the lowest price of the stock.
- The best time to sell stock is the highest price of the stock

However, since we need to consider the maximum total profit, we'll need to take a different approach.

- Selling stock as often as possible will allow us to maximize the total profit we get from all sales

Keeping these in mind, let's take a look at this algorithm:

#### Algorithm

1. initialize a `maxTotalProfit` variable to `0` and initialize another variable called `lowestPricePoint` to the first element in the array.
2. Next, we will create a `for...loop` that will iterate through the array starting at the second index (or index `1`).

   For each index `i`, we will check if the current price is lower or higher than the current price point.
   a. If the current price point is lower than the `lowestPricePoint`, then we will take the lower number as the new `lowestPricePoint` and continue to calculate our profits using that value.
   b. If the current price point is higher than `lowestPricePoint`, then we will calculate the profit from selling the stock at that point. Then we will add it to the `maxTotalProfit`
3.  Return the `maxTotalProfit` at the end.

## Results
----------

#### Javascript
###### Runtime - `65ms`
###### Memory - `49.6 MB`
