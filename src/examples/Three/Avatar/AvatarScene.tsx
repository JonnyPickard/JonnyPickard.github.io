import {
  CubeCamera,
  OrbitControls,
  Stats,
  useCubeTexture,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { AvatarModel } from "./AvatarModel";

const skyboxAssetPath = "/3d-models/textures/space-skybox/";

function SkyBox() {
  const { scene } = useThree();
  const envMap = useCubeTexture(
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    { path: skyboxAssetPath },
  );

  // Set the scene background property to the resulting texture.
  scene.background = envMap;
  return null;
}

export const AvatarScene = () => {
  return (
    <Canvas
      frameloop="demand"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight position={[0, 10, 5]} intensity={20} />
      <Suspense fallback={null}>
        <CubeCamera>{() => <AvatarModel position={[0, -0.5, 2]} />}</CubeCamera>
      </Suspense>
      <SkyBox />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};
