import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Calculator } from './components/Calculator';

function App() {
  const [theme, setTheme] = useState('night'); // 'day' or 'night'

  const isNight = theme === 'night';
  const bgClass = isNight
    ? "bg-gradient-to-br from-gray-900 to-black text-white"
    : "bg-gradient-to-br from-blue-100 to-white text-gray-900";

  return (
    <div className={`w-full h-full relative transition-colors duration-500 ${bgClass}`}>
      {/* 2D Overlay Title */}
      <div className="absolute top-4 left-4 z-10 font-sans pointer-events-none">
        <h1 className="text-3xl font-bold tracking-wider drop-shadow-md">SCIENTIFIC</h1>
        <h2 className="text-xl font-light opacity-80">CALCULATOR 3D</h2>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(isNight ? 'day' : 'night')}
        className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center text-2xl"
      >
        {isNight ? '☀️' : '🌙'}
      </button>

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Lighting varies slightly by theme */}
        <ambientLight intensity={isNight ? 0.4 : 0.7} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={isNight ? 1 : 1.5}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight position={[-5, 5, 5]} intensity={isNight ? 0.5 : 0.8} />

        {/* Environment map for realistic reflections */}
        <Environment preset={isNight ? "city" : "apartment"} />

        {/* The Calculator */}
        <Calculator />

        {/* Ground shadow */}
        <ContactShadows position={[0, -4.5, 0]} opacity={isNight ? 0.7 : 0.4} scale={15} blur={2.5} far={4} />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}

export default App;
