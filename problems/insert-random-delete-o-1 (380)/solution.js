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