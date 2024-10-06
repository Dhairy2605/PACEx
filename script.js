// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starCount = 10000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 2000; // random x position
  const y = (Math.random() - 0.5) * 2000; // random y position
  const z = (Math.random() - 0.5) * 2000; // random z position
  positions.set([x, y, z], i * 3);
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Set camera position
camera.position.z = 500;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  stars.rotation.x += 0.001; // Rotate stars
  stars.rotation.y += 0.001;
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

const welcomeText = document.getElementById('welcome-text');
welcomeText.style.opacity = 0;

setTimeout(() => {
  welcomeText.style.transition = 'opacity 2s';
  welcomeText.style.opacity = 1;
  welcomeText.style.transform = 'rotateY(360deg)';
  
  // Particle effect
  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      radius: Math.random() * 2 + 1,
      color: `hsla(${Math.random() * 360}, 100%, 50%, 0.5)`
    });
  }
  
  function update() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    requestAnimationFrame(update);
  }
  const ctx = document.getElementById('particle-canvas').getContext('2d');
  update();
}, 1000);

setTimeout(() => {
  welcomeText.style.opacity = 0;
  window.location.href = 'landingpage.html'; // redirect to home page
}, 4000);