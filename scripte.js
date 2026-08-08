// ===== Menu mobile =====
const toggle = document.getElementById("mobile-menu");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("open");
});

document.querySelectorAll(".nav-links").forEach(link => {
    link.addEventListener("click", () => {
        toggle.classList.remove("active");
        menu.classList.remove("open");
    });
});


// ===== Effet de frappe (typing effect) =====
const words = [
    "Développeur Web (Front / Back) & Mobiles",
    "Technicien en Robotique ",
    "Concepteur de solutions IoT",
    "Créateur de systèmes embarqués",
    "Créateur de flyers et ",
    "Monteur de video"
];
let i = 0;
let j = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
    let currentWord = words[i];
    if (isDeleting) {
        j--;
    } else {
        j++;
    }
    typingElement.textContent = currentWord.substring(0, j);
    let speed = isDeleting ? 50 : 100;
    // Quand le mot est COMPLET
    if (!isDeleting && j === currentWord.length) {
        isDeleting = true;
        speed = 1500; // pause après mot complet
    }
    // Quand le mot est complètement supprimé
    else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}
typeEffect();


// ===== Barres de compétences animées =====
document.addEventListener("DOMContentLoaded", () => {

    const bars = document.querySelectorAll(".bar-fill");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const bar = entry.target;
                const width = bar.getAttribute("data-width");

                bar.style.width = width;

                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5  // 50% de la barre visible
    });

    bars.forEach(bar => {
        observer.observe(bar);
    });

});

// ===== Formulaire de contact (EmailJS) =====
emailjs.init({
    publicKey: "FY2G7sULbbg8ti49B" /*"TA_PUBLIC_KEY"*/
});

document.getElementById("contactForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const btn = document.getElementById("submitBtn");

    btn.disabled = true;
    btn.textContent = "Envoi en cours...";

    const data = {
        nom: document.getElementById("name").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        sujet: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };
    emailjs.send(
        "service_kw3argk",/*TON_SERVICE_ID*/
        "template_aiqoa9q",/*TON_TEMPLATE_ID*/
        data
    )
    .then(() => {

        document.getElementById("form-message").innerHTML =
        "<p style='color:green'>✅ Message envoyé avec succès !</p>";

        this.reset();

        btn.disabled = false;
        btn.textContent = "Envoyer le message";

    })
    .catch((error) => {

        document.getElementById("form-message").innerHTML =
        "<p style='color:red'>❌ Erreur lors de l'envoi.</p>";

        console.error(error);

        btn.disabled = false;
        btn.textContent = "Envoyer le message";
    });
});


// ===== Curseur personnalisé =====
if (window.matchMedia("(pointer: fine)").matches) {
 
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
 
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
 
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
 
        // Le point suit instantanément
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
 
    function animate() {
        // Le cercle suit avec un léger retard (effet fluide)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
 
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
 
        requestAnimationFrame(animate);
    }
    animate();
 
    // Effet au survol des liens et boutons
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
    });
}

/* // ===== Animation de pluie en arrière-plan =====
(function () {
    const canvas = document.getElementById('rain-bg');
    if (!canvas) return; // sécurité : si le canvas n'existe pas, on ne fait rien
 
    const ctx = canvas.getContext('2d');
    let drops = [];
 
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
 
    // Nombre de gouttes (réduit sur mobile pour la performance)
    const dropCount = window.innerWidth < 768 ? 60 : 300;
 
    function createDrop() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 20 + 10,   // longueur de la goutte
            speed: Math.random() * 5 + 3,       // vitesse de chute
            opacity: Math.random() * 0.4 + 0.15 // discrétion
        };
    }
 
    for (let i = 0; i < dropCount; i++) {
        drops.push(createDrop());
    }
 
    function drawRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 1.5;
 
        drops.forEach(drop => {
            ctx.beginPath();
            ctx.globalAlpha = drop.opacity;
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.stroke();
 
            drop.y += drop.speed;
 
            // Quand la goutte sort de l'écran, elle réapparaît en haut
            if (drop.y > canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
        });
 
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawRain);
    }
 
    drawRain();
})();

// ===== Particules connectées (hero) =====
(function () {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const heroSection = canvas.closest('.hero-section');
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };

    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    // Suivi de la souris (uniquement dans la section hero)
    heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Nombre de particules (réduit sur mobile)
    function getParticleCount() {
        return window.innerWidth < 768 ? 35 : 70;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        };
    }

    function initParticles() {
        particles = [];
        const count = getParticleCount();
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }
    initParticles();

    const connectDistance = 130;
    const particleColor = 'rgba(34, 197, 94, 0.6)';   // ajustez à votre --accent
    const lineColor = 'rgba(34, 197, 94, 0.15)';

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mise à jour et dessin des particules
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Rebond sur les bords
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Léger effet de répulsion autour de la souris
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    p.x += (dx / dist) * force * 1.5;
                    p.y += (dy / dist) * force * 1.5;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        });

        // Connexions entre particules proches
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = 1 - dist / connectDistance;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
})(); */