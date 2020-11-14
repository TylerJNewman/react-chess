import React, {useState} from "react";
import "./styles.css";
import {Canvas} from "react-three-fiber";
import {withControls} from "react-three-gui";
import {a, config} from "react-spring/three";
import {useControl, Controls} from "react-three-gui";

// Wrap the <Canvas> with `withControls`
const CanvasWithControls = withControls(Canvas);

function Box({position: [x, y, z], ...props}) {
  // Set up state for the hovered and active state
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  // });

  const posX = useControl("Pos X", {
    type: "number",
    spring: true,
    min: x,
    value: x,
  });
  const posY = useControl("Pos Y", {
    type: "number",
    spring: config.wobbly,
    min: y,
    value: y,
  });
  const rotateXY = useControl("Rotation", {type: "xypad", distance: Math.PI});
  const color = useControl("Material Color", {type: "color"});

  return (
    <a.mesh
      {...props}
      rotation-x={rotateXY.x}
      rotation-y={rotateXY.y}
      position-x={posX}
      position-y={posY}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <a.meshStandardMaterial color={color} />
    </a.mesh>
  );
}

function Scene() {
  return (
    <CanvasWithControls>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </CanvasWithControls>
  );
}

export default function App() {
  return (
    <Controls.Provider>
      <Scene />
      <Controls />
    </Controls.Provider>
  );
}
