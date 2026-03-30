import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAudioHover } from "@/hooks/useAudioHover";

export const UsagiModel = () => {
  const { scene } = useGLTF("/usagi.glb");
  const modelRef = useRef();
  const { viewport } = useThree();
  const mouse = useRef([0, 0]);
  const baseRotationY = Math.PI * 0.25; // Default yaw

  // Hover ambience audio
  const { playAudio, stopAudio, cleanup } = useAudioHover(
    "/usagi_cursor/3uniques.mp3"
  );

  useEffect(() => {
    const updateMouse = (event) => {
      // Normalize pointer to [-1, 1]
      mouse.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", updateMouse);
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      cleanup();
    };
  }, [cleanup]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    const targetX = -mouse.current[1] * 0.2; // Pitch from vertical pointer

    // Yaw + depth from horizontal pointer
    let rotationOffset;
    let zOffset;
    if (mouse.current[0] < 0) {
      rotationOffset = Math.abs(mouse.current[0]) * -0.8;
      // Push model forward when pointer is left
      zOffset = Math.abs(mouse.current[0]) * 0.3;
    } else {
      rotationOffset = mouse.current[0] * 0.4;
      // Pull Z when pointer is right
      zOffset = mouse.current[0] * 0.3;
    }

    const targetY = baseRotationY + rotationOffset;

    // Smooth rotations toward targets
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetX,
      delta * 2
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetY,
      delta * 2
    );

    // Smooth Z toward target
    modelRef.current.position.z = THREE.MathUtils.lerp(
      modelRef.current.position.z,
      zOffset,
      delta * 2
    );
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2}
      position={[0.5, -0.5, 0]}
      onPointerEnter={playAudio}
      onPointerLeave={stopAudio}
    />
  );
};
