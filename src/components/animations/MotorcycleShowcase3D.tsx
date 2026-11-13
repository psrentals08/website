'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Eye, Flame, ShieldAlert } from 'lucide-react';

export default function MotorcycleShowcase3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<string>('#F47719');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for the entire motorcycle
    const bikeGroup = new THREE.Group();
    scene.add(bikeGroup);

    // Materials
    const primaryColor = new THREE.Color(activeColor);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: primaryColor,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: wireframeMode,
    });

    const blackMetal = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.3,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.1,
    });

    const rubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.1,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xf47719,
    });

    // 1. Chassis / Frame
    const frameGeo = new THREE.BoxGeometry(0.3, 0.8, 2.6);
    const frameMesh = new THREE.Mesh(frameGeo, bodyMaterial);
    frameMesh.position.set(0, 1.2, 0);
    bikeGroup.add(frameMesh);

    // Fuel Tank
    const tankGeo = new THREE.CylinderGeometry(0.35, 0.5, 1.2, 16);
    tankGeo.rotateX(Math.PI / 2);
    const tankMesh = new THREE.Mesh(tankGeo, bodyMaterial);
    tankMesh.position.set(0, 1.6, -0.3);
    tankMesh.scale.set(0.9, 0.8, 1.3);
    bikeGroup.add(tankMesh);

    // Seat
    const seatGeo = new THREE.BoxGeometry(0.45, 0.15, 0.9);
    const seatMesh = new THREE.Mesh(seatGeo, rubberMaterial);
    seatMesh.position.set(0, 1.5, 0.6);
    bikeGroup.add(seatMesh);

    // Engine Block
    const engineGeo = new THREE.BoxGeometry(0.5, 0.7, 0.8);
    const engineMesh = new THREE.Mesh(engineGeo, blackMetal);
    engineMesh.position.set(0, 0.8, 0.1);
    bikeGroup.add(engineMesh);

    // Exhaust Pipes
    const exhaustGeo = new THREE.CylinderGeometry(0.08, 0.1, 1.8, 12);
    exhaustGeo.rotateX(Math.PI / 2);
    const exhaustMesh = new THREE.Mesh(exhaustGeo, chromeMaterial);
    exhaustMesh.position.set(0.32, 0.6, 0.4);
    bikeGroup.add(exhaustMesh);

    // 2. Front Fork & Handlebars
    const forkGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.8, 12);
    forkGeo.rotateZ(0.25);
    const forkLeft = new THREE.Mesh(forkGeo, chromeMaterial);
    forkLeft.position.set(0.2, 1.1, -1.3);
    const forkRight = forkLeft.clone();
    forkRight.position.x = -0.2;
    bikeGroup.add(forkLeft);
    bikeGroup.add(forkRight);

    // Handlebar
    const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 12);
    handleGeo.rotateZ(Math.PI / 2);
    const handleMesh = new THREE.Mesh(handleGeo, chromeMaterial);
    handleMesh.position.set(0, 1.9, -1.1);
    bikeGroup.add(handleMesh);

    // Headlight (Glowing Orange Ring)
    const headlightGeo = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
    const headlightMesh = new THREE.Mesh(headlightGeo, glowMaterial);
    headlightMesh.position.set(0, 1.5, -1.6);
    bikeGroup.add(headlightMesh);

    // 3. Front Wheel (Rotating Group)
    const frontWheelGroup = new THREE.Group();
    frontWheelGroup.position.set(0, 0.6, -1.6);

    const tireGeo = new THREE.TorusGeometry(0.6, 0.14, 16, 32);
    const frontTire = new THREE.Mesh(tireGeo, rubberMaterial);
    frontTire.rotation.y = Math.PI / 2;
    frontWheelGroup.add(frontTire);

    const rimGeo = new THREE.TorusGeometry(0.48, 0.04, 16, 32);
    const frontRim = new THREE.Mesh(rimGeo, glowMaterial);
    frontRim.rotation.y = Math.PI / 2;
    frontWheelGroup.add(frontRim);

    // Spokes
    for (let i = 0; i < 6; i++) {
      const spokeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.95, 8);
      const spoke = new THREE.Mesh(spokeGeo, chromeMaterial);
      spoke.rotation.z = (i * Math.PI) / 3;
      spoke.rotation.y = Math.PI / 2;
      frontWheelGroup.add(spoke);
    }
    bikeGroup.add(frontWheelGroup);

    // 4. Rear Wheel (Rotating Group)
    const rearWheelGroup = new THREE.Group();
    rearWheelGroup.position.set(0, 0.6, 1.4);

    const rearTire = frontTire.clone();
    const rearRim = frontRim.clone();
    rearWheelGroup.add(rearTire);
    rearWheelGroup.add(rearRim);

    for (let i = 0; i < 6; i++) {
      const spokeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.95, 8);
      const spoke = new THREE.Mesh(spokeGeo, chromeMaterial);
      spoke.rotation.z = (i * Math.PI) / 3;
      spoke.rotation.y = Math.PI / 2;
      rearWheelGroup.add(spoke);
    }
    bikeGroup.add(rearWheelGroup);

    // 5. Ground Grid Floor
    const gridHelper = new THREE.GridHelper(24, 24, 0xf47719, 0x222222);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const orangeKeyLight = new THREE.DirectionalLight(0xf47719, 3.5);
    orangeKeyLight.position.set(5, 6, 4);
    scene.add(orangeKeyLight);

    const blueFillLight = new THREE.DirectionalLight(0x3366ff, 1.2);
    blueFillLight.position.set(-5, 4, -4);
    scene.add(blueFillLight);

    const bikePointLight = new THREE.PointLight(0xf47719, 4, 6);
    bikePointLight.position.set(0, 1.6, -1.8);
    scene.add(bikePointLight);

    // Interactive mouse rotation
    let isMouseDown = false;
    let prevMouseX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      prevMouseX = e.clientX;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - prevMouseX;
      bikeGroup.rotation.y += deltaX * 0.01;
      prevMouseX = e.clientX;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isMouseDown) {
        bikeGroup.rotation.y += delta * 0.4;
      }

      // Wheels rotation
      frontWheelGroup.rotation.x -= delta * 3;
      rearWheelGroup.rotation.x -= delta * 3;

      // Subtle suspension floating
      bikeGroup.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeColor, isRotating, wireframeMode]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-brand-black via-brand-charcoal to-brand-black border border-brand-orange/30 shadow-2xl p-4 sm:p-8 my-12">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 z-10 relative">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20 mb-2">
            <Sparkles size={12} /> Interactive 3D Machine Lab
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Precision Engineering & Diagnostics
          </h3>
          <p className="text-white/50 text-xs sm:text-sm">
            Drag to rotate 360°. Inspect chassis architecture, dual-channel ABS, and power train.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isRotating
                ? 'bg-brand-orange text-white border-brand-orange shadow-md shadow-brand-orange/30'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            <RotateCw size={14} className={isRotating ? 'animate-spin' : ''} />
            <span>Auto-Rotate</span>
          </button>
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              wireframeMode
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            <Eye size={14} />
            <span>Wireframe</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden relative"
      />

      {/* Futuristic Specs Overlay Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 z-10 relative">
        <div className="bg-brand-black/70 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-brand-orange font-mono text-xs font-bold">FRAME</div>
          <div className="text-white text-sm font-semibold mt-0.5">Dual Cradle Tubular</div>
        </div>
        <div className="bg-brand-black/70 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-brand-orange font-mono text-xs font-bold">BRAKING</div>
          <div className="text-white text-sm font-semibold mt-0.5">Dual-Channel ABS</div>
        </div>
        <div className="bg-brand-black/70 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-brand-orange font-mono text-xs font-bold">LIGHTING</div>
          <div className="text-white text-sm font-semibold mt-0.5">Signature Orange LED</div>
        </div>
        <div className="bg-brand-black/70 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-brand-orange font-mono text-xs font-bold">INSPECTION</div>
          <div className="text-green-400 text-sm font-semibold mt-0.5">24-Point Certified</div>
        </div>
      </div>
    </div>
  );
}
