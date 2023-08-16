//calculadora
const body = document.querySelector('#body');
const header = document.querySelector('#header');
const pantalla = document.querySelector('#pantalla');
const botonesBg = document.querySelector('#calculadora');

//botones de la calculadora
const botones = document.querySelectorAll('.boton__tecla');
const eliminarBtn = document.querySelector('#reset');
const del = document.querySelector('#del');
const igualBtn = document.querySelector('#igual');
const numeros = document.querySelectorAll('.numero');
const operador = document.querySelectorAll('.operador');
const punto = document.querySelector('#punto');
const menos = document.querySelector('#menos');

//elementos de toogle
const toggle = document.querySelector('#toggle');
const circuloToggle = document.querySelector('#tema');

//evento al dar click dentro del toogle
toggle.addEventListener('click', activarTemas);

/*si no tiene ninguna clase que aplica nuevo tema, le agrega el tema dos, si ya tiene el tema 2, lo elimina y le aplica el tema3 
y si tiene el tema 3 lo elimina quedando el elemento sin ninguna clase de */
function activarTemas(e) {
    
    if(e.target.classList.contains('active-t2') && e.target.id === 'tema') {
        e.target.classList.remove('active-t2');
        e.target.classList.add('active-t3');
        addTema3();
        return;
    }

    if(e.target.classList.contains('active-t3') && e.target.id === 'tema') {
        e.target.classList.remove('active-t3');
        addTema1();
        return;
    }

    if(e.target.id === 'tema') {
        e.target.classList.add('active-t2');
        addTema2();
        return;
    }
}

//elimina todas las clases, quedando por defecto el tema 1
function addTema1() {
    deleteTema2();
    deleteTema3();
}

//añade las clases necesarias para el tema 2, y elimina las clases de tema 3 si ya estaban
function addTema2() {
    deleteTema3();

    body.classList.add('main-bg-t2');
    header.classList.add('text-green');
    toggle.classList.add('bg-veige-t2', 'transition');
    circuloToggle.classList.add('circulo-t2')
    pantalla.classList.add('bg-pantalla-t2');
    botonesBg.classList.add('bg-veige-t2');

    botones.forEach(boton => {
        boton.classList.add('boton__tecla-t2')
    })

    eliminarBtn.classList.add('eliminar-t2');
    del.classList.add('eliminar-t2');
    igualBtn.classList.add('igual-t2');
}

//elimina las clases del tema 2
function deleteTema2() {
    body.classList.remove('main-bg-t2');
    header.classList.remove('text-green');
    toggle.classList.remove('bg-veige-t2');
    circuloToggle.classList.remove('circulo-t2');
    pantalla.classList.remove('bg-pantalla-t2');
    botonesBg.classList.remove('bg-veige-t2');

    botones.forEach(boton => {
        boton.classList.remove('boton__tecla-t2')
    })

    eliminarBtn.classList.remove('eliminar-t2');
    del.classList.remove('eliminar-t2');
    igualBtn.classList.remove('igual-t2'); 
}

//añade las clases necesarias para el tema 3, y elimina las clases de tema 3 si ya estaban
function addTema3() {
    deleteTema2();

    body.classList.add('main-bg-t3');
    header.classList.add('text-yellow');
    toggle.classList.add('bg-violet-t3');
    circuloToggle.classList.add('circulo-t3')
    pantalla.classList.add('bg-pantalla-t3');
    botonesBg.classList.add('bg-violet-t3');

    botones.forEach(boton => {
        boton.classList.add('boton__tecla-t3')
    })

    eliminarBtn.classList.add('eliminar-t3');
    del.classList.add('eliminar-t3');
    igualBtn.classList.add('igual-t3');
}

