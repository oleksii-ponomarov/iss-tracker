import * as THREE from "three";

import { loading, loadingBar } from "./status";

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  document.body.appendChild(loading);
};

loadingManager.onProgress = (fileName, index, total) => {
  loadingBar.style.width = (index / total) * 100 + "%";
};

loadingManager.onError = () => {
  console.log("error while loading file");
};

export function onLoad() {
  loading.remove();
}

export const textureLoader = new THREE.TextureLoader(loadingManager);

export default loadingManager;
