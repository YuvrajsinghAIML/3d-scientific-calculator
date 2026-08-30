import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

export function Button({ position, label, onClick, width = 0.6, height = 0.4, radius = 0.08, color = "#222", textColor = "#fff", topLabel = null, topLabelColor = "#ffcc00" }) {
  const meshRef = useRef();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetZ = isPressed ? 0.02 : 0.08;
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 20 * delta);
    }
  });

  return (
    <group position={position}>
      {topLabel && (
        <Text position={[0, height / 2, 0.1]} fontSize={0.14} color={topLabelColor} anchorX="center" anchorY="bottom">
          {topLabel}
          <meshBasicMaterial toneMapped={false} color={topLabelColor} />
        </Text>
      )}
      <mesh
        ref={meshRef}
        position={[0, 0, 0.08]}
        onPointerDown={(e) => {
          e.stopPropagation();
          setIsPressed(true);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          setIsPressed(false);
          onClick(label);
        }}
        onPointerOut={(e) => {
          setIsPressed(false);
          setIsHovered(false);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
      >
        <RoundedBox args={[width, height, 0.15]} radius={radius} smoothness={4}>
          <meshStandardMaterial 
            color={isPressed ? new THREE.Color(color).lerp(new THREE.Color("#000"), 0.5) : (isHovered ? new THREE.Color(color).lerp(new THREE.Color("#fff"), 0.1) : color)} 
            roughness={0.4} 
            metalness={0.2} 
          />
        </RoundedBox>
        <Text position={[0, 0, 0.076]} fontSize={height * 0.4} color={textColor} anchorX="center" anchorY="middle">
          {label}
        </Text>
      </mesh>
    </group>
  );
}
