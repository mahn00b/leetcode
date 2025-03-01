const romans = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

const prefixed = {
    'IV': 4,
    'IX': 9,
    'XL': 40,
    'XC': 90,
    'CD': 400,
    'CM': 900
}

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let num = 0;
    let i = 0;

	// Loop until the last index
    for (;i < s.length - 1; i++) {
        const curr = s[i];
        const next = s[i + 1];

        if (romans[curr] < romans[next]) {
          num += prefixed[curr + next]
          i++;
        } else {
            num += romans[curr]
        }
    }

    if (i < s.length) {
        num += romans[s[i]]
    }

    return num;
};