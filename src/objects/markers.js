import * as THREE from "three";

import { convertLatLongToXYZ } from "../utils";
import { getSunLong, getSunLat } from "./light";
import { earthRadius } from "./earth";
import { textureLoader } from "../loading/manager";

const markerTexture = textureLoader.load("./textures/marker.png");

const markerGeometry = new THREE.SphereGeometry(0.08, 30, 30);
const markerMaterial = new THREE.MeshBasicMaterial({ color: "#FF0000" });

const sunMarker = new THREE.Mesh(markerGeometry, markerMaterial);
const sunMarkerPosition = convertLatLongToXYZ(10, getSunLat(), getSunLong());
sunMarker.position.x = sunMarkerPosition.x;
sunMarker.position.y = sunMarkerPosition.y;
sunMarker.position.z = sunMarkerPosition.z;

export function makeMarker(position) {
  const markerHeight = 1;
  const marker = new THREE.Group();

  const markerColumn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, markerHeight, 16, 16),
    markerMaterial
  );
  markerColumn.rotation.x = Math.PI / 2;
  const markerSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    markerMaterial
  );
  markerSphere.position.z = -markerHeight;

  const { x, y, z } = convertLatLongToXYZ(
    earthRadius + markerHeight / 2,
    position.latitude,
    position.longitude
  );
  marker.position.set(x, y, z);
  marker.lookAt(0, 0, 0);

  marker.add(markerColumn, markerSphere);

  return marker;
}

export default [
  // greenwichMarker,
  // kyivMarker,
  // newYorkMarker,
  // sunMarker,
];
