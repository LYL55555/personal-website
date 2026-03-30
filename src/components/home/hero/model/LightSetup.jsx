export const LightSetup = () => {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.8} />
      {/* Key spot */}
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.4} 
        penumbra={0.5}
        intensity={1.5}
      />
      {/* Fill */}
      <pointLight position={[-5, 0, -5]} intensity={0.5} />
    </>
  );
}; 