//elimna las clases del tema 3
function deleteTema3() {
    body.classList.remove('main-bg-t3');
    header.classList.remove('text-yellow');
    toggle.classList.remove('bg-violet-t3');
    circuloToggle.classList.remove('circulo-t3');
    pantalla.classList.remove('bg-pantalla-t3');
    botonesBg.classList.remove('bg-violet-t3');

    botones.forEach(boton => {
        boton.classList.remove('boton__tecla-t3')
    })

    eliminarBtn.classList.remove('eliminar-t3');
    del.classList.remove('eliminar-t3');
    igualBtn.classList.remove('igual-t3');
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//calculadora
const datos = {
    num1: '',
    operador: '',
    num2: '',
    resultado: ''
}

//Events listeners
//Al presionar un numero. Si ya dio un resultado al clickear igual, y se presiona de nuevo un numero, se resetea
numeros.forEach( numero => {
    numero.addEventListener('click', () => {

        if(!Object.values(datos).includes('')) {
            formatear();
            valoresHTML('');
        }

        const valor = numero.value.toString();
        clickBtn(valor);

    }) 
})

//añade un operador al calculo. si ya escribio dos numeros, al presionar otro signo continua la operacion
operador.forEach( calculo => {
    calculo.addEventListener('click', () => {

        if(datos.num1 !== '' && datos.num2 !== '' && datos.operador !== '') {
            const resultado = operacion();
            datos.resultado = resultado.toString();
            valoresHTML(datos.resultado);
            seguirOperacion();
        }

        if(datos.num1 !== '') {
            const signo = calculo.value;
            datos.operador = signo;
        }

    })
})

//si ya se escribio dos numeros, te añade el resultado
igualBtn.addEventListener('click', () => {

    if(datos.num1 !== '' && datos.num2 !== '' && datos.operador !== '') {
        const resultado = operacion();
        datos.resultado = resultado.toString();
        valoresHTML(datos.resultado);
    }

})

//elimina un caracter de numero
del.addEventListener('click', () => {

    if(!Object.values(datos).includes('')) {
        seguirOperacion();
        datos.num1 = datos.num1.slice(0, -1);
        valoresHTML(datos.num1);
        return;
    }

    if(datos.operador !== '' && datos.num2.length === 0) {
        datos.num1 = datos.num1.slice(0, -1);
        datos.operador = '';
        valoresHTML(datos.num1);
        return;
    }

    if(datos.operador !== '') {
        datos.num2 = datos.num2.slice(0, -1);
        valoresHTML(datos.num2);
        return;
    }

    datos.num1 = datos.num1.slice(0, -1);
    valoresHTML(datos.num1);

})

//añade un punto
punto.addEventListener('click', () => {
    const signo = punto.value;

    if(!Object.values(datos).includes('')) {
        seguirOperacion();
        agregarPunto(datos.num1, signo);
        return;
    }

    if(datos.operador !== '') {
        agregarPunto(datos.num2, signo);
        return;
    }

    agregarPunto(datos.num1, signo);

})

//resetea la calculadora
eliminarBtn.addEventListener('click', () => {

    formatear();
    valoresHTML('');

})

//permite operar con numeros negativos y hacer restas comunes
menos.addEventListener('click', () => {
    const valor = menos.value;
    
    if(datos.num1 === '-' || datos.num2 === '-') return;

    if(datos.num1 !== '' && datos.num2 !== '' && datos.operador !== '') {
        const resultado = operacion();
        datos.resultado = resultado.toString();
        valoresHTML(datos.resultado);
        seguirOperacion();
    }

    if(datos.num1 !== '' && datos.operador === '') {
        datos.operador = valor;
        return;
    }

    if(datos.num2 === '' && datos.operador !== '') {
        guardarNum2(valor);
        return;
    }

    if(datos.num1 === '' && datos.operador === '') {
        guardarNum1(valor);
        return;
    }

})

//funciones de la calculadora

//agrega el punto, si ya lo tiene, no hace nada
function agregarPunto(valor, signo) {
    const numero = valor;

    if(numero.includes('.')) {
        return;
    }
    clickBtn(signo);
    
}

//imprime los valores en pantalla
function valoresHTML(numero) {
    const pantalla = document.querySelector('#pantalla-numero');
    pantalla.innerHTML = '';
    pantalla.innerHTML = numero;
}

//se ejecuta al presionar un numero o un operador
function clickBtn(valor) {

    if(datos.operador !== '') {
        guardarNum2(valor);
        return;
    }
    guardarNum1(valor);

}

//guarda el primer numero que se va a operar
function guardarNum1(valor) {

    if(datos.num1 !== '') {
        const numAnterior = datos.num1;
        datos.num1 = numAnterior + valor;
        valoresHTML(datos.num1);
        return;
    }
    datos.num1 = valor;
    valoresHTML(datos.num1);

}

//guarda el segundo numero que se va a operar
function guardarNum2(valor) {

    if(datos.num2 !== '') {
        const numAnterior = datos.num2;
        datos.num2 = numAnterior + valor;
        valoresHTML(datos.num2);
        return;
    }
    datos.num2 = valor;
    valoresHTML(datos.num2);

}

//hace las operaciones
function operacion() {
    const {num1, operador, num2} = datos;

    switch(operador) {
        case '+':
            return Number.parseFloat(num1) + Number.parseFloat(num2);
            break;
        case '-':
            return Number.parseFloat(num1) - Number.parseFloat(num2);
            break;
        case '*':
            return Number.parseFloat(num1) * Number.parseFloat(num2);
            break;
        case '/': 
            return Number.parseFloat(num1) / Number.parseFloat(num2);
            break;
        default:
            break;   
    }

}

//formatea todo, a excepcion del primer numero para que se pueda seguir ejecutando el codigo
function seguirOperacion() {
    datos.num1 = datos.resultado;
    datos.operador = '';
    datos.num2 = '';
    datos.resultado = '';
}

//formatea todo
function formatear() {
    datos.num1 = '';
    datos.operador = '';
    datos.num2 = '';
    datos.resultado = '';
}
/*code by eduardo poot*/