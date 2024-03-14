// CONVERT 12HOURS TO 24HOURS
exports.convertTwelveHoursToTwentyFourHours = function (timeStr) {
  let [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = +hours + 12;
  return `${hours}:${minutes}`;
};

// /* Explanation
//   console.log(time1.split(" ")) // ['5:00', 'PM']
//   let str = '5:00'
//   console.log(str.split(":")) // ['5', '00'] */

// CONVERT 24HOURS TO 12HOURS
exports.convertTwentyFourHoursToTwelveHours = function (timeStr) {
  let [hours, minutes] = timeStr.split(":");
  if (hours === "12") {
    hours = "12";
    return `${hours}:${minutes} PM`;
  }
  if (hours > "12") {
    hours = +hours - 12;
    return `${hours}:${minutes} PM`;
  }
  if (hours < "12") {
    return `${hours}:${minutes} AM`;
  }
};

// NUMBER OF DAYS BETWEEN TWO DATES
exports.daysBetweenDates = function (date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  let difference = (date1 - date2) / (1000 * 3600 * 24); // milliseconds

  return Math.abs(difference);
};

// SUBTRACT DAYS
exports.subtractDays = function (date, days) {
  date = new Date(date);
  date.setDate(date.getDate() - days); // add + 1 if date format is: 12/31/2022 or 12-31-2022
  return date;
};

// ------------------------------------------------------------------------------------ //
/* ZERO MATRIX: Write an algorithm such that if an element in an MxN matrix is 0, its
entire row and column are set to 0. */

/* ROTATE MATRIX (2D Array) in-place: Given an image represented by an NxN matrix, where
each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. */

// Rotate Matrix Right -> Clockwise
exports.rotateMatrixRight = function (matrix) {
  let n = matrix.length;

  for (let row = 0; row < n; row++) {
    for (let col = row; col < n - 1 - row; col++) {
      let last = n - 1 - row;
      let offset = col - row;

      // implement the swap index by index:
      let top = matrix[row][col];

      // left edge -> top edge
      matrix[row][col] = matrix[last - offset][row];

      // bottom edge -> left edge
      matrix[last - offset][row] = matrix[last][last - offset];

      // right edge -> bottom edge
      matrix[last][last - offset] = matrix[col][last];

      // top edge -> right edge
      matrix[col][last] = top;
    }
  }

  return matrix;
};
// // invoke the function
// // var matrix = [
// //   [5, 1, 9, 11],
// //   [2, 4, 8, 10],
// //   [13, 3, 6, 7],
// //   [15, 14, 12, 16],
// // ];
// rotateMatrixRight(matrix); // 

// Rotate Matrix Left -> Anti-Clockwise
exports.rotateMatrixLeft = function (matrix) {
  let n = matrix.length;

  for (let row = 0; row < n; row++) {
    for (let col = row; col < n - 1 - row; col++) {
      let last = n - 1 - row;
      let offset = col - row;

      // swap index by index:
      let top = matrix[row][col];

      // right edge -> top edge
      matrix[row][col] = matrix[col][last];

      // bottom edge -> right edge
      matrix[col][last] = matrix[last][last - offset];

      // left edge -> bottom edge
      matrix[last][last - offset] = matrix[last - offset][row];

      // top edge -> left edge
      matrix[last - offset][row] = top;
    }
  }

  return matrix;
};
// // invoke the function
// // var matrix = [
// //   [5, 1, 9, 11],
// //   [2, 4, 8, 10],
// //   [13, 3, 6, 7],
// //   [15, 14, 12, 16],
// // ];
// rotateMatrixLeft(matrix); // 

// ------------------------------------------------------------------------------------ //
/* IS ROTATION: Assume you have a method isSubstring which checks if one word is
a substring of another. Given two strings, supstr and substr,
write code to check if substr is a rotation of supstr using only one call to isSubstring
(e.g., "waterbottle" is a rotation of" erbottlewat"). */
exports.isRotation = function (supstr, substr) {
  supstr = supstr.toLowerCase().split("").sort().join("");
  substr = substr.toLowerCase().split("").sort().join("");
  return supstr === substr;
};

// ROTATE STRING
exports.rotateString = function (string, k, direction) {
  // Rotate Clockwise (right)
  if (direction === "right") {
    k = string.length - k;
    let str1 = string.slice(k, string.length);
    let str2 = string.slice(0, k);
    let merge_string = str1 + str2;
    return merge_string;
  }

  // Rotate Anti-Clockwise (left)
  if (direction === "left") {
    let str1 = string.slice(k, string.length);
    let str2 = string.slice(0, k);
    let merge_string = str1 + str2;
    return merge_string;
  }
};

// ROTATE ARRAY
// Return an array that holds the indices of a searched element in the rotated array.
exports.rotateArray = function (array, k, direction, element) {
  // Rotate Clockwise (right)
  if (direction === "right") {
    var merge_array = null;
    k = array.length - k;
    let arr1 = array.slice(k, array.length);
    let arr2 = array.slice(0, k);
    merge_array = arr1.concat(arr2);

    // get indices of a searched element in the merge_array (rotated array)
    let indices = [];
    for (let [idx, ele] of merge_array.entries()) {
      if (ele === element) {
        indices.push(idx);
      }
    }

    return [merge_array, indices];
  }

  // Rotate Anti-Clockwise (left)
  if (direction === "left") {
    var merge_array = null;
    let arr1 = array.slice(k, array.length);
    let arr2 = array.slice(0, k);
    merge_array = arr1.concat(arr2);

    // get indices of a searched element in the merge_array (rotated array)
    let indices = [];
    for (let [idx, ele] of merge_array.entries()) {
      if (ele === element) {
        indices.push(idx);
      }
    }

    return { merge_array, indices };
  }
};

// ------------------------------------------------------------------------------------ //
// SUBSTRINGS, SUBARRAYS, SUBSEQUENCES, SUBSETS

/* SUBSTRINGS AND SUBARRAYS
-> a substring is a string that occurs in another string.
-> a subarray is a slice from a contiguous array.
both substrings and subarrays occupy consective positions and inherently maintain
the order of characters and elements respectively. */
exports.subStringsArrays = function (str) {
  var result = [];
  for (i = 0; i < str.length; i++) {
    for (j = i + 1; j < str.length + 1; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
};

/* SUBSEQUENCES AND SUBSETS
-> a subsequence of an array is a new array that is formed from the original array
by deleting some (or none) of the elements without disturbing the relative
positions and order of the remaining elements.
a subsequence may be continuous or non-continuous: for example;
[1,3,5] is a non-continuous subsequence of [1,2,3,4,5] while
[1,2,3] is a continuous subsequence of [1,2,3,4,5]

[1,3,2] is not a subsequence of [1,2,3,4,5] because the array is non-continuous
and does not maintain relative position and order of elements. however,
[1,3,2] is a subset of [1,2,3,4,5]. a subset may not maintain relative position
and order of elements.

-> a subset is any possible combination of the original set. for example;
[1,3,2] is a subset of [1,2,3,4,5]. a subset may not maintain relative position
and order of elements. */
exports.subSequencesSubsets = function (arr) {
  let result = [];
  var subs = (subsets, value) =>
    subsets.concat(subsets.map((set) => [...set, value]));
  return arr.reduce(subs, [result]);
};

// ------------------------------------------------------------------------------------ //
// IS SUBSTRING / COMBINATION OF ANOTHER STRING
exports.isSubString = function (str, substr) {
  let res;
  if (str.toLowerCase().includes(substr.toLowerCase())) res = "Valid Substring";

  if (res === "Valid Substring") return true;
  return false;
};

// IS SUBSEQUENCE OF ANOTHER STRING
exports.isSubStringSequence = function (str, subseq) {
  let idx = 0;
  let arr = str.toLowerCase().split("");

  arr.filter((el) => {
    if (el.includes(subseq.toLowerCase()[idx])) idx++;
  });

  if (idx === subseq.length) return true;
  return false;
};

// IS SUBSET OF ANOTHER STRING
exports.isSubSetStr = function (str, subset) {
  let idx = 0;
  let arr = str.toLowerCase().split("").sort();

  arr.filter((el) => {
    if (el.includes(subset.toLowerCase().split("").sort()[idx])) idx++;
  });

  return idx === subset.length;
};

// ------------------------------------------------------------------------------------ //
// IS SUBARRAY / COMBINATION OF ANOTHER ARRAY
exports.isSubArray = function (arr, subarr) {
  subarr = subarr.join("").toString();
  arr = arr.join("").toString();

  let res;
  if (arr.toLowerCase().includes(subarr.toLowerCase())) res = "Valid Subarray";

  if (res === "Valid Subarray") return true;
  return false;
};

// IS SUBSEQUENCE OF ANOTHER ARRAY
exports.isSubArraySequence = function (arr, subseq) {
  subseq = subseq.join("").toString();
  arr = arr.join("").toString();
  arr = arr.toLowerCase().split("");

  let idx = 0;

  arr.filter((el) => {
    if (el.includes(subseq.toLowerCase()[idx])) idx++;
  });

  if (idx === subseq.length) return true;
  return false;
};

// IS SUBSET OF ANOTHER ARRAY
exports.isSubSetArr = function (arr, subset) {
  subset = subset.join("").toString();
  arr = arr.join("").toString();
  arr = arr.toLowerCase().split("").sort();

  let idx = 0;

  arr.filter((el) => {
    if (el.includes(subset.toLowerCase().split("").sort()[idx])) idx++;
  });

  return idx === subset.length;
};

// ------------------------------------------------------------------------------------ //
// LARGEST SUBARRAY SUM
exports.largestSubarraySum = function (array) {
  let presum = 0;
  let cursum = 0;
  //let nexsum = 0;
  let accumulator = [];
  array.forEach((el) => {
    cursum = Math.max(presum, cursum + el);
    //nexsum = Math.max(cursum, nexsum);
    accumulator.push(cursum);
  });
  return Math.max(...accumulator);
};

// COUNT SUBARRAYS EQUAL TO SUM
exports.countSubArraysEqualToSum = function (nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum = sum + nums[j];
      if (sum === k) count++;
    }
  }
  return count;
};

// // ------------------------------------------------------------------------------------ //
/* LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS -> USING POINTERS
To Solve this problem we need to have two pointers that both start at 0 index, or the first char of the given
string, and an empty set also a var for the longestSubstringLength We start looping over the string chars and
check if the char is not in our set we add it to the set then we move the right pointer, increasing the sliding window, get
the max between longestSubstringLength, which is intialized as 0 and our chars set size or length, and so on untill
we find a char existed in the list, if so we delete the first char in our set then we increase the left pointer to start
from the next Letter */
exports.lengthOfLongestSubstring = function (s) {
  // initialize variables
  let i = 0;
  let j = 0;
  let longestSubstr = 0;
  let uniquechars = [];

  while (i < s.length) {
    // The char is not found in the array
    if (!uniquechars.includes(s[i])) {
      uniquechars.push(s[i]);
      longestSubstr = Math.max(longestSubstr, uniquechars.length);
      i++;
    } else {
      // The char is found in the array
      uniquechars.shift(s[j]);
      j++;
    }
  }
  return longestSubstr;
};

// LONGEST COMMON SUBSEQUENCE
exports.longestCommonSubsequence = function (s1, s2) {
  if (s1.length === 0 || s2.length === 0) return "";
  if (s1.slice(-1) === s2.slice(-1))
    return (
      longestCommonSubsequence(s1.slice(0, -1), s2.slice(0, -1)) + s1.slice(-1)
    );

  let subseq1 = longestCommonSubsequence(s1.slice(0, -1), s2);
  let subseq2 = longestCommonSubsequence(s1, s2.slice(0, -1));
  if (subseq1.length > subseq2.length) return subseq1;
  return subseq2;
};

// ------------------------------------------------------------------------------------ //
// PALINDROMES AND PERMUTATIONS

/* IS PALINDROME / IS REVERSE
Given a string, write a method to decide if it is a palindrome. */
exports.isPalindrome = function (s) {
  s = s.toLowerCase().replace(/[^A-Za-z0-9]/gi, "");
  // reverse the input and return the result of the comparison
  return s === s.split("").reverse().join("");
};

// Given two strings, write a method to decide if one is a palindrome of the other. */
exports.isPalindromes = function (str1, str2) {
  let merge_str = str1 + str2;
  // Then make the string case-insensitive by converting to lowercase
  merge_str = merge_str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  let [i, j] = [0, merge_str.length - 1];
  while (j > 0) {
    if (merge_str[i] != merge_str[j]) return false;
    i++;
    --j;
  }
  return true;
};

/* IS PERMUTATION / IS ANAGRAM
Given two strings, write a method to decide if one is a permutation of the other. */
exports.isPermutation = function (s1, s2) {
  // sort the input and return the result of the comparison
  return (
    s1
      .replace(/[^A-Za-z0-9]/g, "")
      .toLowerCase()
      .split("")
      .sort()
      .join("") ===
    s2
      .replace(/[^A-Za-z0-9]/g, "")
      .toLowerCase()
      .split("")
      .sort()
      .join("")
  );
};

/* IS PERMUTATION OF A PALINDROME
Palindrome Permutation: Given a string, write a function to check if it is a
permutation of a palindrome. */
exports.isPalindromePermutation = function (s) {
  let res = new Set();
  return (
    s
      .replace(/[^A-Za-z0-9]/g, "")
      .toLowerCase()
      .split("")
      .reduce((set, item) => {
        (set.has(item) && set.delete(item)) || set.add(item);
        return set;
      }, res).size <= 1
  );
};

// // PERMUTATIONS -> ANAGRAMS
// exports.generatePermutation = function (arr) {
//   let resultArr = [];
//   if (arr.length === 0) return resultArr;
//   if (arr.length === 1) resultArr.push(arr);

//   for (let i = 0; i < arr.length; i++) {
//     const currentElement = arr[i];

//     const otherElements = arr.slice(0, i).concat(arr.slice(i + 1));
//     const swappedPermutation = generatePermutation(otherElements);

//     for (let j = 0; j < swappedPermutation.length; j++) {
//       const finalSwappedPermutation = [currentElement].concat(
//         swappedPermutation[j]
//       );

//       resultArr.push(finalSwappedPermutation.join("")); // for strings
//       // resultArr.push(finalSwappedPermutation); // for arrays
//     }
//   }

//   return resultArr;
// };
// // invoke the function
// console.log(generatePermutation("aabc"));
// console.log(generatePermutation(["S", "t", "e", "p", "h", "e", "n"]));
// console.log(generatePermutation([1, 2, 3]));

// ------------------------------------------------------------------------------------ //
// SORTING ALPHABET AND NUMBERS THE RIGHT WAY
exports.sortAlpsNums = function (a) {
  a.sort(function (e1, e2) {
    // Alphabet Case-Insensitive Sort
    if ((typeof e1 && typeof e2) === "string") {
      e1 = e1.toLowerCase();
      e2 = e2.toLowerCase();
      if (e1 > e2) return 1;
      if (e1 < e2) return -1;
    }
    // Numerical Sort
    if ((typeof e1 && typeof e2) === "number") {
      if (e1 > e2) return 1;
      if (e1 < e2) return -1;
    }
  });
  return a;
};

// SORT THE ARRAY IN A WAY THAT NUMBERS COME FIRST AND STRINGS SECOND
exports.firstNumsSecondAlps = function (arr) {
  let [nums, alps] = [[], []];

  nums = arr.filter((el) => typeof el === "number");
  alps = arr.filter((el) => typeof el === "string");

  nums.sort(function (e1, e2) {
    if (e1 > e2) return 1;
    if (e1 < e2) return -1;
  });
  alps.sort(function (e1, e2) {
    e1 = e1.toLowerCase();
    e2 = e2.toLowerCase();
    if (e1 > e2) return 1;
    if (e1 < e2) return -1;
  });

  return nums.concat(alps);
};

// SORT PRODUCTS
exports.sortProducts = function (a) {
  let res = [];
  a.forEach((el) => {
    // square element and append product to res array
    res.push(el * el);
    // then sort res array
    res.sort(function (e1, e2) {
      if (e1 > e2) return 1;
      if (e1 < e2) return -1;
    });
  });
  return res;
};

/* REGULAR EXPRESSION -> RegExp
Return a sorted string without symbols and numbers. */
exports.regExp = function (s) {
  // transform string then sort
  s = s
    .replace(/[^A-Za-z]/g, "")
    .split("")
    .sort(function (e1, e2) {
      // Alphabet Case-Insensitive Sort
      e1 = e1.toLowerCase();
      e2 = e2.toLowerCase();
      if (e1 > e2) return 1;
      if (e1 < e2) return -1;
    });
  return s.join("");
};

// ------------------------------------------------------------------------------------ //
/* OBJECT STORE -> Dictionary Sorting Objects */
// var employees = [
//   { name: "John", salary: 90000, hireDate: "July 1, 2010" },
//   { name: "David", salary: 75000, hireDate: "August 15, 2009" },
//   { name: "Ana", salary: 80000, hireDate: "December 12, 2011" },
//   { name: "John", salary: 90000, hireDate: "July 1, 2010" },
//   { name: "David", salary: 75000, hireDate: "August 15, 2009" },
//   { name: "Ana", salary: 80000, hireDate: "December 12, 2011" },
// ];

// SORT THE OBJECT BY SALARY
exports.sortEmployeesBySalary = function (employees) {
  employees.sort((obj1, obj2) => {
    if (obj1.salary > obj2.salary) return 1;
    if (obj1.salary < obj2.salary) return -1;
  });
  return employees;
};
// invoke the function
//console.table(sortEmployeesBySalary(employees));
/*
┌─────────┬─────────┬────────┬─────────────────────┐
│ (index) │  name   │ salary │      hireDate       │
├─────────┼─────────┼────────┼─────────────────────┤
│    0    │ 'David' │ 75000  │  'August 15, 2009'  │
│    1    │ 'David' │ 75000  │  'August 15, 2009'  │
│    2    │  'Ana'  │ 80000  │ 'December 12, 2011' │
│    3    │  'Ana'  │ 80000  │ 'December 12, 2011' │
│    4    │ 'John'  │ 90000  │   'July 1, 2010'    │
│    5    │ 'John'  │ 90000  │   'July 1, 2010'    │
└─────────┴─────────┴────────┴─────────────────────┘
*/

// // EXTRACT THE VALUES OF A GIVEN PROPERTY FROM AN ARRAY OF OBJECTS
// // extract (names, salaries) from employees array
// exports.extractValues = (arr, prop1, prop2) => {
//   let output = [];

//   arr.forEach((item) => {
//     output.push(item[prop1], item[prop2]);
//   });

//   return output;
// };
// // invoke the function
// //console.log(extractValues(employees, "name", "salary"));
// /*
// [
//   'John', 90000, 'David',
//   75000,  'Ana', 80000,
//   'John', 90000, 'David',
//   75000,  'Ana', 80000
// ] */

// ------------------------------------------------------------------------------------ //
// CHECK IF A STRING CONTAINS ANOTHER STRING
// console.log("Programming language".includes("programming")); // false
// console.log("Programming language".includes("Programming")); // true
// console.log("Programming".includes("Programming language")); // false
// console.log(["Programming", "language"].includes("Programming")); // true

// COMMON CHARACTERS
exports.commonCharacters = function (s1, s2) {
  let comChars = [];
  // common characters
  s1.split("").filter((el) => {
    if (s2.split("").includes(el)) {
      comChars.push(el);
    }
  });
  return comChars.join("");
};

// NOT COMMON CHARACTERS
exports.notCommonCharacters = function (s1, s2) {
  let notComChars = [];
  // not common characters in s1
  s1.split("").filter((el) => {
    if (!s2.split("").includes(el)) {
      notComChars.push(el);
    }
  });
  // not common characters in s2
  s2.split("").filter((el) => {
    if (!s1.split("").includes(el)) {
      notComChars.push(el);
    }
  });

  return notComChars.join("");
};

/* IS ONEAWAY -> ZERO OR ONE EDIT AWAY
There are three types of edits that can be performed on strings:
insert a character, remove a character, or replace a character. Given two
strings, write a function to check if they are one edit (or zero edits) away.
EXAMPLE
pale, ple -> true
pales, pale -> true
pale, bale -> true
pale, bae -> false */
exports.isOneAway = function (s1, s2) {
  let notCom = [];
  s1.split("").filter((el) => {
    if (!s2.split("").includes(el)) {
      notCom.push(el);
    }
  });

  if (notCom.length <= 1) return true;
  return false;
};

// COMMON ELEMENTS SUM -> type insensitive
exports.commonElements = function (a1, a2) {
  let comElements = [];
  let sum = 0;

  a1.filter((e1) => {
    a2.filter((e2) => {
      // type insensitive
      if (e1 == e2) {
        comElements.push(e1);
      }
    });
  });

  return comElements.reduce((e1, e2) => {
    return +e1 + +e2;
  }, sum);
};

// ------------------------------------------------------------------------------------ //
// THE OCCURRENCE OF A WORD IN STRING
exports.wordCount = function (s, word) {
  let indices = [];
  word = word.toLowerCase();
  let a = s.toLowerCase().replaceAll(" ", ",").split(",");

  for (let [idx, el] of a.entries()) {
    if (el.includes(word)) {
      indices.push(idx);
    }
  }

  return [word, indices.length];
};

// THE OCCURRENCE OF A LETTER IN STRING
exports.letterCount = function (s, letter) {
  let indices = [];
  let a = s.toLowerCase().split("");

  for (let [idx, el] of a.entries()) {
    if (el.includes(letter.toLowerCase())) {
      indices.push(idx);
    }
  }

  return [letter, indices.length];
};

// THE OCCURRENCE OF SUBSTRING IN STRING
exports.countSubstrings = function (s, substr) {
  let regexp = new RegExp(substr, "gi");
  let count = s.match(regexp).length;
  return count;
};

// THE WORDS / NUMBER OF WORDS WITH SUBSTRING
exports.wordHasSubstring = function (string, substring) {
  let words = [];
  substring = substring.toLowerCase();
  let arr = string.toLowerCase().replaceAll(" ", ",").split(",");

  arr.filter((item) => {
    if (item.includes(substring)) {
      words.push(item);
    }
  });

  return words;
};

/* SORTED MATRIX SEARCH
Given an M x N matrix in which each row and each column is sorted in ascending order,
write a method to find an element.
If the element is found, prints its position and returns true, otherwise prints
"element not found" and returns false */
exports.findElement = (matrix, el) => {
  for (
    let row = 0, col = matrix.length - 1;
    row < matrix.length && col >= 0;

  ) {
    if (matrix[row][col] === el) return [[row, col], true];
    if (matrix[row][col] < el) row++;
    if (matrix[row][col] > el) col--;
  }
  return ["element not found", false];

  //return -1;
};

// WORD WEIGHT
exports.wordWeight = function (s, n) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let weight = "";
  let sum1 = 0;
  let sum2 = 0;
  s = s.toLowerCase();

  for (var i = 0; i < s.length; i++) {
    weight += alphabet.indexOf(s[i]) + 1;
  }

  // Step1: n = 1;
  if (n === 1) {
    weight.split("").forEach((item) => {
      sum1 += +item;
    });
    return sum1;
  }

  // Step2: n = 2;
  if (n === 2) {
    weight.split("").forEach((item) => {
      sum1 += +item;
    });
    sum1 = sum1
      .toString()
      .split("")
      .forEach((item) => {
        sum2 += +item;
      });
    return sum2;
  }

  return -1;
};

