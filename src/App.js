import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import { World } from './Threejs/World';
import Components from './Threejs/Section/Components';
import { Effects, OrbitControls } from '@react-three/drei';
import { EffectComposer } from "@react-three/postprocessing"
import ThanosSnap from './Threejs/ThanosSnap/ThanosSnap';

function App() {
  const container = useRef()

  return (
    <div id="content-container" ref={container}>
      <div id="r3f">
        <Canvas
          // shadows
          // flat
          // linear
          // style={{ pointerEvents: 'none' }}
          // eventSource={container}
          // eventPrefix="page"
          camera={{ position: [0, 2, 8], fov: 30 }}
        >
          <ambientLight intensity={0.05} />
          <pointLight intensity={0.5} position={[5, 0, 5]} />
          <pointLight intensity={0.5} position={[0, 0, 5]} />
          <World />
          {/* <Components /> */}
          {/* <ThanosSnap /> */}
          <OrbitControls />
        </Canvas>
      </div>
    </div>

  );
}

export default App;


