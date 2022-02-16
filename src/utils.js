import * as THREE from "three";

export function convertLatLongToXYZ(radius, lat, long) {
  const spherical = new THREE.Spherical(
    radius,
    ((90 - lat) * Math.PI) / 180,
    ((90 + long) * Math.PI) / 180
  );

  return new THREE.Vector3().setFromSpherical(spherical);
}

export function getDay(date) {
  try {
    if (date && isNaN(date.getTime())) {
      throw new Error("invalid date");
    }

    const start = new Date(
      date ? date.getFullYear() : new Date().getFullYear(),
      0
    ).getTime();
    const now = date ? date.getTime() : Date.now();
    return Math.floor((now - start) / 1000 / 60 / 60 / 24);
  } catch (err) {
    console.error(err);
  }
}

export function getDaysInYear(date) {
  try {
    if (date && isNaN(date.getTime())) {
      throw new Error("invalid date");
    }
    
    const februaryLastDate = new Date(
      date ? date.getFullYear() : new Date().getFullYear(),
      2,
      0
    ).getDate();
    return februaryLastDate === 29 ? 366 : 365;
  } catch (err) {
    console.error(err);
  }
}
