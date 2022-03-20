import * as THREE from "three";
import { getLatLngObj, getGroundTracks } from "tle.js";

import { convertLatLongToXYZ } from "../utils";
import earth from "./earth";
import { textureLoader } from "../loading/manager";

const issApi = "https://api.wheretheiss.at/v1/satellites/25544";
const issTleApi =
  "https://api.wheretheiss.at/v1/satellites/25544/tles?format=text";
const issOrbitHeight = earth.geometry.parameters.radius + 0.3;

const issColorTexture = textureLoader.load("./textures/iss/color.png");
const issAlphaTexture = textureLoader.load("./textures/iss/alpha.png");

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

export async function getIssOrbit() {
  const response = await fetch(issTleApi);

  if (!response.ok) {
    return;
  }

  const tle = await response.text();
  const orbitTracks = await getGroundTracks({
    tle,
    stepMS: 60 * 1000,
    isLngLatFormat: false,
  });
  // this method returns an array of three orbits: [0] - previous, [1] - current and [2] - next
  const currentOrbitTrack = orbitTracks[1];
  const currentOrbitPoints = currentOrbitTrack.map(([lat, long]) =>
    convertLatLongToXYZ(issOrbitHeight, lat, long)
  );
  return currentOrbitPoints;
}

export function plotIssOrbit(points) {
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const orbit = new THREE.Line(
    orbitGeometry,
    new THREE.LineBasicMaterial({ color: 0x008800, linewidth: 3 })
  );
  orbit.name = "orbit";
  return orbit;
}

export async function updateIssPosition() {
  try {
    const response = await fetch(issApi);

    if (!response.ok) {
      return;
    }

    const { latitude, longitude } = await response.json();
    const position = convertLatLongToXYZ(
      issOrbitHeight,
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
