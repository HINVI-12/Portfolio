    //Menu hamburger
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

    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
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
                "<p style='color:white'>✅ Message envoyé avec succès !</p>";

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