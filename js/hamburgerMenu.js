/// MENU DE HAMBURGUESA ///
function hambugerMenu() {
    document.addEventListener('click', e => {
        if (e.target.matches('.menu-h') || e.target.matches(`${'.menu-h'} *`)) { 
            document.getElementById('panel').classList.toggle('is-active');
            document.querySelector('.menu-h').classList.toggle('is-active'); 
        }
        if (e.target.matches('.a') || e.target.matches('i')) {
            document.getElementById('panel').classList.remove('is-active');
            document.querySelector('.menu-h').classList.remove('is-active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    hambugerMenu();
});