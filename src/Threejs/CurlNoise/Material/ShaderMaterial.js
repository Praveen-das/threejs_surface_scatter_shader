import { DoubleSide } from "three";
import { vertexShader } from '../Shaders/vertexShader'
import { fragmentShader } from '../Shaders/fragmentShader'
import { ShaderMaterial } from "three";
import { Color } from "three";
import { useControls } from 'leva'
import { Vector3 } from "three";



export default new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        time: { value: 0 },
        mPos: { value: 0 },
        color: { value: new Color('red') }
    },
    side: DoubleSide,
    transparent: true
})
