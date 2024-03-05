const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Dark gray background
ctx.fillStyle = "#333";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Red tone color palette
const redTones = ["#FF0000", "#FF3333", "#FF6666", "#FF9999", "#FFCCCC", "#FF6666", "#FF3333", "#FF0000"];

// Animation variables
let multiplier = 20;
let numIterations = 2000;
let speed = 5;
let angle = 0;

// Get slider elements
const multiplierSlider = document.getElementById("multiplier");
const iterationsSlider = document.getElementById("iterations");
const speedSlider = document.getElementById("speed");

// Update animation variables when sliders change
multiplierSlider.addEventListener("input", function() {
    multiplier = parseFloat(multiplierSlider.value);
    drawSpiral();
});

iterationsSlider.addEventListener("input", function() {
    numIterations = parseInt(iterationsSlider.value);
    drawSpiral();
});

speedSlider.addEventListener("input", function() {
    speed = parseFloat(speedSlider.value);
});

// Function to draw the spiral
function drawSpiral() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, width, height);
    
    // Begin a single path for the spiral
    ctx.beginPath();

    // Draw the spiral
    for (let i = 0; i < numIterations; i++) {
        const radius = parseFloat(Math.PI.toString().charAt(i % Math.PI.toString().length)) * multiplier;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        // Move pen to starting point for each segment
        if (i === 0) {
            ctx.moveTo(x + width / 2, y + height / 2);
        } else {
            ctx.lineTo(x + width / 2, y + height / 2);
        }
        
        // Set stroke style based on color palette
        ctx.strokeStyle = redTones[i % redTones.length];
        ctx.stroke();

        angle += speed * Math.PI / 180; // Convert speed to radians
    }
}

// Initial draw
drawSpiral();

// Redraw on window resize
window.addEventListener("resize", drawSpiral);

// Download button event listener
document.getElementById("download-btn").addEventListener("click", function() {
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "spiral.png");
    downloadLink.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    downloadLink.click();
});
