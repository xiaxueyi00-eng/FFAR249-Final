// Basic page setup
document.body.style.margin = "0";
document.body.style.background = "black";
document.body.style.overflow = "hidden";
document.body.style.fontFamily = "Space Mono";
// --- Create 2x2 grid layout ---
let grid = document.createElement("div");
grid.style.display = "grid";
grid.style.gridTemplateColumns = "1fr 1fr";
grid.style.gridTemplateRows = "1fr 1fr";
grid.style.height = "100vh";
document.body.appendChild(grid);

let panels = [];
// --- Create four panels ---
for (let i = 0; i < 4; i++) {


    let panel = document.createElement("div");


    panel.style.position = "relative";
    panel.style.border = "1px solid rgba(255,255,255,0.2)";
    panel.style.overflow = "hidden";
    grid.appendChild(panel);
    panels.push(panel);
    // LIVE label
    let live = document.createElement("div");
    live.innerText = "LIVE";
    live.style.position = "absolute";
    live.style.top = "10px";
    live.style.left = "10px";
    live.style.color = "red";
    panel.appendChild(live);
    // viewer counter
    let viewers = document.createElement("div");
    let count = 1000;
    viewers.innerText = count + " watching";
    viewers.style.position = "absolute";
    viewers.style.top = "30px";
    viewers.style.left = "10px";
    panel.appendChild(viewers);
    // increase viewer count over time
    setInterval(function () {
        count += Math.floor(Math.random() * 20);
        viewers.innerText = count + " watching";
    }, 1000);
}
// apply shaking effect to all panels
panels.forEach(function (panel) {
    panel.classList.add("shake");
});
// --- Helper function to create video elements ---
function createVideo(src) {
    let v = document.createElement("video");
    v.src = src;
    v.autoplay = true;
    v.muted = true;
    v.playsInline = true;
    v.style.width = "100%";
    v.style.height = "100%";
    v.style.objectFit = "cover";
    return v;
}


// add prerecorded videos to first three panels
let v1 = createVideo("image/3.mp4");
let v2 = createVideo("image/4.mp4");
let v3 = createVideo("image/5.mp4");

panels[0].appendChild(v1);
panels[1].appendChild(v2);
panels[2].appendChild(v3);

// --- Create live camera feed in fourth panel ---
let camera = document.createElement("video");
camera.classList.add("camera");
camera.style.filter = "grayscale(100%) contrast(120%)";

camera.autoplay = true;
camera.muted = true;
camera.playsInline = true;
camera.style.width = "100%";
camera.style.height = "100%";
camera.style.objectFit = "cover";
// optional extra shake (can remove if double shaking)
camera.classList.add("shake");
panels[3].appendChild(camera);
// request webcam access
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        camera.srcObject = stream;
    });


// --- Redirect logic based on video loop ---
let loopCount = 0;
v1.addEventListener("ended", function () {
    loopCount++;

    if (loopCount >= 2) {
        window.location.href = "visibility.html";
    } else {
        v1.currentTime = 0;
        v1.play();
    }
});