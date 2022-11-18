import { Text } from '@react-three/drei'
import React from 'react'
import ShaderMaterial from '../CurlNoise/Material/ShaderMaterial'
import './components.css'
import font from './font.ttf'
import { Color } from 'three'
import { useFrame } from '@react-three/fiber'

function Components() {
  const shaderMaterial = new ShaderMaterial(new Color('white').multiplyScalar(0.02))

  useFrame(({ get }) => {
    shaderMaterial.uniforms.mPos.value = get().point
  })
  
  return (
    <>
      <Text fontSize={1} position={[-1.5, 0, 0]} font={font} htmlFor="">PRAVEEN DAS</Text>
    </>
  )
}

export default Components