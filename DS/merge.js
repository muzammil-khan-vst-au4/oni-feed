//using ES6 spread operator
const mergeArray = (array1, array2) => {
  return [...array1, ...array2].sort((a, b) => a - b);
};

//time complexity
/* 
    the spread operator will iterate all the elements so that is O(n) and sort function runs in O(n log n)
    that makes the overall complexity O(nlogn)
*/

//space complexity - O(1) -> constant
