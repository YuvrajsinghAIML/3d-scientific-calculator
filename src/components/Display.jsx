import { Text } from '@react-three/drei';

export function Display({ expression, result, position }) {
  return (
    <group position={position}>
      {/* Screen Bezel (Outer Rim) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[4.4, 1.8]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen Background (LCD) - pushed slightly forward */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[4.1, 1.5]} />
        <meshStandardMaterial color="#98fb98" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Expression Text */}
      <Text
        position={[-1.9, 0.4, 0.02]}
        fontSize={0.25}
        color="#111122"
        anchorX="left"
        anchorY="middle"
        maxWidth={3.8}
        overflowWrap="break-word"
      >
        {expression}
        <meshBasicMaterial toneMapped={false} color="#111122" />
      </Text>

      {/* Result Text */}
      <Text
        position={[1.9, -0.4, 0.02]}
        fontSize={0.5}
        color="#111122"
        anchorX="right"
        anchorY="middle"
        maxWidth={3.8}
      >
        {result}
        <meshBasicMaterial toneMapped={false} color="#111122" />
      </Text>
    </group>
  );
}
