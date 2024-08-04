document.addEventListener('DOMContentLoaded', function() {
    // Black Hole 3D Model
    const blackholeContainer = document.getElementById('blackhole-container');
    const blackholeScene = new THREE.Scene();
    const blackholeCamera = new THREE.PerspectiveCamera(75, blackholeContainer.clientWidth / blackholeContainer.clientHeight, 0.1, 1000);
    const blackholeRenderer = new THREE.WebGLRenderer({ alpha: true });

    blackholeRenderer.setSize(blackholeContainer.clientWidth, blackholeContainer.clientHeight);
    blackholeContainer.appendChild(blackholeRenderer.domElement);

    const geometry = new THREE.TorusGeometry(5, 2, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);

    blackholeScene.add(torus);

    blackholeCamera.position.z = 20;

    function animateBlackhole() {
        requestAnimationFrame(animateBlackhole);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;

        blackholeRenderer.render(blackholeScene, blackholeCamera);
    }

    animateBlackhole();

    // Neutron Star 3D Model
    const neutronstarContainer = document.getElementById('neutronstar-container');
    const neutronstarScene = new THREE.Scene();
    const neutronstarCamera = new THREE.PerspectiveCamera(75, neutronstarContainer.clientWidth / neutronstarContainer.clientHeight, 0.1, 1000);
    const neutronstarRenderer = new THREE.WebGLRenderer({ alpha: true });

    neutronstarRenderer.setSize(neutronstarContainer.clientWidth, neutronstarContainer.clientHeight);
    neutronstarContainer.appendChild(neutronstarRenderer.domElement);

    const starGeometry = new THREE.SphereGeometry(5, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true });
    const star = new THREE.Mesh(starGeometry, starMaterial);

    neutronstarScene.add(star);

    neutronstarCamera.position.z = 20;

    function animateNeutronStar() {
        requestAnimationFrame(animateNeutronStar);

        star.rotation.x += 0.01;
        star.rotation.y += 0.01;

        neutronstarRenderer.render(neutronstarScene, neutronstarCamera);
    }

    animateNeutronStar();
    // Image Upload Handling
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const imagePreview = document.getElementById('imagePreview');

    uploadButton.addEventListener('click', function() {
        const files = fileInput.files;
        if (files.length === 0) {
            alert('Please select an image file.');
            return;
        }

        const file = files[0];
        const formData = new FormData();
        formData.append('image', file);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                const img = document.createElement('img');
                img.src = data.url;
                img.alt = 'Uploaded Image';
                img.style.maxWidth = '200px';
                img.style.borderRadius = '10px';
                img.style.margin = '10px';

                imagePreview.appendChild(img);
            } else {
                alert('File upload failed.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
        });
    });
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