// APPLY SPELLING RULE TO FILTER() STRINGS -> cie
// // method 1:
// var spellingRule = function (words_array) {
//   function misspelled(word) {
//     if (word.indexOf("cie") > -1) {
//       return true;
//     }
//     return false;
//   }

//   return words_array.filter(misspelled);
// };

// method 2:
exports.spellingRule = function (words_array, str) {
  filtered_array = [];

  words_array.filter((item) => {
    if (item.includes(str)) {
      filtered_array.push(item);
    }
  });

  return filtered_array;
};

// SWAP UPPERCASE AND LOWERCASE LETTERS DURING TRAVERSING
exports.swapCase = function (str) {
  let new_array = [];

  for (var i = 0; i < str.length; i++) {
    if (str[i].includes(str.toLowerCase()[i]))
      new_array.push(str[i].toUpperCase());
    else new_array.push(str[i].toLowerCase());
  }

  return new_array.join("");
};

// SWITCH REVERSER
exports.switchReverser = function (a) {
  let alps = [];
  let nums = [];

  a.forEach((el) => {
    if (typeof el === "string") alps.push(el.toUpperCase());
    else nums.push(el);
  });

  if (alps.length === a.length) return alps;
  if (nums.length === a.length) return nums.reverse();
  return a;
};

// PIG LATIN CONVERTER
exports.pigLatinConverter = function (str) {
  str = str.toLowerCase();
  let start = str.match(/[aeiou]/gi);
  let end = str.indexOf(start[0]);

  if ("aeiou".includes(str[0])) return str + "way";
  else return str.substring(end) + str.substring(0, end) + "ay";
};

