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
