import { useRef, useMemo } from "react";
import { Raycaster } from "three";
import { useFrame } from '@react-three/fiber'
import { Vector3 } from "three";
import shaderMaterial from './CurlNoise/Material/ShaderMaterial'
import { Color } from "three";
import Components from "./Section/Components";

export function World() {
  const pointer = useRef()
  const spotLight = useRef()
  const plane = useRef()

  const raycaster = new Raycaster()
  const eMouse = new Vector3(0, 0, 0)
  const eMouseVel = new Vector3(0, 0, 0)
  // const shaderMaterial = new ShaderMaterial(new Color('red'))

  useFrame(({ mouse, camera, set }) => {
    raycaster.setFromCamera(mouse, camera)
    const intersect = raycaster.intersectObject(plane.current, false)
    const point = intersect[0]?.point

    if (!point) return
    point.sub(eMouse).multiplyScalar(.15)
    eMouseVel.add(point)
    eMouseVel.multiplyScalar(0.8)
    eMouse.add(eMouseVel)

    shaderMaterial.uniforms.mPos.value = eMouse
    pointer.current.position.set(eMouse.x, eMouse.y, eMouse.z)
    spotLight.current.position.set(eMouse.x, eMouse.y, 1)
    set({ point: eMouse })
  })
  
  return (
    <>
      <pointLight distance={3} ref={spotLight} />
      <mesh ref={plane} material={shaderMaterial} >
        <planeGeometry args={[1000, 1000]} />
      </mesh>
      <mesh ref={pointer}>
        <meshBasicMaterial color={'yellow'} />
        <sphereGeometry args={[0.03]} />
      </mesh>
      <mesh position={[1.5, 0, 0.25]} material={shaderMaterial}>
        <torusKnotGeometry args={[0.7, 0.2, 100, 100]} />
      </mesh>
      {/* <Components pointer={pointer.current?.position} /> */}
    </>
  );
}