// ------------------------------------------------------------------------------------ //
/* STRING COMPRESSION: Implement a method to perform basic sing compression using the
counts of repeated characters. For example, the sing aabcccccaaa would become a2blc5a3.
If the "compressed" sing would not become smaller than the original sing, your method
should return the original sing.
You can assume the string has only uppercase and lowercase letters (a - z). */
exports.strCompression = (s) => {
  s = s.toLowerCase().replace(/[^A-Za-z]/g, "");
  let [compstr, count] = ["", 1];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      count++;
    } else {
      compstr = compstr + s[i] + count;
      count = 1;
    }
  }
  if (compstr.length < s.length) return compstr;
  return s;
};

// /* SORTED SEARCH, NO SIZE: You are given an array-like data structure Listy which lacks a
// size method. It does, however, have an elementAt (i) method that returns the element at
// index i in 0(1) time. If i is beyond the bounds of the data structure, it returns -1.
// (For this reason, the data structure only supports positive integers.) Given a Listy which
// contains sorted, positive integers, find the index at which an element x occurs.
// If x occurs multiple times, you may return any index. */

// /* MISSING INT: Given an input file with four billion non-negative integers, provide an
// algorithm to generate an integer that is not contained in the file. Assume you have 1 GB
// of memory available for this task.
// FOLLOW UP:
// What if you have only 1O MB of memory? Assume that all the values are distinct and we now
// have no more than one billion non-negative integers. */

