import React, { useEffect, useMemo } from 'react'
import { BufferAttribute, ShaderMaterial, sRGBEncoding } from 'three'
import { vertexShader } from './Shaders.js/vertex'
import { fragmentShader } from './Shaders.js/fragment'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Vector3 } from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import { ExtendedMaterial } from "three-extended-material"
import { MeshStandardMaterial } from 'three'


export default function ThanosSnap() {
  const { scene } = useGLTF('/model/model.glb')
  const [color, normal] = useTexture(['/model/color.jpg', '/model/normal.jpg'])
  color.encoding = sRGBEncoding

  const { progress } = useControls({
    progress: { value: 1, min: 0, max: 1, step: 0.001 }
  })

  const geometry = useMemo(() => scene.children[0].geometry.toNonIndexed(), [scene.children])

  const material = new ExtendedMaterial(
    MeshStandardMaterial,
    {
      uniforms: {
        progress,
      },
      vertexShader: (shader) => shader = vertexShader,
    },
    {
      map: color,
      normalMap: normal,
    }
  )

  useEffect(() => {
    const pos = geometry.attributes.position
    const random = new BufferAttribute(new Float32Array(pos.count), 1)
    const centers = new BufferAttribute(new Float32Array(pos.count * 3), 3)

    for (let i = 0; i < pos.count; i += 3) {
      let r = Math.random()
      random.setX(i, r)
      random.setY(i, r)
      random.setZ(i, r)

      let x = pos.array[i * 3]
      let y = pos.array[i * 3 + 1]
      let z = pos.array[i * 3 + 2]

      let x1 = pos.array[i * 3 + 3]
      let y1 = pos.array[i * 3 + 4]
      let z1 = pos.array[i * 3 + 5]

      let x2 = pos.array[i * 3 + 6]
      let y2 = pos.array[i * 3 + 7]
      let z2 = pos.array[i * 3 + 8]

      let center = new Vector3(x, y, z).add(new Vector3(x1, y1, z1)).add(new Vector3(x2, y2, z2)).divideScalar(3)

      centers.set([center.x, center.y, center.z], i * 3)
      centers.set([center.x, center.y, center.z], (i + 1) * 3)
      centers.set([center.x, center.y, center.z], (i + 2) * 3)
    }

    geometry.setAttribute('randomness', random)
    geometry.setAttribute('center', centers)
  }, [geometry])

  useFrame(({ clock }) => {
    // material.uniforms.time.value = clock.elapsedTime
  })

  return (
    <>
      <mesh geometry={geometry} material={material} />
    </>
  )
}
