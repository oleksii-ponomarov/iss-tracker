export const loading = document.createElement("div");
const loadingText = document.createElement("p");
const loadingProgress = document.createElement("div");
export const loadingBar = document.createElement("div");

function initializeLoading() {
  loading.classList.add("loading");
  loadingText.textContent = "Loading...";
  loading.appendChild(loadingText);
  loadingProgress.classList.add("loading-progress");
  loadingBar.classList.add("loading-bar");
  loadingProgress.appendChild(loadingBar);
  loading.appendChild(loadingProgress);
}

export default initializeLoading;
