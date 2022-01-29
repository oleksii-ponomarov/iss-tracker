import * as THREE from "three";

import { textureLoader } from "../loading/manager";

const starsTexture = textureLoader.load("./textures/earth/stars.jpg");

const starsGeometry = new THREE.SphereGeometry(4000, 30, 30);
const starsMaterial = new THREE.MeshBasicMaterial({
  map: starsTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5,
});
const stars = new THREE.Mesh(starsGeometry, starsMaterial);

export default stars;
