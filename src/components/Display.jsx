import { Text } from '@react-three/drei';
import { useState, useEffect } from 'react';

export function Display({ isPoweredOn, shiftMode, alphaMode, expression, result, position }) {
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
        <planeGeometry args={[4.2, 1.6]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen Background (LCD) - pushed slightly forward */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.9, 1.3]} />
        <meshStandardMaterial color="#98fb98" roughness={0.6} metalness={0.1} />
      </mesh>

      {isPoweredOn && (
        <>
          {/* Horizontal Line Separator */}
          <mesh position={[0, 0.48, 0.015]}>
            <planeGeometry args={[3.9, 0.015]} />
            <meshBasicMaterial color="#111122" opacity={0.2} transparent />
          </mesh>

          {/* Shift Indicator */}
          {shiftMode && (
            <group position={[-1.85, 0.56, 0.015]}>
              <mesh>
                <planeGeometry args={[0.15, 0.15]} />
                <meshBasicMaterial color="#111122" opacity={0.8} transparent />
              </mesh>
              <Text
                position={[0, 0, 0.01]}
                fontSize={0.12}
                color="#98fb98"
                anchorX="center"
                anchorY="middle"
              >
                S
                <meshBasicMaterial toneMapped={false} color="#98fb98" />
              </Text>
            </group>
          )}

          {/* Alpha Indicator */}
          {alphaMode && (
            <group position={[-1.69, 0.56, 0.015]}>
              <mesh>
                <planeGeometry args={[0.15, 0.15]} />
                <meshBasicMaterial color="#111122" opacity={0.8} transparent />
              </mesh>
              <Text
                position={[0, 0, 0.01]}
                fontSize={0.12}
                color="#98fb98"
                anchorX="center"
                anchorY="middle"
              >
                A
                <meshBasicMaterial toneMapped={false} color="#98fb98" />
              </Text>
            </group>
          )}

          {/* Expression Text */}
          <Text
            position={[-1.8, 0.28, 0.02]}
            fontSize={0.26}
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
            position={[1.8, -0.35, 0.02]}
            fontSize={0.3}
            color="#111122"
            anchorX="right"
            anchorY="middle"
            maxWidth={3.6}
          >
            {result}
            <meshBasicMaterial toneMapped={false} color="#111122" />
          </Text>
        </>
      )}
    </group>
  );
}
