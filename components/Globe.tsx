import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Mesh } from "three";
import RedCross from "./Redcross";

// Convert lat/lon to 3D coordinates
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z] as [number, number, number];
};

const Globe: React.FC = () => {
  const globeRef = useRef<Mesh>(null);
  const texture = useTexture("/earth_texture.jpg");

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
  });

  // Coordinates for red crosses
  const locations = [
    latLongToVector3(-9.1021, 15.4567, 2), // Africa
    latLongToVector3(34.0479, 100.6197, 2), // Asia
    latLongToVector3(54.526, 15.2551, 2), // Europe
    latLongToVector3(54.526, -105.2551, 2), // North America
    latLongToVector3(-14.235, -51.9253, 2), // South America
    latLongToVector3(-25.2744, 133.7751, 2), // Australia
    latLongToVector3(-82.8628, 135.0, 2), // Antarctica
  ];

  return (
    <mesh ref={globeRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={texture} />
      {locations.map((pos, index) => (
        <RedCross key={index} position={pos} />
      ))}
    </mesh>
  );
};

export default Globe;