// GROUP ANAGRAMS -> SORT AN ARRAY OF STRINGS SO THAT ALL THE ANAGRAMS ARE NEXT TO EACH OTHER
exports.groupAnagrams = function (nums) {
  let obj = [];
  nums.forEach((el) => {
    let chars = el.split("").sort();
    //
    if (obj[chars]) {
      return obj[chars].push(el);
    } else return (obj[chars] = [el]);
  });

  obj = Object.values(obj);

  return obj;

  // let anagrams = []; // for sorting anagrams
  // obj.filter((item) => {
  //   anagrams.push(item.sort());
  // });

  // return anagrams.sort();
};

/* ALTERNATING SEQUENCE -> Peaks and Valleys
In an array of integers, a "peak" is an element which is greater than or equal to the
adjacent integers and a "valley" is an element which is less than or equal to the adjacent
integers.
For example, in the array {5, 8, 6, 2, 3, 4, 6}, {8, 6} are peaks and {5, 2} are valleys.
Given an array of integers, sort the array into an alternating sequence of peaks and valleys.
EXAMPLE Input: {5, 3, 1, 2, 3} Output: {5, 1, 3, 2, 3} */
exports.peaksValleys = function (arr) {
  if (arr.length === 0) return -1;
  // sort the array
  arr.sort(function (a, b) {
    return a - b;
  });

  let new_arr = [];
  let [start, stop] = [0, arr.length - 1];

  while (start < stop) {
    new_arr.push(arr[stop--], arr[start++]);
  }

  // If array length is odd then print the last middle element.
  if (arr.length % 2 === 0) return new_arr;
  if (arr.length % 2 !== 0) return new_arr.concat(arr[start]);
};

