import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function renderMountain(container, imagePath) {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xe5e7eb);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.set(0, 20, 120);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  directionalLight.position.set(50, 100, 50);

  scene.add(directionalLight);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

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

    const geometry = new THREE.PlaneGeometry(
      200,
      200,
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

    const material = new THREE.MeshStandardMaterial({
      color: 0x556b2f,
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

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
