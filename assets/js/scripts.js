

let inicio = document.querySelector('#inicio');
let parrafo = document.querySelector('#simuladorTexto');
//let title = document.querySelector('#pruebaTitle');

let resultadoLlamada = document.querySelector('#resultado_llamada');
let leadConectadoForm = document.querySelector('#lead_conectado_form');
let mensajeVoz = document.querySelector('#mensaje_voz_form');
let motivoForm = document.querySelector('#motivo_form');
let nroLlamadosCol = document.querySelector('#sin_respuesta_form');
let contactoExitoso = document.querySelector('#contacto_exitoso_form');
let envioDocumentacionForm = document.querySelector('#estado_envio_documentacion');

//let resultadoLlamadaForm = document.getElementsByName('resultado_llamada_form');

let exito = '';

let textRellamar = 'Programar una nueva reunión o llamada atento a la disponibilidad del LEAD.';

let llamados = '';

parrafo.textContent = 'Elige el origen del LEAD';
//title.textContent = 'Simulador ruta a seguir con un LEAD';

inicio.addEventListener('change', firstSelect);

function firstSelect() {

    let eleccion = inicio.value;

    if (eleccion) {

        parrafo.textContent = 'Elige el resultado de la llamada';

        uncheckResultado();

        //reset 
        removeAll();

        addResultadoLlamada();

    } if (eleccion == 'origen') {

        parrafo.textContent = 'Elige el origen del LEAD';

        resetForm();

    }
}

resultadoLlamada.addEventListener('change', llamadoForm);

function llamadoForm() {

    let eleccionRespuesta = document.querySelector('input[name="resultado_llamada_form"]:checked').value;

    console.log(eleccionRespuesta);

    //reset 
    removeMotivo();
    removeContactoExitoso();

    /* ------ uncheck Conectado ------ */

    uncheckLuegoPrimerContacto();
    uncheckEtapaNegocio();
    uncheckMotivo();

    /* ------ uncheck mensajeVoz ----- */

    uncheckDejoMensaje();

    /* ----- uncheck NroLlamados ----- */

    uncheckNroLlamados();
    

    if (eleccionRespuesta == 'conectado') {

        addLeadConectado();

        parrafo.textContent = 'LEAD conectado, elige el estado en que se encuentra.';

        leadConectadoForm.addEventListener('change', leadConectado);

        function leadConectado() {

            let eleccionLeadConectado = document.querySelector('input[name="luego_primer_contacto"]:checked').value;

            console.log(eleccionLeadConectado);

            /* envioDocumentacionForm.classList.remove("d-block");
            envioDocumentacionForm.classList.add("d-none"); */

            removeMotivo();

            uncheckEtapaNegocio();
            uncheckNroLlamados();
            uncheckMotivo();

            if (eleccionLeadConectado == 'contactado') {

                addContactoExitoso();
                
                removeMotivo();

                /* envioDocumentacionForm.classList.remove("d-block");
                envioDocumentacionForm.classList.add("d-none"); */

                parrafo.textContent = 'Si hubo un contacto exitoso ¿En que etapa del negocio se encuentra el LEAD?';

                contactoExitoso.addEventListener('change', contactoOk);

                function contactoOk() {

                    let eleccionContactoExitoso = document.querySelector('input[name="etapa_negocio"]:checked').value;

                    /* uncheckEnvioDocumentacion(); */

                    
                    uncheckMotivo();
                    uncheckEnvioDocumentacion();
                    
                    removeEnvioDocumentacionForm();
                    removeMotivo();


                    console.log(eleccionContactoExitoso);

                    if (eleccionContactoExitoso == 'documentacion' ) {

                        addEnvioDocumentacionForm();

                       /*  uncheckEnvioDocumentacion(); */

                        parrafo.textContent = 'Completar estado del envio de información por parte del LEAD.';

                       envioDocumentacionForm.addEventListener('change', envioDocumentacion);

                        function envioDocumentacion() {


                            let eleccionEnvioDocumentacion = document.querySelector('input[name="envio_documentacion"]:checked').value;

                            console.log(eleccionEnvioDocumentacion);

                            if (eleccionEnvioDocumentacion == 'completo') {

                                parrafo.textContent = 'Continuar con el proceso';

                            } if (eleccionEnvioDocumentacion == 'incompleto') {

                                parrafo.textContent = 'Solicitar que corrija la información y reprogramar un contacto para validar la misma.';

                            }
                        } 

                    } if (eleccionContactoExitoso == 'descartado' ) {

                        addMotivo();

                        parrafo.textContent = 'Elige un motivo para descartar el LEAD';

                    } if (eleccionContactoExitoso == 'analizando' ) {

                        exito = 'Si el LEAD se encuentra analizando la propuesta es necesario AGENDAR UNA NUEVA REUNIÓN O LLAMADA.';

                        parrafo.textContent = exito;
                    
                    } if (eleccionContactoExitoso == 'oportunidad' ) {

                        exito = 'Si el LEAD se encuentra en la etapa "oportunidad de venta", acordar un plazo para el envió de la documentación y generar una agenda.';

                        parrafo.textContent = exito;
                                      
                    } if (eleccionContactoExitoso == 'preinscripto' ) {

                        exito = 'Si el LEAD se encuentra en esta etapa, aguardar el pago de su matricula para cerrar la venta.';

                        parrafo.textContent = exito;
                    
                    } if (eleccionContactoExitoso == 'matriculado' ) {

                        exito = 'Cierre de venta.';

                        parrafo.textContent = exito;
                    
                    }
                }

            } else {

                removeContactoExitoso();

            } if (eleccionLeadConectado == 'no_califica') {

                parrafo.textContent = 'El LEAD fue descartado por no cumplir con los requisitos necesarios.';

            } if (eleccionLeadConectado == 'recontactar') {

                parrafo.textContent = textRellamar;

            } if (eleccionLeadConectado == 'no_contesta') {

                addNroLlamados();

                parrafo.textContent = noContesta + '¿Cuantas veces se intento contactar?';

            } else {

                removeNroLlamados();

                //parrafo.textContent = noContesta + '¿Cuantas veces se intento contactar?';
            }

        }


    } else {

        removeLeadConectado();

        //parrafo.textContent = 'ELige una Opción1';

    } if (eleccionRespuesta == 'mensaje_voz') {

        addMensajeVoz();

        parrafo.textContent = 'LEAD dejó un mensaje de voz, elige una acción.';

    } else {

        removeMensajeVoz();

        //parrafo.textContent = 'ELige una Opción2';

    } if (eleccionRespuesta == 'numero_incorrecto') {

        parrafo.textContent = 'El número del LEAD era incorrecto, descartar.';

    } if (eleccionRespuesta == 'ocupado' || eleccionRespuesta == 'sin_respuesta') {

        let noContesta = '';

        switch (eleccionRespuesta) {

            case 'ocupado':
                noContesta = 'El LEAD se encontraba ocupado. ';
                break;

            case 'sin_respuesta':
                noContesta = 'El LEAD no responde. ';
                break;

        }

        addNroLlamados();

        parrafo.textContent = noContesta + '¿Cuantas veces se intento contactar?';

    } else {

        removeNroLlamados();

    }

}

