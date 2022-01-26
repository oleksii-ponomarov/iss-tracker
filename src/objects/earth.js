import * as THREE from "three";

import { textureLoader } from "../loading/manager";

const earthColorTexture = textureLoader.load("./textures/earth/color.jpg");
const earthCloudsAlphaTexture = textureLoader.load(
  "./textures/earth/clouds.jpg"
);
const earthCloudsTexture = textureLoader.load(
  "./textures/earth/testClouds.jpg"
);

const earthGeometry = new THREE.SphereGeometry(10, 60, 60);
const earthMaterial = new THREE.MeshBasicMaterial({
  map: earthColorTexture,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const earthCloudsGeometry = new THREE.SphereGeometry(10.1, 60, 60);
const earthCloudsMaterial = new THREE.MeshBasicMaterial({
  map: earthCloudsTexture,
  alphaMap: earthCloudsAlphaTexture,
  transparent: true,
  side: THREE.DoubleSide,
  opacity: 0.3
});
export const clouds = new THREE.Mesh(earthCloudsGeometry, earthCloudsMaterial);

export default earth;
