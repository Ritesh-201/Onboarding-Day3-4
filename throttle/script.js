
function displayOutput(message) {
  document.getElementById("result").textContent = message;
}

function throttle(func, limit) {
  let lastCall = 0; 
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now; 
      func.apply(this, args); 
    }
  };
}

const handleScroll = () => {
  const scrollPosition = document.getElementById("scroll-area").scrollTop;
  const message = `Scroll position: ${scrollPosition}px`;
  console.log(message);
  displayOutput(message);
};

const throttledScroll = throttle(handleScroll, 200);

document.getElementById("scroll-area").addEventListener("scroll", throttledScroll);