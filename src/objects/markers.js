import * as THREE from "three";

import { convertLatLongToXYZ } from "../utils";
import { getSunLong, getSunLat } from "./light";

const sunMarker = new THREE.Mesh(markerGeometry, markerMaterial);
const sunMarkerPosition = convertLatLongToXYZ(10, getSunLat(), getSunLong());
sunMarker.position.x = sunMarkerPosition.x;
sunMarker.position.y = sunMarkerPosition.y;
sunMarker.position.z = sunMarkerPosition.z;

export default [
  // greenwichMarker,
  // kyivMarker,
  // newYorkMarker,
  // sunMarker,
];
