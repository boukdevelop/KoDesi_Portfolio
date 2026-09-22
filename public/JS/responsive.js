function initResponsiveMenu() {
    if (window.emailjs) {
        window.emailjs.init('T80cOP5zlvBPktghp');
    }

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) {
        return;
    }

    const closeMenu = () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.classList.toggle('is-active', !isOpen);
        navMenu.classList.toggle('active', !isOpen);
        hamburger.setAttribute('aria-expanded', String(!isOpen));
    };

    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        openMenu();
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.classList.contains('active')) return;
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedOnHamburger = hamburger.contains(event.target);
        if (!clickedInsideMenu && !clickedOnHamburger) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 971) {
            closeMenu();
        }
    });
}

function initContactForm() {
    const form = document.getElementById('formulaire');

    if (!form) {
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!window.emailjs) {
            alert('Le service de contact n\'est pas disponible pour le moment.');
            return;
        }

        window.emailjs.sendForm('service_su191k6', 'template_w3ch8tv', this)
            .then(function() {
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
                        <p>Merci, tes données ont été transmises au laboratoire.</p>
                        <button id="close-modal" class="btn-confirm">D'accord</button>
                    </div>
                `;

                document.body.appendChild(modalOverlay);
                form.reset();

                modalOverlay.addEventListener('click', function(event) {
                    if (event.target.id === 'close-modal' || event.target === modalOverlay) {
                        modalOverlay.remove();
                    }
                });

            }, function(error) {
                alert('Erreur lors de l\'envoi : ' + JSON.stringify(error));
                console.error('Erreur lors de l\'envoie', error);
            });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initResponsiveMenu();
        initContactForm();
    });
} else {
    initResponsiveMenu();
    initContactForm();
}