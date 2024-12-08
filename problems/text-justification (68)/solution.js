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