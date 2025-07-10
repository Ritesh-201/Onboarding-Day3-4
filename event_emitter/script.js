
function displayOutput(message) {
  document.getElementById("result").innerHTML += `<p>${message}</p>`;
}

class CustomEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  emit(eventName, ...args) {
    
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).forEach(callback => {
        callback(...args);
      });
    }
  }

  off(eventName, callback) {
    // Remove specific callback from the event's listener array
    if (this.listeners.has(eventName)) {
      const callbacks = this.listeners.get(eventName);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
      if (callbacks.length === 0) {
        this.listeners.delete(eventName);
      }
    }
  }
}

const emitter = new CustomEventEmitter();

const userUpdateHandler = data => {
  const message = `User updated: ${data.name}`;
  console.log(message);
  displayOutput(message);
};
emitter.on("userUpdated", userUpdateHandler);

emitter.on("postAdded", content => {
  const message = `Post added: ${content}`;
  console.log(message);
  displayOutput(message);
});

document.getElementById("update-user").addEventListener("click", () => {
  emitter.emit("userUpdated", { name: "Alice" });
});

document.getElementById("add-post").addEventListener("click", () => {
  emitter.emit("postAdded", "Hello, world!");
});

setTimeout(() => {
  emitter.off("userUpdated", userUpdateHandler);
  displayOutput("Removed userUpdated listener. Try clicking 'Update User' again.");
}, 5000);