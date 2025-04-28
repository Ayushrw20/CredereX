// @ts-nocheck
"use client"
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function BlockchainModel() {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
   
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9fafb); 
    
    const camera = new THREE.PerspectiveCamera(50, 16/9, 0.1, 1000);
    camera.position.z = 20;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const blocks = [];
    const blockGeometry = new THREE.BoxGeometry(3, 2, 1);
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x4f46e5 }), 
      new THREE.MeshPhongMaterial({ color: 0x8b5cf6 }), 
      new THREE.MeshPhongMaterial({ color: 0x6366f1 })
    ];

    const blockchainGroup = new THREE.Group();
    scene.add(blockchainGroup);

    for (let i = 0; i < 7; i++) {
      const block = new THREE.Mesh(
        blockGeometry, 
        materials[i % materials.length]
      );
      
      const angle = (i / 12) * Math.PI * 2;
      const radius = 8;
      block.position.x = Math.cos(angle) * radius;
      block.position.y = Math.sin(angle) * radius;
      block.position.z = -i * 0.5;
      
      block.rotation.x = Math.random() * 0.3;
      block.rotation.y = Math.random() * 0.3;
      
      blocks.push(block);
      blockchainGroup.add(block);
      
      if (i > 0) {
        const prevBlock = blocks[i-1];
        const points = [];
        points.push(new THREE.Vector3(prevBlock.position.x, prevBlock.position.y, prevBlock.position.z));
        points.push(new THREE.Vector3(block.position.x, block.position.y, block.position.z));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xc7d2fe, linewidth: 2 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        blockchainGroup.add(line);
      }
    }

    const particlesCount = 50;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ 
      color: 0x4f46e5,
      size: 0.1,
      transparent: true,
      opacity: 0.7
    });
    
    const positions = new Float32Array(particlesCount * 3);
    const velocities = [];
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const radius = 10 * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    blockchainGroup.add(particles);

    const animate = () => {
      blockchainGroup.rotation.y += 0.005;
      blocks.forEach(block => {
        block.rotation.x += 0.003;
        block.rotation.y += 0.002;
      });
      
      const positions = particles.geometry.attributes.position.array;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;
        
        if (Math.abs(positions[i3]) > 12) velocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > 12) velocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 12) velocities[i].z *= -1;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div 
        ref={mountRef} 
        className="w-full aspect-video rounded-lg overflow-hidden"
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-gray-400">Loading 3D Model...</div>
        </div>
      )}
    </div>
  );
}