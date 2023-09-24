const inputs = document.querySelectorAll('.cotizador__input')
const porcentajes = document.querySelectorAll('.cotizador__btn');
const resetBtn = document.querySelector('#reset-btn');
const formulario = document.querySelector('#formulario');

const datos = {
    total: '',
    custom: '',
    personas: ''
}

//eventos

//ietera en todos los botones de porcentaje
porcentajes.forEach( porcentaje => {

    porcentaje.addEventListener('click', e => {

        datos.custom = e.target.value;

        calcularPropina();

        sincronizarStorage();

    })

})

//itera en todos los inputs para que el usuario no pueda escribir letras
inputs.forEach( input => input.addEventListener('keypress', soloNumeros));

//itera los formularios para validarlos
inputs.forEach( input => {

    setTimeout( () => {

        input.addEventListener('input', validarFormulario);

    }, 100)

})

//resetea los valores del form, el objeto principal y del html
resetBtn.addEventListener('click', e => {

    e.preventDefault();

    resetCotizador();

})

//funciones

function resetCotizador() {

    const propina = document.querySelector('#propina');
    const totalPorPersona = document.querySelector('#total-propina');

    formulario.reset();

    propina.textContent = '$0.00';
    totalPorPersona.textContent = '$0.00';

    datos.total = '';
    datos.custom = '';
    datos.personas = '';

}

//valida el formulario y llama a la funcion calcularPropina
function validarFormulario(e) {

    if( Number(e.target.value) === 0) {

        mensaje('Can\'t be zero', e.target);
        return;

    }

    if( e.target.id === 'custom') {

        datos.custom = Number(e.target.value / 100);

    } else {

        datos[e.target.id] = Number(e.target.value);

    }

    eliminarMensaje(e.target);

    calcularPropina();

    sincronizarStorage();

}

//calcula la propina y la proyecta en pantalla
function calcularPropina() {

    const propina = document.querySelector('#propina');
    const totalPorPersona = document.querySelector('#total-propina');

    if( !Object.values(datos).includes('') ) {
        
        const{total, custom, personas} = datos;

        const valorPropina = total * custom;

        const totalPorPersonaFinal = (valorPropina + total) / personas;


        propina.textContent = valorPropina;
        totalPorPersona.textContent = totalPorPersonaFinal.toFixed(2);

    }
}

//crea el mensaje de error
function mensaje(contenido, referencia) {

    if( !document.querySelector('.cotizador__mensaje' )) {

        const mensaje = document.createElement('P');
        mensaje.textContent = contenido;
        mensaje.classList.add('cotizador__mensaje');
    
        referencia.classList.add('cotizador__inputBorder')
    
        referencia.parentElement.insertBefore(mensaje, referencia);

    }

}

//elimina el mensaje de error
function eliminarMensaje(referencia) {

    if(document.querySelector('.cotizador__mensaje')) {

        document.querySelector('.cotizador__mensaje').remove();
        referencia.classList.remove('cotizador__inputBorder');

    }

}

//hace que no se puede escribir letras en el input
function soloNumeros(e) {

    let code = e.which ? e.which : e.keyCode;

    if( code == 8 ) {
        e.returnValue = true;
    } else if (code >= 48 && code <= 57) {
        e.returnValue = true;
    } else {
        e.returnValue = false;
    }

}


