
function displayOutput(message) {
  document.getElementById("result").innerHTML += `<p>${message}</p>`;
}

const originalObj = {
  name: "Alice",
  age: 25,
  details: {
    hobbies: ["reading", "gaming"],
    address: { city: "Wonderland" }
  }
};

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const clone = {};
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key]); 
  }
  return clone;
}

document.getElementById("clone-button").addEventListener("click", () => {

  const clone = deepClone(originalObj);
  
  clone.age = 30;
  clone.details.hobbies.push("coding");
  clone.details.address.city = "Narnia";

  displayOutput(`Original: ${JSON.stringify(originalObj, null, 2)}`);
  displayOutput(`Clone: ${JSON.stringify(clone, null, 2)}`);
  console.log("Original:", originalObj);
  console.log("Clone:", clone);
});
