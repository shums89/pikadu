const menuToggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function (evt) {
    evt.preventDefault();
    menu.classList.toggle('visible');
})
