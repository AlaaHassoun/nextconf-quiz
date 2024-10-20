import React from "react"
import { Canvas } from "@react-three/fiber";
import Lights from "../lights/Lights";

const CanvasWrapper = ({ children }) => {
  return (
    <>
      <div className="footer__credits">
        Crafted with passion by <a className="footer__link" href="https://www.alaahassoun.com/" target="_blank" rel="noreferrer">AHDC</a> © 2024
      </div>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{
          position: [0, 9, 3],
          fov: 75,
          near: 0.1,
          far: 100
        }}
      >
        <Lights/>
        {children}
      </Canvas>
    </>
  )
}

export default CanvasWrapper;