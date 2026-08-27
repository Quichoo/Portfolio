import { Canvas } from "@react-three/fiber";

export default function ThreeTest() {
  return (
    <div style={{ width: "300px", height: "300px", background: "#000" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <mesh rotation={[0.4, 0.4, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#35D488" />
        </mesh>
      </Canvas>
    </div>
  );
}
