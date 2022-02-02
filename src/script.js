import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { convertLatLongToXYZ } from "./utils";
import loadingManager, { onLoad } from "./loading/manager";
import initializeLoading from "./loading/status";
import earth, { clouds } from "./objects/earth";
import stars from "./objects/stars";
import markers from "./objects/markers";
import iss, { updateIssPosition } from "./objects/iss";

initializeLoading();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

scene.add(stars);

setInterval(updateIssPosition, 5000);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  5000
);

scene.add(camera);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

loadingManager.onLoad = async () => {
  const { coordinates } = await updateIssPosition();
  onLoad();
  if (coordinates?.latitude || coordinates?.longitude) {
    const cameraPosition = convertLatLongToXYZ(
      40,
      coordinates.latitude > 0
        ? Math.min(coordinates.latitude, 20)
        : Math.max(coordinates.latitude, -20),
      coordinates.longitude
    );
    camera.position.x = cameraPosition.x;
    camera.position.y = cameraPosition.y;
    camera.position.z = cameraPosition.z;
    controls.update();
    distance = Math.round(controls.getDistance());
  }

  scene.add(earth, clouds, iss);
  for (const marker of markers) {
    scene.add(marker);
  }
};

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 15;
controls.maxDistance = 80;

let distance = Math.round(controls.getDistance());

function onControlsChange(e) {
  if (distance === Math.round(this.getDistance())) return;
  for (const marker of [...markers, iss]) {
    marker.scale.x = 0.03 * this.getDistance();
    marker.scale.y = 0.03 * this.getDistance();
    marker.scale.z = 0.03 * this.getDistance();
    distance = Math.round(controls.getDistance());
  }
}

controls.addEventListener("change", onControlsChange);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  for (const marker of [...markers, iss]) {
    marker.scale.x += 0.01 * Math.sin(elapsedTime * 2);
    marker.scale.y += 0.01 * Math.sin(elapsedTime * 2);
    marker.scale.z += 0.01 * Math.sin(elapsedTime * 2);
  }
  //   earth.rotation.y = (elapsedTime * 0.4) % (2 * Math.PI);
  //   clouds.rotation.y = (elapsedTime * 0.4) % (2 * Math.PI);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
