import { Vector3 } from 'three';
import { curl } from './curlNoise';

export function generatePath(initPos, t) {
    const curves = [];
    const scale = 10

    for (let i = 0; i < t; i++) {
        initPos.addScaledVector(curl(initPos.x / scale, initPos.y / scale, initPos.z / scale), 0.0005)
        curves.push(new Vector3().copy(initPos));
    }

    return curves;
}
