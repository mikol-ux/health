import React from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

interface RedCrossProps {
  position: [number, number, number];
}

const RedCross: React.FC<RedCrossProps> = ({ position }) => {
  const crossRef = React.useRef<Mesh>(null);

  useFrame(() => {
    if (crossRef.current) {
      crossRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={crossRef} position={position}>
      <boxGeometry args={[0.2, 0.05, 0.05]} />
      <meshStandardMaterial color="red" />
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </mesh>
  );
};

export default RedCross;
