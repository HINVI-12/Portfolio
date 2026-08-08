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