// // COUNT VOWELS AND CONSONANTS
// var countVowelsConsonants = function (string) {
//   let vowels = [];
//   let consonants = [];

//   // transform string and transverse
//   string = string.replace(/[^A-Za-z]/g, "").toLowerCase();

//   for (var char of string) {
//     if ("aeiou".includes(char)) vowels.push(char);
//     else consonants.push(char);
//   }

//   let vowelCount = vowels.length;
//   let consonantCount = consonants.length;
//   if (vowels.length > 0 || consonants.length > 0) {
//     return { vowelCount, consonantCount };
//   }
//   return -1;
// };
// // invoke the function
// console.log(
//   countVowelsConsonants("The quick brown fox jumps over the lazy dog")
// ); // { vowelCount: 11, consonantCount: 24 }

// // WORDS WITH MORE THAN ONE VOWEL
// var countVowels = function (string) {
//   let vowelWords = [];
//   let consonantWords = [];

//   string = string.replaceAll(" ", ",").split(",");
//   string.filter((el) => {
//     if (
//       el.includes("a") ||
//       el.includes("e") ||
//       el.includes("i") ||
//       el.includes("o") ||
//       el.includes("u")
//     )
//       vowelWords.push(el);
//     else consonantWords.push(el);
//   });

//   return consonantWords;
// };
// // invoke the function
// console.log(countVowels("The quick pqzx brown fox jumps over the lazy dog")); // pqzx

