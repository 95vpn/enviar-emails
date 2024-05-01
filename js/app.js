document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        // cc: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputCc = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit');
    const btnReset = document.querySelector('#formulario button[type="reset');
    const spinner = document.querySelector('#spinner')


    console.log(inputMensaje)

    //asignar eventos

    inputEmail.addEventListener('input', validar);
    inputCc.addEventListener('input', sinValidar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(event){
        event.preventDefault();

        resetFormulario()
    });

    function enviarEmail(event) {
        event.preventDefault();

        console.log('enviando...');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');

            resetFormulario();

            //crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('alerta-exito');

            alertaExito.textContent = 'Mensaje enviado';

            formulario.appendChild(alertaExito)
            setTimeout(() => {
                alertaExito.remove()
            }, 2000);
        }, 2000)
    };

    function validar(event) {
        if (event.target.value === '') {
            mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail();
            return;
        }

        if (event.target.id === 'email' && !validarEmail(event.target.value)) {
            mostrarAlerta('El email no es valido', event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail();
            return;
        }



        limpiarAlerta(event.target.parentElement);

        //Asignar los valores
        email[event.target.name] = event.target.value.trim().toLowerCase()

        //comprobar el onjeto de email
        comprobarEmail();
    }

    function sinValidar(event) {
        if (event.target.value === '') {
            mostrarAlerta(`El campo ${event.target.id} NO es obligatorio`, event.target.parentElement);
            return;
        }
        if (event.target.id === 'cc' && !validarEmail(event.target.value)) {
            mostrarAlerta('El email no es valido', event.target.parentElement);
            return;
        }

        limpiarAlerta(event.target.parentElement);

    }

    function mostrarAlerta(mensaje, referencia) {
        //Si ya existe una alerta
        limpiarAlerta(referencia)
        //generar una alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('alerta-error');

        //inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.alerta-error');

        if (alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        console.log(email)
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity');
            btnSubmit.disabled = true;
            return;

        }
        btnSubmit.classList.remove('opacity');
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = 'pointer';
    }

    function resetFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});