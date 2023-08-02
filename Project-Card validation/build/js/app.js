document.addEventListener('DOMContentLoaded', () => {
    //formulario
    const form = document.querySelector('#form');
    const name = document.querySelector('#name');
    const cardNumber = document.querySelector('#cardNumber');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    const cvc = document.querySelector('#cvc');
    const sumbit = document.querySelector('#submit');

    //cardsImg
    const numberImg = document.querySelector('#number-img');
    const nameImg = document.querySelector('#name-img');
    const monthImg = document.querySelector('#mm-img');
    const yearImg = document.querySelector('#yy-img');
    const cvcImg = document.querySelector('#cvc-img');
    

    //thanks
    const thanks = document.querySelector('#thanks');
    const thanksBtn = document.querySelector('#thanks-btn')

    //captura los datos
    const datos = {
        name: '',
        cardNumber: '',
        month: '',
        year: '',
        cvc: '',
    }

    //eventos
    name.addEventListener('blur', validar);
    cardNumber.addEventListener('input', validar);
    month.addEventListener('blur', validar);
    year.addEventListener('blur', validar);
    cvc.addEventListener('blur', validar);
    form.addEventListener('submit', enviar);
    thanksBtn.addEventListener('click', thanksBoton);

    //añade un espacio cuando se esta escribiendo en el input de card number
    function addSpace() {
        const inputValue = cardNumber.value.replace(/\s/g, ""); // quitamos todos los espacios encontrados...

        if (inputValue !== '') {
            const result = inputValue.match(/.{1,4}/g).join(" "); // y agregamos un espacio cada 4 caracteres, uso join(" ") para quitar las comas...
            cardNumber.value = result; // Y el valor del input será la cadena modificada.
        }
    }

    //valida lo datos ingresados
    function validar(e) {

        if(e.target.id === 'cardNumber') {
            addSpace();
        }
        if( e.target.value === '') {
            datos[e.target.id] = '';
            const message = 'Can\'t be blank';
            msjHTML(message, e.target.parentElement);
            boton();
            return;
        }
        if( number(e.target.value) && e.target.id === 'name' ) {
            datos[e.target.id] = '';
            const message = 'Wrong format, text only';
            msjHTML(message, e.target.parentElement);
            boton();
            return;
        }
        if( !number(e.target.value.replace(/\s/g, "")) && e.target.id !== 'name' ){
            datos[e.target.id] = '';
            const message = 'Wrong format, number only';
            msjHTML(message, e.target.parentElement);
            boton();
            return;
        }

        //acciones a llevar acabo al pasar la validacion
        deleteHTML(e.target.parentElement);
        datos[e.target.id] = e.target.value;
        buscarPosicion( e.target.id, e.target.value );
        boton();
           
    }

    //valida que solo sean numeros
    function number(dato) {
        const regex = /^[0-9]+$/;
        const valor = dato;
        const respuesta = regex.test(valor);
        return respuesta;
    }

    //valida que solo sea letras



    //crea html del mensaje de error
    function msjHTML(message, reference) {

        deleteHTML(reference);
        const note = document.createElement('P');
        note.textContent = message;
        note.classList.add('note');
        
        const borderRed = reference.querySelector('.field__input');
        borderRed.classList.add('borderRed');

        reference.appendChild(note);

    }

    //eliminarHtml
    function deleteHTML(reference) {

        const msj = reference.querySelector('.note');

        if( msj ) {
            msj.remove();

            const border = reference.querySelector('.field__input');
            border.classList.remove('borderRed');
        }
    }

    //activar boton
    function boton() {

        if( Object.values(datos).includes('') ) {
            sumbit.classList.remove('submitViolette');
            sumbit.style.cursor = 'default';
            sumbit.disabled = true;
            return
        }
        sumbit.classList.add('submitViolette');
        sumbit.style.cursor = 'pointer';
        sumbit.disabled = false;
    
    }

    //simula el envio, y muestra el aviso de thanks
    function enviar(e) {
        e.preventDefault();

        form.classList.add('form__active');
        thanks.classList.add('thanks__active');

    }

    //se activa al presionar el boton continuar del campo thanks
    function thanksBoton(e) {
        e.preventDefault();

        form.classList.remove('form__active');
        thanks.classList.remove('thanks__active');

        reset();
    }

    //resetea el formulario
    function reset() {
        datos.name = '';
        datos.cardNumber = '';
        datos.month = '';
        datos.year = '';
        datos.cvc = '';

        nameImg.textContent = 'Jane Appleseed';
        numberImg.textContent = '0000 0000 0000 0000';
        monthImg.textContent = '00';
        yearImg.textContent = '00';
        cvcImg.textContent = '000';

        form.reset();
        boton();
        
        }

    //busca el campo donde se ingresó el texto, para poyectarlo en la parte de la tarjeta que corresponda
    function buscarPosicion(id, texto) {

        if( id === 'name' ) {
            mostrarNombre(texto);
        } else if ( id === 'cardNumber' ) {
            mostrarCardNumber(texto);
        } else if ( id === 'month' ) {
            mostrarMonth(texto);
        } else if( id === 'year'  ) {
            mostrarYear(texto);
        } else if( id === 'cvc' ) {
            mostrarCvc(texto);
        }

    }

    //funciones que proyectan los datos ingresados en la tarjeta de credito en pantalla
    function mostrarNombre(texto) {
        if( texto.length ) {
            nameImg.textContent = texto;
            return;
        }
        nameImg.textContent = 'Jane Appleseed';
    }

    function mostrarCardNumber(texto) {
        if( texto.length ) {
            numberImg.textContent = texto;
            return;
        }
        numberImg.textContent = '0000 0000 0000 0000';
    }

    function mostrarMonth(texto) {
        if( texto.length ) {
            monthImg.textContent = texto;
            return;
        }
        monthImg.textContent = '00';
    }

    function mostrarYear(texto) {
        if( texto.length ) {
            yearImg.textContent = texto;
            return;
        }
        yearImg.textContent = '00';
    }

    function mostrarCvc(texto) {
        if( texto.length ) {
            cvcImg.textContent = texto;
            return;
        }
        cvcImg.textContent = '000';
    }

});
