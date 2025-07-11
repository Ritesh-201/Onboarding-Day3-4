
function displayOutput(message) {
  document.getElementById("result").innerHTML += `<p>${message}</p>`;
}

// Utility Library
const utils = {
  // 1. Debounce: Delay function execution until 'delay' ms after last call
 debounce: (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId); // Cancel previous timeout
    timeoutId = setTimeout(() => func(...args), delay); // Set new timeout
  };
},

  // 2. Throttle: Limit function to run once every 'limit' ms
 throttle: (func, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
},

  // 3. Deep Merge: Recursively merge multiple objects
 deepMerge: (...objects) => {
  const isObject = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
  return objects.reduce((acc, obj) => {
    if (!isObject(obj)) return acc;
    Object.keys(obj).forEach((key) => {
      if (isObject(acc[key]) && isObject(obj[key])) {
        acc[key] = utils.deepMerge(acc[key], obj[key]); // Recurse for nested objects
      } else {
        acc[key] = obj[key]; // Overwrite or set value
      }
    });
    return acc;
  }, {});
},

 isArray: (value) => Array.isArray(value),
isObject: (value) => value && typeof value === "object" && !Array.isArray(value),
isString: (value) => typeof value === "string",
isNumber: (value) => typeof value === "number" && !isNaN(value),
isFunction: (value) => typeof value === "function",
};

// Add test code here (see Testing section below)