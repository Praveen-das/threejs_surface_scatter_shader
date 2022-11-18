import React, { useEffect } from 'react'
import { TubeGeometry, CatmullRomCurve3, Vector3, Mesh } from 'three';
import { generatePath } from '../../Utils/generatePath'
import { useFrame, useThree } from '@react-three/fiber'
import shaderMaterial from './Material/ShaderMaterial'

function Curves() {
    const { scene } = useThree()

    useFrame(({ clock }) => {
        const time = clock.elapsedTime
        shaderMaterial.uniforms.time.value = time
    })
    
    useEffect(() => {
        for (let i = 0; i < 100; i++) {
            const initPos = new Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            )

            const path = generatePath(initPos, 2000)
            const curve = new CatmullRomCurve3(path)
            const geometry = new TubeGeometry(curve, 100, 0.05, 20, false);

            scene.add(new Mesh(geometry, shaderMaterial))
        }
    }, [scene])

    return (
        <>
        </>
    )
}

export default Curves