// ------------------------------------------------------------------------------------ //
// RETURN AN ARRAY OF EVEN SQUARE IN THE RANGE
exports.even_squares = function (start, end) {
  let evensq = [];

  for (start; start <= end; start++) {
    if (start % 2 === 0) evensq.push(start * start);
  }
  return evensq;
};

// RETURN AN ARRAY OF FIRST AND LAST CHARACTER OF EACH WORD
exports.firstLastCharacter = function (words_array) {
  let res = [];
  words_array.filter((item) => {
    res.push(item[0] + item[item.length - 1]);
  });

  return res;
};

// IS MULTIPLE
exports.fizzBuzz = function (num) {
  // check if the number is a multiple of 3 and 5
  if (num % 3 === 0 && num % 5 === 0) return "fizzbuzz";

  // check if the number is a multiple of 3
  if (num % 3 === 0) return "fizz";

  // check if the number is a multiple of 5
  if (num % 5 === 0) return "buzz";

  return num;
};

// IS ADDITIVE SEQUENCE / FIBONACCI SERIES
exports.isFibonacciSeries = function (arr) {
  // sort the array and
  // check if every element is equal to the sum of the previous 2 elements
  arr.sort(function (e1, e2) {
    return e1 - e2;
  });

  for (i = 2; i < arr.length; i++) {
    if (arr[i - 1] + arr[i - 2] != arr[i]) return false;
  }
  return true;
};

// IS PRIME NUMBER
exports.isPrimeNumber = function (num) {
  if (num < 2) return false;
  for (i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) return false;
  }
  return true;
};