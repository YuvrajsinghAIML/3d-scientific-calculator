import { Text } from '@react-three/drei';
import { useState, useEffect } from 'react';

export function Display({ expression, result, position }) {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={position}>
      {/* Screen Bezel (Outer Rim) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[4.2, 1.4]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen Background (LCD) - pushed slightly forward */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.9, 1.1]} />
        <meshStandardMaterial color="#98fb98" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Expression Text */}
      <Text
        position={[-1.8, 0.25, 0.02]}
        fontSize={0.25}
        color="#111122"
        anchorX="left"
        anchorY="middle"
        maxWidth={3.6}
        overflowWrap="break-word"
      >
        {expression}{showCursor ? '_' : ' '}
        <meshBasicMaterial toneMapped={false} color="#111122" />
      </Text>

      {/* Result Text */}
      <Text
        position={[1.8, -0.25, 0.02]}
        fontSize={0.5}
        color="#111122"
        anchorX="right"
        anchorY="middle"
        maxWidth={3.6}
      >
        {result}
        <meshBasicMaterial toneMapped={false} color="#111122" />
      </Text>
    </group>
  );
}
