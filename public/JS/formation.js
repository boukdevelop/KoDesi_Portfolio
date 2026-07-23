
// ==================
//     FORMULAIRE
// ==================

const form = document.getElementById('inscriptionIA');

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
                    <p>Merci, et à bientôt !</p>
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


// ====================
// VERIFICATIONS INSC
// ====================
document.getElementById('inscriptionIA').addEventListener('submit', function(e) {
    // Intercepte le rechargement automatique pour afficher le rendu immédiat
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!nom || !prenom || !email || !message) return;

    // Création du bloc de résultat
    const container = document.getElementById('listeInscriptions');
    const card = document.createElement('div');
    card.className = 'card-inscription';

    card.innerHTML = `
        <div class="card-header">
            <h3>${prenom} ${nom}</h3>
            <span class="badge">Inscrit(e)</span>
        </div>
        <div class="card-body">
            <p class="email-text">✉️ ${email}ss</p>
            <p class="message-text">💬 ${message}</p>
        </div>
    `;

    // Insère la nouvelle carte au sommet de la liste
    container.prepend(card);

    // Réinitialise le formulaires
    this.reset();
});