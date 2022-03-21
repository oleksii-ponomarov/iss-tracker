import * as THREE from "three";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";

import { textureLoader } from "../loading/manager";
import { convertLatLongToXYZ, getDay, getDaysInYear } from "../utils";

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

const sun = new THREE.PointLight(0xffffff, 1);
const lensTexture = textureLoader.load("./textures/flare.png");
const lensflare = new Lensflare();
lensflare.addElement(new LensflareElement(lensTexture, 512, 0));
sun.add(lensflare);

export function getSunLong() {
  const tzOffset = new Date().getTimezoneOffset() / 60;
  const greenwitchHours =
    new Date().getHours() + new Date().getMinutes() / 60 + tzOffset;
  return (12 - greenwitchHours) * 15;
}

export function getSunLat() {
  const day = getDay();
  const axialTilt = 23.5;
  const dayRad = (2 * Math.PI) / getDaysInYear();
  const sunLat = axialTilt * Math.sin(dayRad * day - Math.PI / 2 + 10 * dayRad);
  return sunLat;
}

export function updateSunPosition() {
  const sunLong = getSunLong();
  const sunLat = getSunLat();
  const sunPosition = convertLatLongToXYZ(1000, sunLat, sunLong);
  sun.position.x = sunPosition.x;
  sun.position.y = sunPosition.y;
  sun.position.z = sunPosition.z;
}

updateSunPosition();

export { ambientLight, sun };
