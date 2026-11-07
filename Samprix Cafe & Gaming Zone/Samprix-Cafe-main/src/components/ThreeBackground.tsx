import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDark?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ isDark = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.0 : 1.2;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(isDark ? 0x1e293b : 0xf8fafc, 1.5);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 3.5, 30);
    cyanPoint.position.set(-8, 5, 4);
    scene.add(cyanPoint);

    const amberPoint = new THREE.PointLight(0xf59e0b, 3.8, 30);
    amberPoint.position.set(8, -4, 4);
    scene.add(amberPoint);

    // Procedural Floating 3D Coffee Beans & Gaming Polyhedrons Group
    const itemsGroup = new THREE.Group();
    scene.add(itemsGroup);

    // 1. Procedural Coffee Bean Geometry:
    // Create an elongated sphere with a subtle crease line
    const beanGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    beanGeometry.scale(1.2, 0.75, 0.7);

    const beanMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x452311 : 0x78350f,
      roughness: 0.35,
      metalness: 0.15
    });

    const beanCount = 18;
    const beans: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number; z: number }; initialY: number; speed: number }[] = [];

    for (let i = 0; i < beanCount; i++) {
      const bean = new THREE.Mesh(beanGeometry, beanMaterial);
      const angle = (i / beanCount) * Math.PI * 2;
      const radius = 6 + Math.random() * 8;
      bean.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 2
      );
      const scale = 0.6 + Math.random() * 0.8;
      bean.scale.set(scale * 1.2, scale * 0.75, scale * 0.7);
      bean.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      itemsGroup.add(bean);

      beans.push({
        mesh: bean,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01
        },
        initialY: bean.position.y,
        speed: 0.5 + Math.random() * 0.8
      });
    }

    // 2. Procedural Floating Esports Crystals / Gems (Dodecahedron & Octahedron)
    const gemGeom1 = new THREE.DodecahedronGeometry(0.5, 0);
    const gemGeom2 = new THREE.OctahedronGeometry(0.45, 0);

    const cyanGemMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false
    });

    const amberGemMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.7
    });

    const gems: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number }; initialY: number; speed: number }[] = [];
    const gemCount = 14;

    for (let i = 0; i < gemCount; i++) {
      const geom = i % 2 === 0 ? gemGeom1 : gemGeom2;
      const mat = i % 2 === 0 ? cyanGemMat : amberGemMat;
      const gem = new THREE.Mesh(geom, mat);
      gem.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 6 - 3
      );
      const s = 0.5 + Math.random() * 0.6;
      gem.scale.set(s, s, s);
      itemsGroup.add(gem);

      gems.push({
        mesh: gem,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.025
        },
        initialY: gem.position.y,
        speed: 0.4 + Math.random() * 0.6
      });
    }

    // 3. Floating Ambient Steam / Energy Particles
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 24;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: isDark ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Parallax Interaction (Allocated outside tick to prevent GC)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = x * 1.5;
      targetY = y * 1.2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Rotate and drift coffee beans
      for (let i = 0; i < beans.length; i++) {
        const b = beans[i];
        b.mesh.rotation.x += b.rotSpeed.x;
        b.mesh.rotation.y += b.rotSpeed.y;
        b.mesh.rotation.z += b.rotSpeed.z;
        b.mesh.position.y = b.initialY + Math.sin(elapsedTime * b.speed + i) * 0.45;
      }

      // Rotate and drift gaming gems
      for (let i = 0; i < gems.length; i++) {
        const g = gems[i];
        g.mesh.rotation.x += g.rotSpeed.x;
        g.mesh.rotation.y += g.rotSpeed.y;
        g.mesh.position.y = g.initialY + Math.cos(elapsedTime * g.speed + i) * 0.35;
      }

      // Subtle slow particle rotation
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      beanGeometry.dispose();
      beanMaterial.dispose();
      gemGeom1.dispose();
      gemGeom2.dispose();
      cyanGemMat.dispose();
      amberGemMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
