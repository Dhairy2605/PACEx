document.addEventListener("DOMContentLoaded", function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-background').appendChild(renderer.domElement);

    // Nebula-like background color
    renderer.setClearColor(0x050505, 1); // Dark grey for a cool space-like effect

    // Create a glow particle effect with random colors
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Random positions
        positions[i] = (Math.random() - 0.5) * 1000;
        positions[i + 1] = (Math.random() - 0.5) * 1000;
        positions[i + 2] = (Math.random() - 0.5) * 1000;

        // Random colors for each particle
        colors[i] = Math.random();
        colors[i + 1] = Math.random();
        colors[i + 2] = Math.random();
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 3,  // Size of the glowing particles
        vertexColors: true,  // Use the colors we assigned above
        blending: THREE.AdditiveBlending,  // Additive blending for glowing effect
        transparent: true,
        opacity: 0.8,  // Semi-transparent
        depthWrite: false,  // Ensures particles don't block each other
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 400;

    // Animate the particles for a dynamic experience
    function animate() {
        requestAnimationFrame(animate);

        // Apply some rotation to the entire particle system
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.z += 0.002;

        // Move particles in a slight wave for a cooler effect
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i + 1] += 0.05 * Math.sin(positions[i + 2] * 0.01); // Adding wave motion
            if (positions[i + 1] > 500) {
                positions[i + 1] = -500;  // Reset position for smooth looping
            }
        }
        particles.attributes.position.needsUpdate = true; // Update position

        renderer.render(scene, camera);
    }

    animate();

    // Adjust for window resizing
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
