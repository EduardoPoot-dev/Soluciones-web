const result = document.querySelector('#result');

window.addEventListener('load', () => {
    nuevaFrase();

    const adviceBtn = document.querySelector('#advice-btn');
    adviceBtn.addEventListener('click', nuevaFrase);
})

function nuevaFrase() {
    const url = 'https://api.adviceslip.com/advice';

    spinner();

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( objeto => {
            limpiarHTM();
            mostrarMensjae(objeto);
        });
}

function mostrarMensjae(objeto) {
    const {slip: {id, advice}} = objeto;

    const titulo = document.createElement('h2');
    titulo.classList.add('advice__number');
    titulo.textContent = `Advice #${id}`;

    const frase = document.createElement('p');
    frase.classList.add('advice__text');
    frase.textContent = `"${advice}"`;

    result.appendChild(titulo);
    result.appendChild(frase);
}

function spinner() {
    limpiarHTM();
    
    const spinnerDiv = document.createElement('div');
    spinnerDiv.classList.add('spinner');
    result.appendChild(spinnerDiv);
    
}

function limpiarHTM() {
    while( result.firstChild ) {
        result.removeChild(result.firstChild);
    }
}