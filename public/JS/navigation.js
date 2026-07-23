const active = document.querySelector('.nav-menu a.active');

if (active) {
    active.classList.remove('active');
}

const currentPage = window.location.pathname;

const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});