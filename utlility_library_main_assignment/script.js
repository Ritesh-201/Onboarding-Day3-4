
function displayOutput(message) {
  document.getElementById("result").innerHTML += `<p>${message}</p>`;
}

// Utility Library
const utils = {

 debounce: (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId); 
    timeoutId = setTimeout(() => func(...args), delay);
  };
},

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

 deepMerge: (...objects) => {
  const isObject = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
  return objects.reduce((acc, obj) => {
    if (!isObject(obj)) return acc;
    Object.keys(obj).forEach((key) => {
      if (isObject(acc[key]) && isObject(obj[key])) {
        acc[key] = utils.deepMerge(acc[key], obj[key]); 
      } else {
        acc[key] = obj[key]; 
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
