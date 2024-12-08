
# Text Justification (68)
[Leetcode Link](https://leetcode.com/problems/text-justification/)

## Restating Problem
---------------------------------------------------------

The problem gives a set of words to transform into a text-justified lines. Which essentially means, ensuring all the lines we create have the same character width.

These words also need to be space separated, however, these are not just standard single spaces. Depending on the nature of the line itself, the words need to spaced out differently.

## Solution
------------

#### Intuition

There are two main sub-problems to consider when constructing the solution.

1 - Choosing the right amount of words to fit onto one line
2 - Evenly distributing the number of spaces to fit the line

**Choosing the right amount of words to fit onto one line**

Choosing the right amount of words depends on the length of each word and number of words. Why the number of words? This is because for our lines to be cohesive, there needs to be at least one space between every 2 words. Based on that, we know that using the `n` words we select for one line there will be `n - 1` spaces.

Now that we have a way to calculate what the estimated length of our line will be, we can start to select words until we maximize the spaces.

```JS

lineLength = totalWordsLength + (numberOfWords - 1)

lineLength <= maxWidth

```

<small>
* With exception of  the cases where lines have one word that fills an entire line or the last word in a regular line.
</small>

**Evenly distributing the number of spaces to fit the line**

So once we have a set of words to justify onto one line, now we need to distribute the spaces. We know that the `placements` of the spaces should be between two words and this will be `n - 1` (where `n` is the number of words).

Spaces should also be _evenly_ distributed, and in the cases where there is an uneven distribution of spaces on the left must have more spaces than the rightmost ones. The number of spaces is determined based on the remaining characters on the line, which could be evenly divisible by the number of `placements` or not.

This was the more challenging part of the problem for me, because I tried several approaches until I got to the right solution. At first, I tried simply using the remainder after dividing the `availableSpaces` by the number of `placements`. However this introduced a number of edge cases that grew to be very challenging depending on the nature of the input.

After much research around even number distribution, I realized that the solution was very similar to the a load balancing problem. This led me to the approach that worked, which was using the *round robin*.
#### Approach

In order to simplify the algorithm write up, I'll split it into allocating words, joining them, and finally distributing spaces.

**Allocating Words**

1. We start by initializing an integer called `currentLength` to track the length of all the words, as well as the length of all the words you've selected for the next `line`.
2. As we iterate through the input array, we evaluate it to see if it will fit on our current line. The line should support it's current length plus the addition of the new word.

   a) If the line cannot support the next `word`, then we will join them, and push them into our solution array. We will then reset our `currentLength` & `line` variables to track the next line.
   b) If the current line can support the next `word`, we will add it to `line` & add up the length of the `word` to our `currentLength`.

```js

 if (word.length + line.length + currentLength > maxWidth) {

	 solution.push(joinWords(subStack, currentLength, false))

	 line = [word]
	 currentLength = word.length;

 } else {
	 line.push(word)
	 currentLength += word.length;
 }

  ```
3.  If we keep iterating and joining the words this way, we will always be left with at least one last line we need to justify. Doing it this way reduces complexity when writing the loop itself.
4. At then return our `solution` array to give the final answer.

**Joining a line**

2. We start by identifying the `availableSpaces` after selecting the words. This is simply the `maxWidth` argument subtracted by the `currentLength` we were tracking previously.
3. Then we find the number of `placements` to allocate spaces to. As discussed previously, this is `n - 1` where `n` is the length of the set of words.
4. Before we tackle most cases, the edge cases where the behavior changes are when we're joining the last line or line with just one word. In these cases, we join whatever words are in set by using the `Array.join()` method and passing in a space as the delimiter `' '`. This works because when there is one word there will be no delimiter added. Finally, append it with the `availableSpaces` and we will get our special line.

```JS
    if (isLastLine || placements === 0) {
        return set.join(' ') + getSpaceString(spacesAvailable - placements);
    }
```
5. On all other cases, we can simply just allocate the spaces into an array of space strings for each placement (see next procedure).
6. We can loop through the words & spaces, and append them to our result.
7. This should leave us with one last word to append before returning the resulting line

**Distributing Spaces**

1. Determine the `avilableSpaces` & the `placements`. In our solution, these are passed as arguments to the function assigning the allocation.
2. We start by initializing an array for the `placements` and giving them all a minimum of `1` space.
3. We can continue to iterated through this array until we've exhausted all `availableSpaces`. By starting from the left and rotating at the end, we can ensure that the leftmost `placments` will be allocated the most spaces.
4. Return the allocations to be converted into space strings.
#### Code

```JS


/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
  // round robin space distribution
  var distributeSpaces = function(placements, spaces) {
      // pre-fill with a minimum of 1 space
      const result = new Array(placements).fill(1);
      let s = spaces - placements;
      let i = 0;

      while (s > 0) {
          result[i]++;
          s--;
          i = i === result.length - 1 ? 0 : i + 1;
      }

      return result;
  }

  var getSpaceString = function(count) {
    if (count <= 0) return '';

    return new Array(count).fill(' ').join('')
  }

  var joinWords = function(set, totalLength, isLastLine) {
    let str = '';
    const spacesAvailable = maxWidth - totalLength;
    const placements = set.length - 1;

    if (isLastLine || placements === 0) {
        return set.join(' ') + getSpaceString(spacesAvailable - placements);
    }

    const spaces = distributeSpaces(placements, spacesAvailable);

    for (let i = 0; i < placements; i++) {
        // Append a word
        str += set[i];
        // Then append it's corresponding space
        str += getSpaceString(spaces[i]);
    }

    // Add the last word
    str += set[set.length - 1]

    return str;
  }

  const solution = [];
  let line = [];
  let currentLength = 0;

  for (let i = 0; i < words.length; i++) {
     const word = words[i];

     if (word.length + line.length + currentLength > maxWidth) {

         solution.push(joinWords(line, currentLength, false))

         line = [word]
         currentLength = word.length;

     } else {
         line.push(word)
         currentLength += word.length;
     }
  }

  solution.push(joinWords(line, currentLength, true))

  return solution;
};

```

#### Complexity

Runtime:  O(n)

Memory: O(1)

## Results
----------

Runtime: 0 ms, faster than 100.00% of JavaScript online submissions for Text Justification.

Memory Usage: 49.3 MB, less than 24.08% of JavaScript online submissions for Text Justification.
