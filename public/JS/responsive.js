// 1. Initialisation de mon controle de mail
(function(){
    // Ta clé publique est correcte
    emailjs.init('T80cOP5zlvBPktghp');
})();


// On sélectionne les éléments dans le HTML
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// 1. Fonction pour ouvrir/fermer le menu au clic sur le hamburger
hamburger.addEventListener('click', () => {
    // Bascule les classes d'animation
    hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('active');
    
    // Gère l'accessibilité (pour les lecteurs d'écran)
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isOpen);
});

// 2. BONUS PRO : Fermer le menu si on clique sur un lien
// Très important pour l'expérience utilisateur, surtout si tu as des ancres (#projets)
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Retire les classes actives pour forcer la fermeture
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ==================
//     FORMULAIRE
// ==================

const form = document.getElementById('formulaire');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_su191k6', 'template_w3ch8tv', this)
        .then(function() {
            // 1. CRÉATION DYNAMIQUE DU HTML
            const modalOverlay = document.createElement('div');
            modalOverlay.id = 'success-modal';
            modalOverlay.className = 'modal-overlay';
            modalOverlay.style.display = 'flex'; // On l'affiche direct

            modalOverlay.innerHTML = `
                <div class="modal-content">
                    <div class="icon-check">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Rapport Envoyé !</h2>
                    <p>Merci, tes données ont été transmises au laboratoire.</p>
                    <button id="close-modal" class="btn-confirm">D'accord</button>
                </div>
            `;

            // 2. AJOUT AU BODY
            document.body.appendChild(modalOverlay);
            form.reset();

            // 3. LOGIQUE DE SUPPRESSION (AU CLIC)
            modalOverlay.addEventListener('click', function(event) {
                // Si on clique sur le bouton "D'accord" OU sur le fond noir
                if (event.target.id === 'close-modal' || event.target === modalOverlay) {
                    modalOverlay.remove(); // Supprime complètement le HTML du DOM
                }
            });

        }, function(error) {
            alert("Erreur lors de l'envoi : " + JSON.stringify(error));
            console.error("Erreur lors de l'envoie", error());
        });
    });
}

// emailjs.send("service_su191k6","template_w3ch8tv",{
//     title: "Merci je te vois",
//     name: "Boukala",
//     message: "Je suis heureux de savoir que mon code prends parfaitement bien",
//     email: "boukalafranck@gamil.com",
// });
// Merci, ceci est mon premier site et pour cela je suis heureux de vous présenter le mail envoyé via mon site et l'aide d'EmailJS...