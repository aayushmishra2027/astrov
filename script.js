document.addEventListener('DOMContentLoaded', function() {
    // Function to create a 3D scene with a rotating cube
    function create3DScene(containerId) {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(400, 400);

        // Append the renderer to the container
        const container = document.getElementById(containerId);
        container.appendChild(renderer.domElement);

        // Geometry and material
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Camera position
        camera.position.z = 5;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    }

    // Create scenes for each animation placeholder
    create3DScene('animation-black-holes');
    create3DScene('animation-neutron-stars');
});
