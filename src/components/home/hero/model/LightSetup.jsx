export const LightSetup = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.4} 
        penumbra={0.5}
        intensity={1.5}
      />
      <pointLight position={[-5, 0, -5]} intensity={0.5} />
    </>
  );
}; 