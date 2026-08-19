/**
 * Three.js 3D Crystal Scene — Tché Ruggi Inspired
 * Requires Three.js r128 loaded globally before this script.
 * Exposes: window.initThreeScene(), window.destroyThreeScene()
 */
(function () {
  "use strict";

  // ── References kept for cleanup ──────────────────────────────────
  var renderer, scene, camera, clock;
  var crystalGroup, wireframeMesh, torusRings, particleSystem;
  var animFrameId = null;
  var mouseX = 0, mouseY = 0;
  var targetRotX = 0, targetRotY = 0;
  var isDestroyed = false;

  // ── Canvas ───────────────────────────────────────────────────────
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) {
    console.warn("[three-scene] #hero-canvas not found – aborting.");
    return;
  }

  // ── Renderer ─────────────────────────────────────────────────────
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0a0a0a, 1);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // ── Scene ────────────────────────────────────────────────────────
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.06);

  // ── Camera ───────────────────────────────────────────────────────
  camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.5, 6);
  camera.lookAt(0, 0, 0);

  // ── Clock ────────────────────────────────────────────────────────
  clock = new THREE.Clock();

  // ── Lights ───────────────────────────────────────────────────────
  // Ambient – very dim warm fill
  var ambientLight = new THREE.AmbientLight(0xffd699, 0.25);
  scene.add(ambientLight);

  // Key light – warm white from upper-right-front
  var keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);

  // Gold accent light – from the left
  var accentLight = new THREE.DirectionalLight(0xc9a96e, 0.8);
  accentLight.position.set(-5, 2, 3);
  scene.add(accentLight);

  // Rim light – cool back light for edge separation
  var rimLight = new THREE.DirectionalLight(0xd4a04a, 0.5);
  rimLight.position.set(0, -3, -5);
  scene.add(rimLight);

  // Point light close to crystal for specular glints
  var pointLight = new THREE.PointLight(0xffe0a0, 0.6, 12);
  pointLight.position.set(1, 2, 3);
  scene.add(pointLight);

  // ── Crystal Group ────────────────────────────────────────────────
  crystalGroup = new THREE.Group();
  scene.add(crystalGroup);

  // Main crystal body – Icosahedron (detail 0 = 20 faces, detail 1 = 80)
  // Using detail 1 for more facets (closer to Ruggi's multifaceted steel)
  var crystalRadius = Math.max(0.001, 1.4);
  var crystalGeo = new THREE.IcosahedronGeometry(crystalRadius, 1);

  // Metallic gold material
  var crystalMat = new THREE.MeshStandardMaterial({
    color: 0xc9a96e,
    metalness: 0.9,
    roughness: 0.2,
    flatShading: true,
  });

   var crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  crystalGroup.add(crystalMesh);

  // Wireframe edges – copper
  var edgesGeo = new THREE.EdgesGeometry(crystalGeo, 15); // threshold angle
  var edgesMat = new THREE.LineBasicMaterial({
    color: 0xb87333,
    linewidth: 1,
    transparent: true,
    opacity: 0.85,
  });
  wireframeMesh = new THREE.LineSegments(edgesGeo, edgesMat);
  crystalGroup.add(wireframeMesh);

  // ── Orbiting Torus Rings ─────────────────────────────────────────
  torusRings = [];

  var ringConfigs = [
    { radius: 2.2, tube: 0.018, rotX: Math.PI * 0.35, rotZ: 0.2, speed: 0.3, color: 0xe8e0d0, opacity: 0.5 },
    { radius: 2.6, tube: 0.014, rotX: -Math.PI * 0.2, rotZ: Math.PI * 0.5, speed: -0.2, color: 0xd4cfc4, opacity: 0.35 },
    { radius: 3.0, tube: 0.012, rotX: Math.PI * 0.5, rotZ: -Math.PI * 0.15, speed: 0.15, color: 0xc9bfb0, opacity: 0.25 },
  ];

  for (var i = 0; i < ringConfigs.length; i++) {
    var cfg = ringConfigs[i];
    var torusGeo = new THREE.TorusGeometry(
      Math.max(0.001, cfg.radius),
      Math.max(0.001, cfg.tube),
      16,
      100
    );
    var torusMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      metalness: 0.95,
      roughness: 0.15,
      transparent: true,
      opacity: cfg.opacity,
      side: THREE.DoubleSide,
    });
    var torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = cfg.rotX;
    torusMesh.rotation.z = cfg.rotZ;
    torusMesh.userData.speed = cfg.speed;
    torusMesh.userData.baseRotY = 0;
    torusMesh.userData.baseRotX = cfg.rotX;
    scene.add(torusMesh);
    torusRings.push(torusMesh);
  }

  // ── Floating Particles ───────────────────────────────────────────
  var particleCount = 200;
  var particlePositions = new Float32Array(particleCount * 3);
  var particleSizes = new Float32Array(particleCount);

  for (var p = 0; p < particleCount; p++) {
    // Distribute in a sphere shell around the crystal
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos(2 * Math.random() - 1);
    var r = 2.0 + Math.random() * 5.0;
    particlePositions[p * 3] = r * Math.sin(phi) * Math.cos(theta);
    particlePositions[p * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePositions[p * 3 + 2] = r * Math.cos(phi);
    particleSizes[p] = 1.0 + Math.random() * 2.5;
  }

  var particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));

  // Gold particle material using PointsMaterial (simple, performant)
  var particleMat = new THREE.PointsMaterial({
    color: 0xc9a96e,
    size: 0.04,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    depthWrite: false,
  });

  particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // ── Mouse Tracking ───────────────────────────────────────────────
  function onMouseMove(e) {
    if (isDestroyed) return;
    // Normalise to -1 … 1
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }
  window.addEventListener("mousemove", onMouseMove, { passive: true });

  // Touch support
  function onTouchMove(e) {
    if (isDestroyed) return;
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
    }
  }
  window.addEventListener("touchmove", onTouchMove, { passive: true });

  // ── Resize Handler ───────────────────────────────────────────────
  function onResize() {
    if (isDestroyed) return;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", onResize);

  // ── Animation Loop ───────────────────────────────────────────────
  function animate() {
    if (isDestroyed) return;
    animFrameId = requestAnimationFrame(animate);

    var elapsed = clock.getElapsedTime();
    var delta = clock.getDelta();

    // Auto-rotate crystal
    crystalGroup.rotation.y += 0.004;
    crystalGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.08;

    // Mouse parallax tilt (smooth lerp)
    targetRotX = mouseY * 0.15;
    targetRotY = mouseX * 0.2;
    crystalGroup.rotation.x += (targetRotX - crystalGroup.rotation.x) * 0.03;
    // Merge mouse Y influence into Y rotation
    crystalGroup.rotation.y += (targetRotY - crystalGroup.rotation.y) * 0.015;

    // Orbit torus rings
    for (var t = 0; t < torusRings.length; t++) {
      var ring = torusRings[t];
      ring.rotation.y += ring.userData.speed * 0.008;
      ring.rotation.x = ring.userData.baseRotX + Math.sin(elapsed * 0.2 + t) * 0.05;
    }

    // Slowly rotate particle field
    particleSystem.rotation.y += 0.0005;
    particleSystem.rotation.x += 0.0002;

    // Subtle breathing scale on crystal
    var breathScale = 1.0 + Math.sin(elapsed * 0.8) * 0.015;
    crystalGroup.scale.set(breathScale, breathScale, breathScale);

    // Oscillate point light for shimmer
    pointLight.intensity = 0.5 + Math.sin(elapsed * 1.5) * 0.2;
    pointLight.position.x = Math.cos(elapsed * 0.7) * 2;
    pointLight.position.z = Math.sin(elapsed * 0.7) * 3;

    renderer.render(scene, camera);
  }

  // ── Public API ───────────────────────────────────────────────────
  window.initThreeScene = function () {
    if (isDestroyed) {
      isDestroyed = false;
    }
    onResize(); // ensure sizing is correct at init time
    animate();
  };

  window.destroyThreeScene = function () {
    isDestroyed = true;
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("resize", onResize);

    // Dispose geometries and materials
    scene.traverse(function (obj) {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(function (m) { m.dispose(); });
        } else {
          obj.material.dispose();
        }
      }
    });

    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }

    renderer = null;
    scene = null;
    camera = null;
    clock = null;
    crystalGroup = null;
    wireframeMesh = null;
    torusRings = null;
    particleSystem = null;
  };

  // ── Auto-init if DOM already ready ───────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.initThreeScene();
    });
  } else {
    // DOM already parsed
    window.initThreeScene();
  }
})();
