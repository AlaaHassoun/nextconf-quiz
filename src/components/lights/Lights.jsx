import React from "react";

const Lights = () => {
  return (
    <group>
      <ambientLight intensity={0.01} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
        shadow-camera-near={0.5}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
    </group>
  )
}

export default Lights;