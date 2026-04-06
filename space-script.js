const particlesContainer = document.getElementById("particles");

if (particlesContainer) {
  const canvas = document.createElement("canvas");
  particlesContainer.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let particles = [];
  const particleCount = 170;        // plus de particules
  const connectionDistance = 170;   // plus de liens entre elles

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.4,   // plus rapide
        vy: (Math.random() - 0.5) * 1.4,   // plus rapide
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.6 + 0.25
      });
    }
  }

  function updateParticles() {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Lignes / formes entre particules
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.45;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Particules blanches
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.shadowColor = "rgba(255,255,255,0.9)";
      ctx.shadowBlur = 10;
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  }

  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  resizeCanvas();
  createParticles();
  animate();
}

function updateProgressBar() {
  const progressBar = document.querySelector(".progress-bar");
  if (!progressBar) return;

  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

  progressBar.style.transform = `scaleX(${scrollPercent})`;
}

function updateHeroGlow() {
  const heroGlow = document.querySelector(".hero-glow");
  if (!heroGlow) return;

  const scrollTop = window.pageYOffset;
  const maxScroll = window.innerHeight * 0.35;
  const scrollProgress = Math.min(scrollTop / maxScroll, 1);

  const y = scrollProgress * 140;
  const opacity = 0.45 - scrollProgress * 0.25;

  heroGlow.style.transform = `translateX(-50%) translateY(${y}px)`;
  heroGlow.style.opacity = opacity;
}

function handleScrollAnimations() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      card.classList.add("animate");
    }
  });
}

window.addEventListener("scroll", () => {
  updateProgressBar();
  updateHeroGlow();
  handleScrollAnimations();
});

window.addEventListener("load", () => {
  updateProgressBar();
  updateHeroGlow();
  handleScrollAnimations();
});