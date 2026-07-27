// ==========================================
// CONFIGURATION SUPABASE ET EMAILJS
// ==========================================

// Remplace ces valeurs par celles de ton projet Supabase (Settings > API)
const supabaseUrl = 'https://dalnxsrbjduqynggvwej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbG54c3JiamR1cXluZ2d2d2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMTU0NDksImV4cCI6MjEwMDY5MTQ0OX0.8orbQDLrhuEAqZ4TKLYiTob81F1HJlQVATsOJMg7jrQ';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('inscriptionIA');
const container = document.getElementById('listeInscriptions');

// ==========================================
// 1. CHARGER LES DONNÉES AU DÉMARRAGE
// ==========================================

// Cette fonction va chercher les inscrits dans la base de données quand la page s'ouvre
async function chargerInscriptions() {
    // Récupère les données de la table "candidature", triées par date (les plus récentes en premier)
    const { data, error } = await supabase
        .from('candidature')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erreur lors du chargement des données:", error);
        return;
    }

    // Vide le conteneur avant de le remplir pour éviter les doublons
    container.innerHTML = '';

    // Boucle sur chaque inscrit de la base de données et crée une carte
    data.forEach(inscrit => {
        afficherCarte(inscrit.nom, inscrit.prenom, inscrit.email, inscrit.motivation);
    });
}

// Fonction utilitaire pour générer le HTML d'une carte (réutilisable)
function afficherCarte(nom, prenom, email, message) {
    const card = document.createElement('div');
    card.className = 'card-inscription';

    card.innerHTML = `
        <div class="card-header">
            <h3>${prenom}</h3>
            <span class="badge">Inscrit(e)</span>
        </div>
        <div class="card-body">
            <p class="email-text">✉️ Kodesi${email}</p>
            <p class="message-text">💬 ${message}</p>
        </div>
    `;
    
    // Insère la carte à la fin de la liste (car elles sont déjà triées par Supabase)
    container.appendChild(card);
}

// Lancer le chargement dès que le script est lu
chargerInscriptions();

// ==========================================
// 2. GÉRER LA SOUMISSION DU FORMULAIRE
// ==========================================

if (form) {
    // Un seul événement 'submit' qui gère tout !
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Récupération des valeurs
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!nom || !prenom || !email || !message) return;

        try {
            // ÉTAPE A : Sauvegarder dans la base de données Supabase
            const { error: dbError } = await supabase
                .from('candidature')
                .insert([
                    { nom: nom, prenom: prenom, email: email, motivation: message }
                ]);

            if (dbError) throw dbError; // S'il y a une erreur, on passe dans le "catch" en bas

            // ÉTAPE B : Envoyer l'email via EmailJS
            await emailjs.sendForm('service_su191k6', 'template_w3ch8tv', this);

            // ÉTAPE C : Mettre à jour l'interface visuelle (succès)
            
            // 1. On recharge la liste depuis la base de données (pour afficher le nouveau)
            chargerInscriptions(); 
            
            // 2. On affiche ta modale de succès
            afficherModaleSucces();

            // 3. On vide le formulaire
            form.reset();

        } catch (error) {
            alert("Une erreur est survenue. Veuillez réessayer.");
            console.error("Erreur complète :", error);
        }
    });
}

// ==========================================
// 3. LOGIQUE DE LA MODALE
// ==========================================

function afficherModaleSucces() {
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'success-modal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'flex';

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

    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', function(event) {
        if (event.target.id === 'close-modal' || event.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}