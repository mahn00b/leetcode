# Insert Delete GetRandom O(1)

[Leetcode Link](https://leetcode.com/problems/insert-delete-getrandom-o1/)

## Solution
------------

The solution I've opted for uses both an array and a map. We also use array swapping techniques to preserve as much useful memory as possible and not waste operations resizing the array.

The most difficult thing about this problem is trying to solve it using implementations that will take an `O(1)` runtime. In order to achieve this, the main thing we'll have to avoid when crafting our solution is iterating through our set.

**Array**
The array will store the values of our set and ensure that a defined range of values are available when we later choose a random number. If we always ensure the `n` length of our set is contained in the first elements of this array, then we will always have a range of indexes between `0-n` to choose from.

**Map**

The map will be used to store the index each value we insert into our set. That way, when we go to delete the elements, we don't have to iterate through all our values to find the one we're trying to delete. The same principal also helps us quickly guarantee uniqueness in our set.

#### Constructor

The constructor should initialize an array to keep track of our set, a map for the indexes, and a integer to keep track of the amount of elements remaining in the set.


#### Insert

Before we try to insert, we can use our map to determine whether or not the element is contained in the set. If we don't have an entry for it, then we can simply return `false`

If the number is not in our set, we can append it to the end of our set in the array, and then add it's index to our map. Depending on whether or not there are remove operations, we will have to either use `Array.prototype.push` to allocate more memory to the array, or just insert it into the empty positions of previous values.

We then set our map to assign the index to our new value, and increment our set size integer.

#### Remove

Like insert, we'll check if the value we want to remove is not present in the set using our map. If it isn't, then we'll return false.

If it is in the array, then we can find the it's index using our map. We can then use the concept of swapping to assign the last value in our set to that index, retaining a sequential array of valid elements. There's no need to complete the swap by switching around the older value since it's not useful to us anymore.

We then set our map to assign the index of the delete value to the value that we swapped it with. Then we can delete the old value in our map and decrement our `size` integer

#### getRandom

Since the problem has guaranteed that we will always have an element in our set when `getRandom()` is called, then we don't need to concern ourselves with those cases.

By simply selecting a random number between `0-size`, we should be able to return a valid array index with one of our values.


#### Code

```JS

var RandomizedSet = function() {
    this.map = new Map();
    this.set = [];
    this.size = 0;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) return false;

    if (this.size < this.set.length) {
        this.set[this.size] = val;
    } else {
        this.set.push(val)
    }

    this.map.set(val, this.size);
    this.size++;
    return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) return false;

    // Get index
    const idx = this.map.get(val);
    const last = this.set[this.size - 1];

    // swap with end
    this.set[idx] = last;

    // Adjust map and set size
    this.map.set(last, idx);
    this.map.delete(val);
    this.size--;

    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const random = Math.floor(Math.random() * this.size);
    return this.set[random];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

```

#### Complexity

Runtime:  O(n)

Memory: O(n)
## Results
----------

Runtime: 329 ms, faster than 72.50% of JavaScript online submissions for Insert Delete GetRandom O(1).

Memory Usage: 102 MB, less than 11.32% of JavaScript online submissions for Insert Delete GetRandom O(1).