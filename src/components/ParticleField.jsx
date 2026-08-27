import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useTheme } from "../hooks/useTheme";

export default function ParticleField({ count = 250 }) {
  const pointsRef = useRef();
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const particleColor = theme === "light" ? "#3e8d30" : "#35D488";
  const particleOpacity = theme === "light" ? 2 : 0.5;

  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  const animated = useMemo(() => basePositions.slice(), [basePositions]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;

    const attr = pointsRef.current.geometry.attributes.position;
    const { pointer } = state;

    const mouseX = pointer.x * 5;
    const mouseY = pointer.y * 5;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];

      const dx = bx - mouseX;
      const dy = by - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const radius = 2.5;
      const strength = Math.max(0, 1 - dist / radius) * 0.6;

      const pushX = dist > 0.001 ? (dx / dist) * strength : 0;
      const pushY = dist > 0.001 ? (dy / dist) * strength : 0;

      const targetX = bx + pushX;
      const targetY = by + pushY;

      attr.array[i * 3] += (targetX - attr.array[i * 3]) * 0.08;
      attr.array[i * 3 + 1] += (targetY - attr.array[i * 3 + 1]) * 0.08;
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
        size={0.045}
        color={particleColor}
        transparent
        opacity={particleOpacity}
        sizeAttenuation
      />
    </points>
  );
}
