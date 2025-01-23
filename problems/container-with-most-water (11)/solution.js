/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let maxVolume = 0,
        left = 0,
        right = height.length - 1;

    while (left < right) {

        const minHeight = Math.min(height[left], height[right]);
        const currentLength = right - left;
        const volume = minHeight * currentLength;

        if (volume > maxVolume) {
            maxVolume = volume
        }

        if (height[left] <= height[right]) {
            left++;
        } else {
            right--;
        }

    }

    return maxVolume;
};