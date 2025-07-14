// Array utility methods
export const arrayUtils = {
  // Map: Transform each element (multiply by 2)
  map: (array) => array.map(x => x * 2),
  
  // Filter: Keep only even numbers
  filter: (array) => array.filter(x => x % 2 === 0),
  
  // Reduce: Sum all elements
  reduce: (array) => array.reduce((sum, x) => sum + x, 0),
  
  // Flatten: Flatten nested arrays
  flatten: function(array) {
    return array.reduce((acc, val) => 
      Array.isArray(val) ? 
        acc.concat(this.flatten(val)) : 
        acc.concat(val), []);
  },
  
  // Unique: Remove duplicate elements
  unique: (array) => [...new Set(array)]
};