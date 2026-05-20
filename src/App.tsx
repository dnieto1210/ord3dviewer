import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, useProgress, Environment } from "@react-three/drei";

function Loader() {
 const { progress } = useProgress();
 return (
 <Html center style={{ color: "black", fontFamily: "sans-serif" }}>
 Loading… {progress.toFixed(0)}%
 </Html>
 );
}

function OrdModel() {
 const { scene } = useGLTF("/models/ohare3.glb");
 return <primitive object={scene} />;
}

useGLTF.preload("/models/ohare3.glb");

export default function App() {
 return (
 <div style={{ width: "100vw", height: "100vh" }}>
 <Canvas
 dpr={1}
 camera={{ position: [0, 200, 400], fov: 50 }}
 gl={{ antialias: true, powerPreference: "high-performance" }}
 onCreated={({ gl }) => {
 gl.outputColorSpace = THREE.SRGBColorSpace;
 gl.toneMapping = THREE.ACESFilmicToneMapping;
 gl.toneMappingExposure = 1.6; // try 1.2–2.2
 }}
 >
 {/* lighter background to help readability */}
 <color attach="background" args={["#d9dde7"]} />

 {/* brighter lights */}
 <ambientLight intensity={1.1} />
 <directionalLight position={[200, 300, 200]} intensity={1.4} />

 {/* environment lighting for PBR materials */}
 <Environment preset="warehouse" />

 <OrbitControls makeDefault />

 <Suspense fallback={<Loader />}>
 <OrdModel />
 </Suspense>
 </Canvas>
 </div>
 );
}

