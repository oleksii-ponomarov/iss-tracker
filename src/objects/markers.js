import * as THREE from "three";

import { convertLatLongToXYZ } from "../utils";
import earth from "./earth";
import { greenwich, kyiv, newYork } from "../data";
import { sunLong } from "./light";

const greenwichPosition = convertLatLongToXYZ(
  earth.geometry.parameters.radius,
  greenwich.lat,
  greenwich.long
);

const markerGeometry = new THREE.SphereGeometry(0.08, 30, 30);
const markerMaterial = new THREE.MeshBasicMaterial({ color: "#FF0000" });

const greenwichMarker = new THREE.Mesh(markerGeometry, markerMaterial);
greenwichMarker.position.x = greenwichPosition.x;
greenwichMarker.position.y = greenwichPosition.y;
greenwichMarker.position.z = greenwichPosition.z;

const kyivPosition = convertLatLongToXYZ(
  earth.geometry.parameters.radius,
  kyiv.lat,
  kyiv.long
);

const kyivMarker = new THREE.Mesh(markerGeometry, markerMaterial);
kyivMarker.position.x = kyivPosition.x;
kyivMarker.position.y = kyivPosition.y;
kyivMarker.position.z = kyivPosition.z;

const newYorkPosition = convertLatLongToXYZ(
  earth.geometry.parameters.radius,
  newYork.lat,
  newYork.long
);

const newYorkMarker = new THREE.Mesh(markerGeometry, markerMaterial);
newYorkMarker.position.x = newYorkPosition.x;
newYorkMarker.position.y = newYorkPosition.y;
newYorkMarker.position.z = newYorkPosition.z;

const sunMarker = new THREE.Mesh(markerGeometry, markerMaterial);
const sunMarkerPosition = convertLatLongToXYZ(10, 0, sunLong);
sunMarker.position.x = sunMarkerPosition.x;
sunMarker.position.y = sunMarkerPosition.y;
sunMarker.position.z = sunMarkerPosition.z;

export default [
  // greenwichMarker,
  // kyivMarker,
  // newYorkMarker,
  // sunMarker,
];
