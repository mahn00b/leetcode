# Integer To Roman (12)
[Leetcode Link](https://leetcode.com/problems/integer-to-roman/)

## Restating Problem
---------------------------------------------------------

Given an input integer in the range of `1 <= input <= 3999`, convert it to the equivalent roman numeral.

## Solution
------------

#### Intuition

Roman numerals are made up of several different letters and combinations of those letters that correspond to different decimal values. Let's think of these as different `components`. An entire numeral can be represented by adding up one or more of these `components`.

```
"LVIII" = L  + V  +  I + I + I  = 58
		  50 + 5  +  1 + 1 + 1  = 58

"MCMXCIV" = M    + CM  + XC + IV = 1994
			1000 + 900 + 90 +  4 = 1994
```


Our decimal `input` number can also be split up into different `components`.  Each of the digits that make up the `input` can be represented of some multiple of a power of ten `digit * 10^x` . Similarly to roman numerals, these can also be added up in order to achieve the original number.

```
58 = 50         + 8          = 58
   = (5 * 10^1) + (8 * 10^0) = 58

1994 = 1000       + 900        + 90         + 4          = 1994
	 = (1 * 10^3) + (9 * 10^2) + (9 * 10^1) + (4 * 10^0) = 1994

```


When we break the decimal number down into `components`, it actually becomes easier to represent them as roman numerals.

So by simply breaking the `input` into different `components` that are added together, we can map them back to roman numeral components.

```
3000 = 3 * 10^3 = 3 * 1000 = 1000 + 1000 + 1000 = M + M + M = "MMM"
```


There are a few gotchas to consider before crafting the algorithms:

- Roman numerals that represent values that are multiples of `4` & `9` are always represented by a two combined symbols.
- Excluding the multiples of `4` & `9`, the different decimal `components` can represent 2 or more roman numerals if it's a value that is higher than `5 x 10^digit`, since roman numerals have different representations for multiples of `5`

#### Approach

1. Above the function, initialize all the possible unique integers into a map `romans`.
2. Initialize a variable`operand` to be the variable we will use to capture each roman value.
3. Initialize a variable `roman` to an empty string to start building our Roman numeral.
4. Initialize a variable `exp`, to keep track of the power of `10` we're evaluating, we'll start with the highest and go down to `0`.
5. Initialize a loop while our `operand` variable is greater than `0`
	1. Find the next power of `10` we want to evaluate
	2. Get the digit that is in the place of that power of `10` from our `operand`
	3. Next, calculate this Roman numeral's component by multiplying the power of `10` by the `digit` we pulled from the `operand`
	4. If the `digit` is equal to `4` or `9`, then we can assume that this `component` can be found in our `map`.
	5. If the `digit` is greater than or equal to `5`. Then we know that this particular component has a unique value for  `5 * powerOfTen`. It's remainder, however, also does not, and is created by joining the roman integer of our current `powerOfTen` a `remainder` amount of times.
	6. For all other cases, we can assume that then Roman representation `powerOfTen` can represent this component a `digit` amount of times
	7. Subtract the current component from our `operand` and reduce the `exp` to evaluate the next place in num.
6. Finally return `rom`

#### Code

```javascript

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

```

#### Complexity

Runtime:  O(n) `(where n is the number of digits in the input)`

Memory: O(1)

## Results
----------

Runtime: 6 ms, faster than 100.00% of JavaScript online submissions for Integer to Roman.

Memory Usage: 54.5 MB, less than 75.87% of JavaScript online submissions for Integer to Roman.