mensajeVoz.addEventListener('change', mensajeVozForm);

function mensajeVozForm() {

    let eleccionVozForm = document.querySelector('input[name="dejo_mensaje"]:checked').value;

    console.log(eleccionVozForm);

    uncheckMotivo();

    if (eleccionVozForm == 'rellamar') {

        parrafo.textContent = textRellamar;

    } if (eleccionVozForm == 'decartado') {

        addMotivo();

        parrafo.textContent = 'Elige un motivo para descartar el LEAD';

    } else {

        removeMotivo();

    }

}

motivoForm.addEventListener('change', motivoChoice);

function motivoChoice() {

    let eleccionMotivo = document.querySelector('input[name="motivo_descarte"]:checked').value;

    console.log(eleccionMotivo);

    if (eleccionMotivo) {

        switch (eleccionMotivo) {
            case 'no_responde':
                parrafo.textContent = 'El LEAD fue descartado por dejar de responder.';
                break;

            case 'no_cumple_requisitos':
                parrafo.textContent = 'El LEAD fue descartado por no cumplir con los requisitos necesarios.';
                break;

            case 'proxima_version':
                parrafo.textContent = 'El LEAD fue descartado por elegir una proxima versión.';
                break;

            case 'personales':
                parrafo.textContent = 'El LEAD fue descartado por motivos personales.';
                break;

            case 'precio':
                parrafo.textContent = 'El LEAD fue descartado por problemas con el precio.';
                break;

            case 'horario':
                parrafo.textContent = 'El LEAD fue descartado por problemas con los horarios.';
                break;

            case 'modalidad':
                parrafo.textContent = 'El LEAD fue descartado por problemas con la modalidad de cursado.';
                break;

            case 'otro_programa':
                parrafo.textContent = 'El LEAD fue descartado porque se inscribio en otro programa.';
                break;

            case 'no_le_interesa':
                parrafo.textContent = 'El LEAD fue descartado porque no le interesa el programa.';
                break;
        }

    } else {

        parrafo.textContent = 'Elige un motivo para descartar el LEAD';

    }
}


