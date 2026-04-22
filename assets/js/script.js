/* ================================================
   script.js — Portfolio Patrick RALALANIRINA
   Améliorations : 3D tilt image, halo lumière,
   particules orbitales, particles.js config
   ================================================ */

$(document).ready(function () {

  /* ----- MENU HAMBURGER ----- */
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
      document.querySelector('#scroll-top').classList.add('active');
    } else {
      document.querySelector('#scroll-top').classList.remove('active');
    }

    // scroll spy
    $('section').each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr('id');
      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 500, 'linear');
  });

  /* ----- EMAILJS CONTACT FORM ----- */
  $("#contact-form").submit(function (event) {
    emailjs.init("Cwc6DFHrFkdyFAsyp");
    emailjs.sendForm('service_qo9xvop', 'template_rerc9de', this)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById("contact-form").reset();
        alert("Form Submitted Successfully");
      }, function (error) {
        console.log('FAILED...', error);
        alert("Form Submission Failed! Try Again");
      });
    event.preventDefault();
  });
});

/* ----- VISIBILITY CHANGE (tab title) ----- */
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Patrick";
    $("#favicon").attr("href", "./assets/images/dev.jpeg");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "assets/images/favhand.png");
  }
});

/* ----- TYPED.JS ----- */
var typed = new Typed(".typing-text", {
  strings: ["frontend developer", "backend developer", "web developer", "IoT developer"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});

/* ----- DATA FETCH (skills / projects) ----- */
async function fetchData(type = "skills") {
  let response = type === "skills"
    ? await fetch("skills.json")
    : await fetch("./projects/projects.json");
  return await response.json();
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach(skill => {
    skillHTML += `
      <div class="bar">
        <div class="info">
          <img src=${skill.icon} alt="skill" />
          <span>${skill.name}</span>
        </div>
      </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects.slice(0, 6).forEach(project => {
    projectHTML += `
      <div class="box tilt">
        <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
        <div class="content">
          <div class="tag"><h3>${project.name}</h3></div>
          <div class="desc">
            <p>${project.desc}</p>
            <div class="btns">
              <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>`;
  });
  if (projectsContainer) {
    projectsContainer.innerHTML = projectHTML;
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true })
      .reveal('.work .box', { interval: 200 });
  }
}

fetchData().then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));

VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

/* ----- DISABLE DEV TOOLS ----- */
document.onkeydown = function (e) {
  if (e.keyCode == 123) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

/* ----- TAWK.TO ----- */
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/6251b54f7b967b11798998b3/1g07ioghi';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();

/* ----- SCROLL REVEAL ----- */
const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: false });
srtop.reveal('.home .content h2', { delay: 100 });
srtop.reveal('.home .content p',  { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 300 });
srtop.reveal('.home .image',      { delay: 400 });
srtop.reveal('.home .linkedin',   { interval: 600 });
srtop.reveal('.home .github',     { interval: 800 });
srtop.reveal('.home .instagram',  { interval: 600 });
srtop.reveal('.home .facebook',   { interval: 700 });
srtop.reveal('.about .content h3',           { delay: 200 });
srtop.reveal('.about .content .tag',         { delay: 200 });
srtop.reveal('.about .content p',            { delay: 200 });
srtop.reveal('.about .content .box-container',{ delay: 200 });
srtop.reveal('.about .content .resumebtn',   { delay: 200 });
srtop.reveal('.skills .container',           { interval: 200 });
srtop.reveal('.skills .container .bar',      { delay: 400 });
srtop.reveal('.education .box',              { interval: 200 });
srtop.reveal('.experience .timeline',        { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container',          { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

/* ----- SKILLS CHART ----- */
const ctx = document.getElementById('skillsChart');
if (ctx) {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['JavaScript', 'Java', 'C#', 'PHP', 'HTML/CSS', 'SCSS'],
      datasets: [{
        data: [39, 40, 35, 30, 26, 8],
        backgroundColor: ['#f1e05a', '#b07219', '#178600', '#4F5D95', '#e34c26', '#cc6699'],
        borderColor: 'rgba(255,255,255,0.12)',
        borderWidth: 3,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#d0e4ff',
            font: { size: 13, family: 'Poppins', weight: '600' },
            padding: 20,
            usePointStyle: true,
            pointStyleWidth: 12
          }
        },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.label} : ${ctx.parsed}%` }
        }
      }
    }
  });
}

/* ================================================
   PARTICLES.JS — CONFIG ADAPTÉE AU FOND BLEU NUIT
   ================================================ */
