/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    const counter = new Array(citations.length + 1).fill(0);
    const max = citations.length;

    for (let i = 0; i < citations.length; i++) {
        const count = Math.min(citations[i], max);

        counter[count]++;
    }

    let hIndex = 0;
    for (let i = counter.length - 1; i >= 0; i--) {
        hIndex += counter[i]
        if (hIndex >= i) {
            // we'll have to do something
            return i;
        }
    }

    return 0;
};