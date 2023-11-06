const toggle = document.querySelector('#toggle');
let lightMode = [];

document.addEventListener('DOMContentLoaded', verifyLightMode);
toggle.addEventListener('click', activateLightMode);

function verifyLightMode() {
    lightMode = JSON.parse(localStorage.getItem('lightMode')) || [];

    if(lightMode.length) {
        activateLightMode();

        lightMode = [true];
        synLocalStorage();
    }
}

function activateLightMode() {
    const body = document.querySelector('body');
    const header = document.querySelector('.header');
    const toggle = document.querySelector('.toggle');
    const followersCards = document.querySelectorAll('.followers-card');
    const overviewH3 = document.querySelector('.overview h3');
    const overviewCards = document.querySelectorAll('.overview-card');
    const footer = document.querySelector('.footer');

    body.classList.toggle('active');
    header.classList.toggle('active');
    toggle.classList.toggle('active');
    overviewH3.classList.toggle('active');
    footer.classList.toggle('active');

    followersCards.forEach(card => {
        card.classList.toggle('active');
    })

    overviewCards.forEach(card => {
        card.classList.toggle('active');
    })

    if(lightMode.length) {
        lightMode = [];
    } else {
        lightMode = [true];
    }

    synLocalStorage();
}

function synLocalStorage() {
    localStorage.setItem('lightMode', JSON.stringify(lightMode));
}
