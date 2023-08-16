//partes de la calculadora
const body = document.querySelector('body');
const header = document.querySelector('.calculadora__header');
const pantalla = document.querySelector('.pantalla');
const botonesBg = document.querySelector('.teclado');
const botones = document.querySelectorAll('.boton__tecla');
const eliminarBtn = document.querySelector('#reset');
const del = document.querySelector('.boton__tecla--eliminar')
const igualBtn = document.querySelector('.boton__tecla--igual');

//elementos de toogle
const toggle = document.querySelector('#toggle');
const tema1 = document.querySelector('#tema-1');
const tema2 = document.querySelector('#tema-2');
const tema3 = document.querySelector('#tema-3');

//event listeners
// document.addEventListener('DOMContentLoaded', () => {
//     const div = document.createElement('DIV');
//     div.classList.add('calculadora__temas-circulo')
//     tema1.appendChild(div);
// })

// tema1.addEventListener('click', addTema2);
// tema2.addEventListener('click', addTema3);
// tema3.addEventListener('click', (e) => {
//     deleteTema2();
//     deleteTema3();
// } )

// tema1.addEventListener('click', () => {
//     deleteTema2();
//     deleteTema3();
// })
// tema2.addEventListener('click', addTema2);
// tema3.addEventListener('click', addTema3);

toggle.addEventListener('click', activarTemas)

function activarTemas(e) {
    
    if(!e.target.classList.contains('active-t2') && !e.target.classList.contains('active-t3') && e.target.id === 'tema') {
        e.target.classList.add('active-t2');
        addTema2();
    } else if (e.target.classList.contains('active-t2') && e.target.id === 'tema') {
        e.target.classList.remove('active-t2');
        e.target.classList.add('active-t3');
        addTema3();
    } else if (e.target.classList.contains('active-t3') && e.target.id === 'tema') {
        e.target.classList.remove('active-t3');
        addTema1();
    }
}

function addTema1() {
    deleteTema2();
    deleteTema3();
}
function addTema2() {
    deleteTema3();

    body.classList.add('main-bg-t2');
    header.classList.add('text-green');
    toggle.classList.add('bg-veige-t2');
    pantalla.classList.add('bg-pantalla-t2');
    botonesBg.classList.add('bg-veige-t2');

    botones.forEach(boton => {
        boton.classList.add('boton__tecla-t2')
    })

    eliminarBtn.classList.add('eliminar-t2');
    del.classList.add('eliminar-t2');
    igualBtn.classList.add('igual-t2');
}
function deleteTema2() {
    body.classList.remove('main-bg-t2');
    header.classList.remove('text-green');
    toggle.classList.remove('bg-veige-t2');
    pantalla.classList.remove('bg-pantalla-t2');
    botonesBg.classList.remove('bg-veige-t2');

    botones.forEach(boton => {
        boton.classList.remove('boton__tecla-t2')
    })

    eliminarBtn.classList.remove('eliminar-t2');
    del.classList.remove('eliminar-t2');
    igualBtn.classList.remove('igual-t2'); 
}
function addTema3() {
    deleteTema2();

    body.classList.add('main-bg-t3');
    header.classList.add('text-yellow');
    toggle.classList.add('bg-violet-t3');

    pantalla.classList.add('bg-pantalla-t3');
    botonesBg.classList.add('bg-violet-t3');

    botones.forEach(boton => {
        boton.classList.add('boton__tecla-t3')
    })

    eliminarBtn.classList.add('eliminar-t3');
    del.classList.add('eliminar-t3');
    igualBtn.classList.add('igual-t3');
}
function deleteTema3() {
    body.classList.remove('main-bg-t3');
    header.classList.remove('text-yellow');
    toggle.classList.remove('bg-violet-t3');
    pantalla.classList.remove('bg-pantalla-t3');
    botonesBg.classList.remove('bg-violet-t3');

    botones.forEach(boton => {
        boton.classList.remove('boton__tecla-t3')
    })

    eliminarBtn.classList.remove('eliminar-t3');
    del.classList.remove('eliminar-t3');
    igualBtn.classList.remove('igual-t3');
}
// function circuloToggle(clase, referencia) {
//     div = document.createElement('DIV');
//     div.classList.add('calculadora__temas-circulo', clase);
//     referencia.appendChild(div);
// }