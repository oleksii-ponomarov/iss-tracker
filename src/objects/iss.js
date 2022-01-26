import * as THREE from "three";

import { convertLatLongToXYZ } from "../utils";
import earth from "./earth";

const issApi = "https://api.wheretheiss.at/v1/satellites/25544";

const issGeometry = new THREE.SphereGeometry(0.25, 30, 30);
const issMaterial = new THREE.MeshBasicMaterial({ color: "#00FF00" });
const iss = new THREE.Mesh(issGeometry, issMaterial);

export async function updateIssPosition() {
  try {
    const response = await fetch(issApi);
    const { latitude, longitude } = await response.json();
    const position = convertLatLongToXYZ(
      earth.geometry.parameters.radius,
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