nroLlamadosCol.addEventListener('change', nroLlamados);

function nroLlamados() {

    let nroLlamadosForm = document.querySelector('input[name="nroLlamados"]:checked').value;

    console.log(nroLlamadosForm);

    if (nroLlamadosForm == '4') {

        parrafo.textContent = 'El LEAD fue contactado cuatro veces, descartar.';

    } else {

        switch (nroLlamadosForm) {
            case '1':
                llamados = 'una vez. ';
                break;

            case '2':
                llamados = 'dos veces. ';
                break;

            case '3':
                llamados = 'tres veces. ';
                break;
        }

        parrafo.textContent = 'El LEAD fue contactado ' + llamados + textRellamar;

    }
}

/* =============================== */
/*         Uncheck Function        */
/* =============================== */

function uncheckResultado() {
    var x = document
        .querySelectorAll('input[name="resultado_llamada_form"]');

    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

function uncheckDejoMensaje() {
    var x = document
        .querySelectorAll('input[name="dejo_mensaje"]');

    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

function uncheckLuegoPrimerContacto() {
    var x = document
        .querySelectorAll('input[name="luego_primer_contacto"]');

    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

function uncheckNroLlamados() {
    var x = document
        .querySelectorAll('input[name="nroLlamados"]');

    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

function uncheckEtapaNegocio() {
    var x = document
        .querySelectorAll('input[name="etapa_negocio"]');

    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

function uncheckEnvioDocumentacion() {
    var x = document
        .querySelectorAll('input[name="envio_documentacion"]');

    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

function uncheckMotivo() {
    var x = document
        .querySelectorAll('input[name="motivo_descarte"]');

    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

/* =============================== */
/*            Reset Form           */
/* =============================== */

function resetForm() {
    const select = document.getElementById('inicio');

    select.value = 'origen';

    parrafo.textContent = 'Elige el origen del LEAD';

    uncheckResultado();

    //reset 
    removeAll();

} 

function removeAll() {
    removeMotivo();
    removeMensajeVoz();
    removeResultadoLlamada();
    removeContactoExitoso();
    removeLeadConectado();
    removeNroLlamados();
    removeEnvioDocumentacionForm();
}

/* =============================== */
/*          Add/Remove box         */
/* =============================== */

function addMotivo() {    
    motivoForm.classList.remove("d-none");
    motivoForm.classList.add("d-block");
}

function removeMotivo() {
    motivoForm.classList.remove("d-block");
    motivoForm.classList.add("d-none");
}


function addMensajeVoz() {
    mensajeVoz.classList.remove("d-none");
    mensajeVoz.classList.add("d-block");
}

function removeMensajeVoz() {
    mensajeVoz.classList.remove("d-block");
    mensajeVoz.classList.add("d-none");
}

function addContactoExitoso() {
    contactoExitoso.classList.remove("d-none");
    contactoExitoso.classList.add("d-block");
}

function removeContactoExitoso() {
    contactoExitoso.classList.remove("d-block");
    contactoExitoso.classList.add("d-none");
}

function addResultadoLlamada() {
    resultadoLlamada.classList.remove("d-none");
    resultadoLlamada.classList.add("d-block");
}

function removeResultadoLlamada() {
    resultadoLlamada.classList.remove("d-block");
    resultadoLlamada.classList.add("d-none");
}

function addNroLlamados() {
    nroLlamadosCol.classList.remove("d-none");
    nroLlamadosCol.classList.add("d-block");
}

function removeNroLlamados() {
    nroLlamadosCol.classList.remove("d-block");
    nroLlamadosCol.classList.add("d-none");
}

function addEnvioDocumentacionForm() {
    envioDocumentacionForm.classList.remove("d-none");
    envioDocumentacionForm.classList.add("d-block");
}

function removeEnvioDocumentacionForm() {
    envioDocumentacionForm.classList.remove("d-block");
    envioDocumentacionForm.classList.add("d-none");
}

function addLeadConectado() {
    leadConectadoForm.classList.remove("d-none");
    leadConectadoForm.classList.add("d-block");   
}

function removeLeadConectado() {
    leadConectadoForm.classList.remove("d-block");
    leadConectadoForm.classList.add("d-none");
}