import * as THREE from "three";

import { convertLatLongToXYZ } from "../utils";

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
const sun = new THREE.PointLight(0xffffff, 1);

const tzOffset = new Date().getTimezoneOffset() / 60;
const greenwitchHours =
  new Date().getHours() + new Date().getMinutes() / 60 + tzOffset;
export const sunLong = (12 - greenwitchHours) * 15;
const sunPosition = convertLatLongToXYZ(300, 0, sunLong);
sun.position.x = sunPosition.x;
sun.position.y = sunPosition.y;
sun.position.z = sunPosition.z;

export { ambientLight, sun };
