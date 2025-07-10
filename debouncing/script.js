// debounce to bs delay krta h func call ko 
function debounce(func, delay) {
  let timeoutId; 
  return function (...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

//now to search for a query, we will use the debounced function
function search(query) {
  const resultDiv = document.querySelector("#result");
  resultDiv.textContent = query ? `Searching for: ${query}` : "No query entered";
}

const debouncedSearch = debounce(search, 400);

document.querySelector("#search-input").addEventListener("input", (e) => {
  debouncedSearch(e.target.value); 
});