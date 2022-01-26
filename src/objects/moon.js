import * as THREE from "three";

import { textureLoader } from "../loading/manager";

const moonTexture = textureLoader.load("./textures/earth/moon.jpg");
const moonGeometry = new THREE.SphereGeometry(1, 60, 60);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = 20;

export default moon;