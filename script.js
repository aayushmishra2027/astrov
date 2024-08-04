document.addEventListener('DOMContentLoaded', function() {
    // Function to create a 3D scene with a rotating cube
    function create3DScene(containerId) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(400, 400);

        const container = document.getElementById(containerId);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    }

    create3DScene('animation-black-holes');
    create3DScene('animation-neutron-stars');
});

function search() {
    const query = document.getElementById('search-input').value;
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = '';

            if (results.length > 0) {
                results.forEach(result => {
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result');
                    resultDiv.innerHTML = `
                        <h3>${result.title}</h3>
                        <p>${result.snippet}</p>
                        <a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">Learn more</a>
                    `;
                    resultsContainer.appendChild(resultDiv);
                });
                document.getElementById('search-results').style.display = 'block';
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
                document.getElementById('search-results').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}
