import * as THREE from "three";

import { textureLoader } from "../loading/manager";

const earthColorTexture = textureLoader.load("./textures/earth/color.jpg");
const earthMetalnessTexture = textureLoader.load("./textures/earth/specular.jpg");
const earthNormalTexture = textureLoader.load("./textures/earth/normal.jpg");
const earthCloudsAlphaTexture = textureLoader.load(
  "./textures/earth/clouds.jpg"
);
const earthCloudsTexture = textureLoader.load(
  "./textures/earth/testClouds.jpg"
);
// earthCloudsAlphaTexture.magFilter = THREE.NearestFilter;

const earthGeometry = new THREE.SphereGeometry(10, 60, 60);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthColorTexture
});
earthMaterial.metalnessMap = earthMetalnessTexture;
earthMaterial.normalMap = earthNormalTexture;
earthMaterial.metalness = 0.4;
earthMaterial.roughness = 0.55;

const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const earthCloudsGeometry = new THREE.SphereGeometry(10.1, 60, 60);
const earthCloudsMaterial = new THREE.MeshStandardMaterial({
  map: earthCloudsTexture,
  alphaMap: earthCloudsAlphaTexture,
  transparent: true,
  side: THREE.DoubleSide,
  opacity: 0.3,
  depthWrite: false
});
export const clouds = new THREE.Mesh(earthCloudsGeometry, earthCloudsMaterial);

export default earth;
