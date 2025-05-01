
document.addEventListener('DOMContentLoaded', function() {
    // Laser effect logic
    const canvas = document.getElementById('effectCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let particles = [];

    document.addEventListener('click', (event) => {
        createLaser(event.clientX, event.clientY);
    });
// Remove the firework effect
/*
    function createLaser(x, y) {
        const particleCount = 50;
        const angleIncrement = (Math.PI * 2) / particleCount;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(x, y, i * angleIncrement));
        }
    }
*/
    class Particle {
        constructor(x, y, angle) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.speed = Math.random() * 5 + 5;
            this.length = Math.random() * 20 + 10;
            this.alpha = 1;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.alpha -= 0.02;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
            ctx.stroke();
            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(particle => particle.alpha > 0);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Three.js Cube Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.cube-container').appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Interactive Cube Rotation
    let isDragging = false;
    let previousMouseX, previousMouseY;
    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let cubeX = 0;
    let cubeY = 0;
    let targetCubeX = 0;
    let targetCubeY = 0;

    document.querySelector('.cube-container').addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        document.querySelector('.cube-container').style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;

        if (e.shiftKey) {
            // Move the cube position if shift key is held
            targetCubeX += deltaX;
            targetCubeY += deltaY;
            cube.position.set(targetCubeX / 100, -targetCubeY / 100, 0);
        } else {
            // Rotate the cube
            targetRotationY += deltaX * 0.2; // Increase sensitivity
            targetRotationX -= deltaY * 0.2; // Increase sensitivity
            cube.rotation.set(THREE.Math.degToRad(targetRotationX), THREE.Math.degToRad(targetRotationY), 0);
        }

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.querySelector('.cube-container').style.cursor = 'grab';
    });

    document.addEventListener('mouseleave', () => {
        isDragging = false;
        document.querySelector('.cube-container').style.cursor = 'grab';
    });

    function applyEasing() {
        rotationX += (targetRotationX - rotationX) * 0.1;
        rotationY += (targetRotationY - rotationY) * 0.1;
        cubeX += (targetCubeX - cubeX) * 0.1;
        cubeY += (targetCubeY - cubeY) * 0.1;
        cube.rotation.set(THREE.Math.degToRad(rotationX), THREE.Math.degToRad(rotationY), 0);
        cube.position.set(cubeX / 100, -cubeY / 100, 0);
        requestAnimationFrame(applyEasing);
    }

    applyEasing();

    // Render Loop
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
});


document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});


document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("nav ul");
  
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  });
  

