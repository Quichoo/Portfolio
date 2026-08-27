import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

function useCircleTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);
}

export default function FallingField({ count = 200, color = "#1B7A4C" }) {
  const pointsRef = useRef();
  const reducedMotion = useReducedMotion();
  const circleTexture = useCircleTexture();

  const width = 12;
  const height = 8;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * width;
      pos[i * 3 + 1] = (Math.random() - 0.5) * height;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      spd[i] = 0.6 + Math.random() * 0.9;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  const animated = useMemo(() => positions.slice(), [positions]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    const attr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = attr.array[i * 3 + 1];
      y -= speeds[i] * delta;

      if (y < -height / 2) {
        y = height / 2;
        attr.array[i * 3] = (Math.random() - 0.5) * width;
      }

      attr.array[i * 3 + 1] = y;
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={animated}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        map={circleTexture}
        transparent
        alphaTest={0.2}
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}
