
function displayOutput(message) {
  document.getElementById("result").innerHTML += `<p>${message}</p>`;
}

function curry(func) {
  return function curried(...args) {
    
    if (args.length >= func.length) {
      return func(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

function formatString(prefix, name, suffix) {
  return `${prefix} ${name} ${suffix}`;
}
const curriedFormat = curry(formatString);

function transformData(multiplier, offset, value) {
  return multiplier * value + offset;
}
const curriedTransform = curry(transformData);

document.getElementById("format-name").addEventListener("click", () => {
  const formatted = curriedFormat("Mr.")("Alice")("Smith");
  console.log(formatted);
  displayOutput(`Formatted: ${formatted}`);
});

document.getElementById("transform-data").addEventListener("click", () => {
  const transformed = curriedTransform(2)(5)(10); 
  console.log(transformed);
  displayOutput(`Transformed: ${transformed}`);
});

const curriedAdd = curry((a, b, c) => a + b + c);
console.log(curriedAdd(1)(2)(3)); 
console.log(curriedAdd(1, 2)(3)); 