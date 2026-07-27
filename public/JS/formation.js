// ==========================================
// CONFIGURATION SUPABASE
// ==========================================

const supabaseUrl = 'https://dalnxsrbjduqynggvwej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbG54c3JiamR1cXluZ2d2d2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMTU0NDksImV4cCI6MjEwMDY5MTQ0OX0.8orbQDLrhuEAqZ4TKLYiTob81F1HJlQVATsOJMg7jrQ';

let container = null;

async function supabaseRequest(path, options = {}) {
    const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    const response = await fetch(`${supabaseUrl}${path}`, {
        ...options,
        headers
    });

    const responseText = await response.text();
    let data = null;

    try {
        data = responseText ? JSON.parse(responseText) : null;
    } catch (error) {
        data = responseText;
    }

    if (!response.ok) {
        const message = data?.message || response.statusText || 'La requête Supabase a échoué';
        return { data: null, error: new Error(message) };
    }

    return { data, error: null };
}

// ==========================================
// 1. CHARGER LES DONNÉES AU DÉMARRAGE
// ==========================================

async function chargerInscriptions() {
    if (!container) return;

    const { data, error } = await supabaseRequest('/rest/v1/candidature?select=*');

    if (error) {
        console.error('Erreur lors du chargement des données :', error);
        return;
    }

    if (!Array.isArray(data)) return;

    container.innerHTML = '';

    data.forEach(inscrit => {
        afficherCarte(inscrit.nom, inscrit.prenom, inscrit.email, inscrit.motivation);
    });
}

function afficherCarte(nom, prenom, email, message) {
    if (!container) return;

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

    container.appendChild(card);
}

function initialiserFormulaire() {
    const form = document.getElementById('inscriptionIA');
    container = document.getElementById('listeInscriptions');

    if (!form || !container) return;

    chargerInscriptions();

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!nom || !prenom || !email || !message) return;

        try {
            const { error: dbError } = await supabaseRequest('/rest/v1/candidature', {
                method: 'POST',
                headers: {
                    Prefer: 'return=representation'
                },
                body: JSON.stringify([
                    { nom, prenom, email, motivation: message }
                ])
            });

            if (dbError) {
                throw dbError;
            }

            await chargerInscriptions();
            afficherModaleSucces();
            form.reset();
        } catch (error) {
            alert('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
            console.error('Erreur complète :', error);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiserFormulaire);
} else {
    initialiserFormulaire();
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