particlesJS('particles-js', {
  particles: {
    number: { value: 65, density: { enable: true, value_area: 850 } },
    color: { value: ["#7eb3ff", "#ffffff", "#ffb36b", "#a78bfa", "#5eead4"] },
    shape: { type: "circle", stroke: { width: 0, color: "#000" } },
    opacity: {
      value: 0.55,
      random: true,
      anim: { enable: true, speed: 0.8, opacity_min: 0.15, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 145,
      color: "#7eb3ff",
      opacity: 0.15,   /* très discret pour ne pas masquer le texte */
      width: 1
    },
    move: {
      enable: true,
      speed: 1.6,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab:    { distance: 180, line_linked: { opacity: 0.65 } },
      repulse: { distance: 180, duration: 0.4 },
      push:    { particles_nb: 3 },
      remove:  { particles_nb: 2 }
    }
  },
  retina_detect: true
});

/* ================================================
   EFFET 3D TILT + HALO LUMIÈRE SUR L'IMAGE HERO
   ================================================

   Principe :
   - On enveloppe l'image hero dans un conteneur 3D
   - La rotation suit la position de la souris (perspective CSS + JS)
   - Un pseudo-élément halo suit aussi la souris (radial-gradient)
   - Des "étoiles orbitales" canvas tournent autour de l'image
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. ENVELOPPEMENT DE L'IMAGE HERO --- */
  const heroImg = document.querySelector('.home .image img');
  if (!heroImg) return;

  const heroImageDiv = heroImg.parentElement; // div.image

  // Créer le wrapper 3D
  const wrapper3d = document.createElement('div');
  wrapper3d.className = 'hero-3d-wrapper';
  heroImageDiv.insertBefore(wrapper3d, heroImg);
  wrapper3d.appendChild(heroImg);

  // Créer le halo de lumière (suit la souris)
  const halo = document.createElement('div');
  halo.className = 'hero-halo';
  wrapper3d.appendChild(halo);

  // Créer le canvas orbital
  const orbCanvas = document.createElement('canvas');
  orbCanvas.className = 'hero-orbital-canvas';
  wrapper3d.appendChild(orbCanvas);

  /* --- 2. STYLES INJECTÉS DYNAMIQUEMENT --- */
  const style = document.createElement('style');
  style.textContent = `
    /* Conteneur 3D */
    .hero-3d-wrapper {
      position: relative;
      display: inline-block;
      width: 70%;
      margin-left: 6rem;
      transform-style: preserve-3d;
      perspective: 900px;
      transition: transform 0.08s ease-out;
      cursor: pointer;
    }

    /* L'image elle-même */
    .hero-3d-wrapper img {
      width: 100%;
      margin-left: 0 !important;
      border-radius: 50%;
      display: block;
      transition: box-shadow 0.3s ease;
      position: relative;
      z-index: 2;
    }

    /* Halo lumineux qui suit la souris */
    .hero-halo {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 110%;
      height: 110%;
      border-radius: 50%;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(39, 86, 245, 0.35) 0%,
        rgba(139, 43, 226, 0.15) 45%,
        transparent 70%
      );
      pointer-events: none;
      z-index: 1;
      transition: background 0.12s ease-out, opacity 0.3s;
      opacity: 0.8;
    }

    /* Canvas pour les orbites */
    .hero-orbital-canvas {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 3;
    }

    /* Anneau brillant autour de l'image */
    .hero-3d-wrapper::before {
      content: '';
      position: absolute;
      top: -6px; left: -6px;
      right: -6px; bottom: -6px;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        #2756f5, #8b2be2, #f68c09, #5eead4, #2756f5
      );
      z-index: 0;
      animation: spinRing 6s linear infinite;
      opacity: 0.75;
    }

    /* Couche blanche pour le "creux" du conic */
    .hero-3d-wrapper::after {
      content: '';
      position: absolute;
      top: 2px; left: 2px;
      right: 2px; bottom: 2px;
      border-radius: 50%;
      background: #0d1b4b;
      z-index: 1;
    }

    @keyframes spinRing {
      to { transform: rotate(360deg); }
    }

    /* Floating animation douce */
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }
    .hero-3d-wrapper {
      animation: heroFloat 4s ease-in-out infinite;
    }
    /* Pause du float quand la souris est dessus (le tilt prend le relais) */
    .hero-3d-wrapper:hover {
      animation-play-state: paused;
    }
  `;
  document.head.appendChild(style);

  /* --- 3. CANVAS ORBITAL (étoiles / points qui orbitent) --- */
  const size = heroImg.offsetWidth || 300;
  orbCanvas.width  = size + 80;
  orbCanvas.height = size + 80;
  orbCanvas.style.width  = (size + 80) + 'px';
  orbCanvas.style.height = (size + 80) + 'px';

  const orbCtx = orbCanvas.getContext('2d');
  const cx = orbCanvas.width  / 2;
  const cy = orbCanvas.height / 2;
  const r  = size / 2 + 20; // rayon de l'orbite

  // Définir les particules orbitales
  const orbitals = Array.from({ length: 8 }, (_, i) => ({
    angle:  (i / 8) * Math.PI * 2,
    speed:  0.006 + Math.random() * 0.006,
    radius: r + (Math.random() - 0.5) * 18,
    size:   2 + Math.random() * 2.5,
    color:  ['#7eb3ff','#a78bfa','#f68c09','#5eead4','#ffffff'][i % 5],
    opacity: 0.5 + Math.random() * 0.5
  }));

  // Quelques étoiles fixes sur l'orbite (plus petites)
  const stars = Array.from({ length: 18 }, (_, i) => ({
    angle:  (i / 18) * Math.PI * 2,
    speed:  0.002,
    radius: r + (Math.random() - 0.5) * 30,
    size:   0.8 + Math.random() * 1.2,
    color:  '#ffffff',
    opacity: 0.25 + Math.random() * 0.35
  }));

  function drawOrbitals() {
    orbCtx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);

    // Dessiner le cercle orbital (guide)
    orbCtx.beginPath();
    orbCtx.arc(cx, cy, r, 0, Math.PI * 2);
    orbCtx.strokeStyle = 'rgba(126, 179, 255, 0.12)';
    orbCtx.lineWidth = 1;
    orbCtx.setLineDash([4, 8]);
    orbCtx.stroke();
    orbCtx.setLineDash([]);

    // Étoiles de fond
    stars.forEach(s => {
      s.angle += s.speed;
      const x = cx + Math.cos(s.angle) * s.radius;
      const y = cy + Math.sin(s.angle) * s.radius;
      orbCtx.beginPath();
      orbCtx.arc(x, y, s.size, 0, Math.PI * 2);
      orbCtx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      orbCtx.fill();
    });

    // Particules orbitales colorées avec glow
    orbitals.forEach(o => {
      o.angle += o.speed;
      const x = cx + Math.cos(o.angle) * o.radius;
      const y = cy + Math.sin(o.angle) * o.radius;

      // Glow
      const grad = orbCtx.createRadialGradient(x, y, 0, x, y, o.size * 4);
      grad.addColorStop(0, o.color);
      grad.addColorStop(1, 'transparent');
      orbCtx.beginPath();
      orbCtx.arc(x, y, o.size * 4, 0, Math.PI * 2);
      orbCtx.fillStyle = grad;
      orbCtx.globalAlpha = 0.3;
      orbCtx.fill();
      orbCtx.globalAlpha = 1;

      // Point central
      orbCtx.beginPath();
      orbCtx.arc(x, y, o.size, 0, Math.PI * 2);
      orbCtx.fillStyle = o.color;
      orbCtx.globalAlpha = o.opacity;
      orbCtx.fill();
      orbCtx.globalAlpha = 1;
    });

    requestAnimationFrame(drawOrbitals);
  }
  drawOrbitals();

  /* --- 4. TILT 3D + HALO SOURIS --- */
  let animFrame;
  let currentRX = 0, currentRY = 0;
  let targetRX  = 0, targetRY  = 0;

  wrapper3d.addEventListener('mousemove', (e) => {
    const rect   = wrapper3d.getBoundingClientRect();
    const relX   = e.clientX - rect.left;
    const relY   = e.clientY - rect.top;
    const normX  = (relX / rect.width)  - 0.5;  // -0.5 à 0.5
    const normY  = (relY / rect.height) - 0.5;

    targetRX = -normY * 22; // inclinaison max 22°
    targetRY =  normX * 22;

    // Halo suit la souris
    const haloX = (relX / rect.width)  * 100;
    const haloY = (relY / rect.height) * 100;
    halo.style.background = `radial-gradient(
      circle at ${haloX}% ${haloY}%,
      rgba(39, 86, 245, 0.45) 0%,
      rgba(246, 140, 9, 0.2) 35%,
      transparent 65%
    )`;
  });

  wrapper3d.addEventListener('mouseleave', () => {
    targetRX = 0;
    targetRY = 0;
    halo.style.background = `radial-gradient(
      circle at 50% 50%,
      rgba(39, 86, 245, 0.35) 0%,
      rgba(139, 43, 226, 0.15) 45%,
      transparent 70%
    )`;
  });

  // Lerp smooth pour le tilt
  function smoothTilt() {
    currentRX += (targetRX - currentRX) * 0.12;
    currentRY += (targetRY - currentRY) * 0.12;

    wrapper3d.style.transform =
      `perspective(900px) rotateX(${currentRX}deg) rotateY(${currentRY}deg) scale3d(1.04, 1.04, 1.04)`;

    animFrame = requestAnimationFrame(smoothTilt);
  }

  wrapper3d.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animFrame);
    smoothTilt();
  });
  wrapper3d.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animFrame);
    // Reset propre
    (function resetTilt() {
      currentRX += (0 - currentRX) * 0.1;
      currentRY += (0 - currentRY) * 0.1;
      wrapper3d.style.transform =
        `perspective(900px) rotateX(${currentRX}deg) rotateY(${currentRY}deg) scale3d(1, 1, 1)`;
      if (Math.abs(currentRX) > 0.05 || Math.abs(currentRY) > 0.05) {
        requestAnimationFrame(resetTilt);
      } else {
        wrapper3d.style.transform = '';
      }
    })();
  });

  /* --- 5. RESIZE : recalcule la taille du canvas orbital --- */
  window.addEventListener('resize', () => {
    const newSize = heroImg.offsetWidth || 300;
    orbCanvas.width  = newSize + 80;
    orbCanvas.height = newSize + 80;
    orbCanvas.style.width  = (newSize + 80) + 'px';
    orbCanvas.style.height = (newSize + 80) + 'px';
  });

});