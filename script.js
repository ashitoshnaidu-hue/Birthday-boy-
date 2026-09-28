const surpriseBtn = document.getElementById("surpriseBtn");
const celebrateBtn = document.getElementById("celebrateBtn");
const overlayCelebrate = document.getElementById("overlayCelebrate");
const closeBtn = document.getElementById("closeBtn");
const surprise = document.getElementById("surprise");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function openSurprise() {
  surprise.classList.add("show");
  launchConfetti(180);
}

function closeSurprise() {
  surprise.classList.remove("show");
}

surpriseBtn.addEventListener("click", openSurprise);

celebrateBtn.addEventListener("click", () => {
  launchConfetti(260);
});

overlayCelebrate.addEventListener("click", () => {
  launchConfetti(320);
});

closeBtn.addEventListener("click", closeSurprise);

surprise.addEventListener("click", (event) => {
  if (event.target === surprise) closeSurprise();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSurprise();
});

let pieces = [];
let animationRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(amount) {
  const symbols = ["🎉", "✨", "💙", "🎈", "⭐"];
  for (let i = 0; i < amount; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      size: 10 + Math.random() * 15,
      speed: 2 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 3,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      life: 1
    });
  }

  if (!animationRunning) {
    animationRunning = true;
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(piece => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.rotationSpeed;
    piece.life -= 0.003;

    ctx.save();
    ctx.globalAlpha = Math.max(0, piece.life);
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.font = `${piece.size}px Arial`;
    ctx.fillText(piece.symbol, -piece.size / 2, piece.size / 2);
    ctx.restore();
  });

  pieces = pieces.filter(piece => piece.y < canvas.height + 50 && piece.life > 0);

  if (pieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    animationRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
