import { useEffect, useRef } from "react";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function MountainViewer({ imagePath, texturePath }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xe5e7eb);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );

    camera.position.set(0, 20, 120);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(50, 100, 50);

    scene.add(directionalLight);

    // heightmap
    const img = new Image();

    img.src = imagePath;

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      const data = imageData.data;

      const aspect = img.width / img.height;

      const terrainWidth = 200;

      const terrainHeight = terrainWidth / aspect;

      const geometry = new THREE.PlaneGeometry(
        terrainWidth,
        terrainHeight,
        img.width - 1,
        img.height - 1,
      );

      geometry.rotateX(-Math.PI / 2);

      const vertices = geometry.attributes.position;

      for (let z = 0; z < img.height; z++) {
        for (let x = 0; x < img.width; x++) {
          const pixelIndex = (z * img.width + x) * 4;

          const brightness = data[pixelIndex];

          const height = brightness * 0.15;

          const vertexIndex = z * img.width + x;

          vertices.setY(vertexIndex, height);
        }
      }

      vertices.needsUpdate = true;

      geometry.computeVertexNormals();

      const textureLoader =
        new THREE.TextureLoader();

      const terrainTexture =
        textureLoader.load(
          texturePath
        );

      const material = new THREE.MeshStandardMaterial({
        map: terrainTexture,
      });

      const terrain = new THREE.Mesh(geometry, material);

      scene.add(terrain);

      animate();
    };

    function animate() {
      requestAnimationFrame(animate);

      controls.update();

      renderer.render(scene, camera);
    }

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      renderer.dispose();

      container.innerHTML = "";
    };
  }, [imagePath]);

  return <div ref={containerRef} className="w-full h-[80vh]" />;
}
