# Gas Station
[Leetcode Link](https://leetcode.com/problems/gas-station/)

## Problem
---------------------------------------------------------

The problem involves a series of gas stations that are connected in a circuit. Meaning the last gas station leads back to the first gas station.

Each gas station offers a certain amount of gas, however, it costs a certain amount of gas to move on to the next gas station.

Given a car with an unlimited gas tank that starts at `0`, we need to select a gas station that guarantees we complete the circuit and visit every index.

For all given inputs, we're guaranteed a unique solution.

## Solution
------------

#### Intuition

This problem doesn't have a lot of tricky gotchas. All the information you need is given and nothing really needs to be inferred. However, it's easy to fall for a brute force approach when you pay attention to selecting the gas station.

One might think they need to traverse the circuit starting at each index until they find the first starting point, or evaluate all the indices. This leads to an `O(n^2)` runtime complexity that does work, but not ideal for larger inputs.

However, there's a property to iterating through the circuit that can inform a greedy solution we can use to craft an `O(n)` solution.

#### Approach

First, lets consider what it means to iterate through any single starting point. In order to move on to the next index from the current index, we need to ensure that the gas in our tank is enough to move on to the next index.

So after each visit, we will either have a surplus of gas (extra gas we retain on our route), or we will enter a deficit (not enough gas to cover the route we travelled).

For the sake of this problem, lets consider having enough gas (or 0 remaining) to be a surplus. If that's the case, then there are 2 main reasons we have a deficit.

**Either:**

**A)  The starting station does not have enough gas to move from it's own index**

**B) All the stations between the start and where you met the deficit, don't have enough gas to cover the cost of the trip.**

If A is true, then it automatically disqualifies the starting index as a valid start.

Interestingly enough, if B is true, then **not only does it disqualify the starting point, but all the points between the start and the current index inclusively.** This is simply because if we don't have enough gas to pass the current index, then there wasn't enough of a surplus at the previous stations to complete the circuit.

By simply evaluating an arbitrary starting point, we can disqualify multiple indices as we go along it's route. So why not just start at the first index? Surely, we can find one with a positive surplus if we keep evaluating all the following indices.

Indeed we can. However, there is one gotcha to our approach. Evaluating a subset of gas stations doesn't necessarily mean that we can complete the circuit. It may give us a good starting point, but without taking into account the previous costs, then we can't decide whether or not the circuit is completable.

This can be solved by simply keeping track of the overall surplus or deficit in our tank. If iterating through the entire array ends in a gas deficit, then there isn't enough gas in all of the stations, thus leading to an impossible circuit.

#### Code

```javascript
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let surplus = 0;
    let totalSurplus = 0;
    let start = 0;

    for (let i = 0; i < gas.length; i++) {
        const remaining = gas[i] - cost[i];
        surplus += remaining;
        totalSurplus += remaining;

        if (surplus < 0) {
            start = i + 1;
            surplus = 0;
        }
    }


    return totalSurplus < 0 ? -1 : start;
};
```

#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

Runtime: 75 ms, faster than 54.16% of JavaScript online submissions for Gas Station.

Memory Usage: 59.7 MB, less than 41.69% of JavaScript online submissions for Gas Station.
