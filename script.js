const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 2000; // Larger canvas size
canvas.height = 2000;

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
const piDigitsSlider = document.getElementById("piDigits");

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

// Add event listener for piDigits slider
piDigitsSlider.addEventListener("input", function() {
    // Get the selected number of digits
    const digits = parseInt(piDigitsSlider.value);
    
    // Calculate pi with the selected number of digits
    const piValue = calculatePi(digits);
    
    // Display the calculated value of pi
    document.getElementById("piValue").textContent = piValue;
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

// Function to calculate pi with the specified number of digits
function calculatePi(digits) {
    return parseFloat(Math.PI.toFixed(digits));
}
