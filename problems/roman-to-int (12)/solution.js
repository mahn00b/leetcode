const romans = {
    [1]: 'I',
    [4]: 'IV',
    [5]: 'V',
    [9]: 'IX',
    [10]: 'X',
    [40]: 'XL',
    [50]: 'L',
    [90]: 'XC',
    [100]: 'C',
    [400]: 'CD',
    [500]: 'D',
    [900]: 'CM',
    [1000]: 'M'
}

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    let operand = num;
    let rom = '';
    let exp = num.toString().length - 1;

    while (operand > 0) {
        const powerOfTen = 10 ** exp;
        let digit = Math.floor(operand / powerOfTen);
        const component = digit * powerOfTen;

        if (digit == 4 || digit == 9) {
            rom += romans[component];
        } else if (digit >= 5) {
            let remainder = digit - 5;
            rom += romans[5 * powerOfTen];

            while (remainder > 0) {
                rom += romans[powerOfTen]
                remainder++;
            }

        } else {
            while (digit > 0) {
                rom += romans[powerOfTen];
                digit--;
            }
        }

        operand -= component;
        exp--;
    }

    return rom;
};
