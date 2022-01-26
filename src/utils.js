import * as THREE from "three";

export function convertLatLongToXYZ(radius, lat, long) {
  const spherical = new THREE.Spherical(
    radius,
    ((90 - lat) * Math.PI) / 180,
    ((90 + long) * Math.PI) / 180
  );

  return new THREE.Vector3().setFromSpherical(spherical);
}
