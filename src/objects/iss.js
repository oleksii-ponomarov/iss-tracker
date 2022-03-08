import * as THREE from "three";

import { convertLatLongToXYZ } from "../utils";
import earth from "./earth";
import { textureLoader } from "../loading/manager";

const issApi = "https://api.wheretheiss.at/v1/satellites/25544";

const issColorTexture = textureLoader.load("/textures/iss/color.png");
const issAlphaTexture = textureLoader.load("/textures/iss/alpha.png");

const issGeometry = new THREE.BufferGeometry();
const points = new Float32Array([0, 0, 0]);
issGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
const issMaterial = new THREE.PointsMaterial({
  size: 50,
  sizeAttenuation: false,
  color: issColorTexture,
  alphaMap: issAlphaTexture,
  color: 0x00ff00,
  transparent: true,
});
issMaterial.depthWrite = false;
const iss = new THREE.Points(issGeometry, issMaterial);

export async function updateIssPosition() {
  try {
    const response = await fetch(issApi);
    const { latitude, longitude } = await response.json();
    const position = convertLatLongToXYZ(
      earth.geometry.parameters.radius + 0.3,
      Number(latitude),
      Number(longitude)
    );
    iss.position.x = position.x;
    iss.position.y = position.y;
    iss.position.z = position.z;
    return { position, coordinates: { latitude, longitude } };
  } catch (e) {
    console.log(e);
  }
}

export default iss;
