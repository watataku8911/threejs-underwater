import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const length = 1000;
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
export const init = (domElement) => {
  // scene
  const scene = new THREE.Scene();

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: domElement,
    alpha: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // camera
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
  scene.add(camera);

  //   -------------------------- 気泡 -----------------------------[

  const bubleGeometry = new THREE.TorusGeometry(5, 2, 4, 10);
  const bubleMaterial = new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    opacity: 0.8,
    transparent: true,
  });

  let bubleMesh = [];
  for (let i = 0; i < length; i++) {
    bubleMesh[i] = new THREE.Mesh(bubleGeometry, bubleMaterial);
    bubleMesh[i].position.x = 1000 * (Math.random() - 0.5);
    bubleMesh[i].position.y = 1000 * (Math.random() - 0.5);
    bubleMesh[i].position.z = 8000 * (Math.random() - 0.5);

    scene.add(bubleMesh[i]);
  }

  //   ------------------------ グラウンド ------------------------

  const groundGeometry = new THREE.PlaneGeometry(550, 550, 64, 64);
  const groundMaterial = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("./map1.jpg"),
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = Math.PI / -2;
  scene.add(groundMesh);

  //tree
  const tree = new THREE.Group();
  scene.add(tree);

  // stem
  const stemGeometory = new THREE.BoxGeometry(1, 10, 1);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: "green",
  });

  //leaf
  const leafGeometory = new THREE.SphereGeometry(3, 25, 25);
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: "green",
  });

  // light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  ambientLight.position.set(0, 0, 0);
  scene.add(ambientLight);

  // control
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  const animate = () => {
    const timer = Date.now();
    camera.position.x = 50 * Math.sin(((timer / 100) * Math.PI) / 360);
    camera.position.z = 50 * Math.cos(((timer / 100) * Math.PI) / 360);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    requestAnimationFrame(animate);
    for (let i = 0; i < length; i++) {
      bubleMesh[i].position.y += 2.5;
      bubleMesh[i].position.x += Math.random(-5, 5) * 0.1;
      bubleMesh[i].position.z += Math.random(-5, 5) * 0.1;

      bubleMesh[i].rotation.y += 0.05;
      bubleMesh[i].rotation.x += 0.01;
      bubleMesh[i].rotation.z += 0.01;

      // ジオメトリの位置がウィンドウの高さより大きくなったら初期位置に戻す
      if (bubleMesh[i].position.y > sizes.height) {
        bubleMesh[i].position.x = sizes.width * (Math.random() - 0.5);
        bubleMesh[i].position.y = 0;
        bubleMesh[i].position.z = sizes.width * (Math.random() - 0.5);
      }
    }
    controls.update();

    renderer.render(scene, camera);
  };

  animate();

  const onResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);

    if (window.matchMedia("(max-width: 767px)").matches) {
      camera.position.set(0, 5, 0);
    } else if (window.matchMedia("(min-width:768px)").matches) {
      camera.position.set(0, 10, 0);
    }

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  };

  onResize();

  // リサイズイベントが発生した時に発火
  window.addEventListener("resize", onResize);
};
