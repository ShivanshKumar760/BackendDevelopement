function setupEventHandlers() {
  document.getElementById("btn").onclick = function () {
    console.log("Clicked");
  };
}

// Risk: might be called multiple times accidentally
setupEventHandlers();
setupEventHandlers(); // Oops! Sets up handlers twice

(function () {
  document.getElementById("btn").onclick = function () {
    console.log("Clicked");
  };
})(); // Runs exactly once, can't be called again
