

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

  if ( eleccion ) {
    
        //inicio.classList.remove("d-block");
        //inicio.classList.add("d-none");

        parrafo.textContent = 'Elige el resultado de la llamada';

        resultadoLlamada.classList.remove("d-none");
        resultadoLlamada.classList.add("d-block");

    } else {
        
        parrafo.textContent = 'Elige el origen del Lead';

        resultadoLlamada.classList.add("d-none");
        resultadoLlamada.classList.remove("d-block");
    
    }
}

resultadoLlamada.addEventListener('change', llamadoForm);

function llamadoForm() {

    let eleccionRespuesta = document.querySelector('input[name="resultado_llamada_form"]:checked').value;

    //let eleccionRespuesta = resultadoLlamadaForm;

    console.log (eleccionRespuesta);

    //reset 
    motivoForm.classList.remove("d-block");
    motivoForm.classList.add("d-none");

    contactoExitoso.classList.remove("d-block");
    contactoExitoso.classList.add("d-none");

    envioDocumentacionForm.classList.remove("d-block");
    envioDocumentacionForm.classList.add("d-none");

    /* =============================== */
    /*        uncheck Conectado        */
    /* =============================== */


    uncheckLuegoPrimerContacto();

    function uncheckLuegoPrimerContacto() {
        var x = document
            .querySelectorAll('input[name="luego_primer_contacto"]');

        for (var i = 0; i < x.length; i++) {
            x[i].checked = false;
        }
    }
    
    /* =============================== */
    /*        uncheck mensajeVoz       */
    /* =============================== */

    uncheckDejoMensaje();

    function uncheckDejoMensaje() {
        var x = document
            .querySelectorAll('input[name="dejo_mensaje"]');

        for (var i = 0; i < x.length; i++) {
            x[i].checked = false;
        }
    }



    /* =============================== */
    /*       uncheck nroLlamados       */
    /* =============================== */

    uncheckNroLlamados();



/*     let radio = document.querySelector('input[type=radio][name=nroLlamados]:checked');
    radio.checked = false; */
    

    //var radio = document.querySelector('input[type=radio][name=nroLlamados]:checked');
    //radio.checked = false;

    if ( eleccionRespuesta == 'conectado' ) {

        leadConectadoForm.classList.remove("d-none");
        leadConectadoForm.classList.add("d-block");
        
        envioDocumentacionForm.classList.remove("d-block");
        envioDocumentacionForm.classList.add("d-none");

        parrafo.textContent = 'LEAD conectado, elige el estado en que se encuentra.';

        leadConectadoForm.addEventListener( 'change', leadConectado );

        function leadConectado() {
            
            let eleccionLeadConectado = document.querySelector('input[name="luego_primer_contacto"]:checked').value;
        
            console.log (eleccionLeadConectado);

            envioDocumentacionForm.classList.remove("d-block");
            envioDocumentacionForm.classList.add("d-none");



            uncheckEtapaNegocio();
            uncheckNroLlamados();

            if ( eleccionLeadConectado == 'contactado' ) {
                                          
                contactoExitoso.classList.remove("d-none");
                contactoExitoso.classList.add("d-block");

                //uncheckEtapaNegocio();

                envioDocumentacionForm.classList.remove("d-block");
                envioDocumentacionForm.classList.add("d-none");

                parrafo.textContent = 'Si hubo un contacto exitoso ¿En que etapa del negocio se encuentra el LEAD?';

                contactoExitoso.addEventListener( 'change', contactoOk );

                function contactoOk() {

                    let eleccionContactoExitoso = document.querySelector('input[name="etapa_negocio"]:checked').value;

                    uncheckEnvioDocumentacion();
                    console.log (eleccionContactoExitoso);

                    if ( eleccionContactoExitoso == 'envio_documentacion' ) {

                    //uncheckEtapaNegocio();
                        envioDocumentacionForm.classList.remove("d-none");
                        envioDocumentacionForm.classList.add("d-block");

                        uncheckEnvioDocumentacion();
                        parrafo.textContent = 'Completar estado del envio de información por parte del LEAD.';

                        envioDocumentacionForm.addEventListener( 'change', envioDocumentacion);

                        function envioDocumentacion() {


                            let eleccionEnvioDocumentacion = document.querySelector('input[name="envio_documentacion"]:checked').value;

                            console.log(eleccionEnvioDocumentacion);

                            if (eleccionEnvioDocumentacion == 'completo' ) {

                                parrafo.textContent = 'Genial';
                            
                            }  if (eleccionEnvioDocumentacion == 'incompleto' ) {

                                parrafo.textContent = 'Solicitar que corrija la información y reprogramar un contacto para validar la misma.';

                            } 
                        }

                    } else {


                        uncheckEnvioDocumentacion();
                        envioDocumentacionForm.classList.remove("d-block");
                        envioDocumentacionForm.classList.add("d-none");

                        switch (eleccionContactoExitoso) {
                            case 'analizando':
                                
                                exito = 'Si el lead se encuentra analizando la propuesta es necesario AGENDAR UNA NUEVA REUNIÓN O LLAMADA.';
    
                                break;
                            case 'oportunidad':
                                                            
                                exito = 'Si el LEAD se encuentra en la etapa "oportunidad de venta", acordar un plazo para el envió de la documentación y generar una agenda.';
                        
    
                                break;
                            case 'preinscripto':
                                                            
                                exito = 'Si el LEAD se encuentra en esta etapa, aguardar el pago de su matricula para cerrar la venta.';
                                
    
                                break;
                            case 'matriculado':
                                                            
                                exito = 'Cierre de venta.';
                                
    
                                break;
                            case 'descartado':
                                                            
                                exito = 'El LEAD fue decartado';                                
    
                                break;
                        
                        }
    
                        parrafo.textContent = exito;
                    }

                }

            } else {

                contactoExitoso.classList.remove("d-block");
                contactoExitoso.classList.add("d-none");

            } if ( eleccionLeadConectado == 'no_califica' ) {

                parrafo.textContent = 'El LEAD fue descartado por no cumplir con los requisitos necesarios.';

            } if ( eleccionLeadConectado == 'recontactar' ) {

                parrafo.textContent = textRellamar;

            } if ( eleccionLeadConectado == 'no_contesta' ) {

                nroLlamadosCol.classList.add("d-block");
                nroLlamadosCol.classList.remove("d-none");
        
                parrafo.textContent = noContesta + '¿Cuantas veces se intento contactar?';

            } else {

                nroLlamadosCol.classList.remove("d-block");
                nroLlamadosCol.classList.add("d-none");
        
                //parrafo.textContent = noContesta + '¿Cuantas veces se intento contactar?';
            }

        }


    } else {
        
        leadConectadoForm.classList.remove("d-block");
        leadConectadoForm.classList.add("d-none");

        //parrafo.textContent = 'ELige una Opción1';

    } if ( eleccionRespuesta == 'mensaje_voz' ) {

        mensajeVoz.classList.add("d-block");
        mensajeVoz.classList.remove("d-none");

        parrafo.textContent = 'LEAD dejó un mensaje de voz, elige una acción.';

    } else {
        
        mensajeVoz.classList.remove("d-block");
        mensajeVoz.classList.add("d-none");

        //parrafo.textContent = 'ELige una Opción2';

    } if ( eleccionRespuesta == 'numero_incorrecto' ) {

        parrafo.textContent = 'El número del LEAD era incorrecto, descartar.';

    } if ( eleccionRespuesta == 'ocupado' || eleccionRespuesta == 'sin_respuesta' ) {

        let noContesta = '';

        switch (eleccionRespuesta) {
            case 'ocupado':
                
                noContesta = 'El LEAD se encontraba ocupado. ';

                break;

            case 'sin_respuesta':
                
                noContesta = 'El LEAD no responde. ';

                break;

        }

        nroLlamadosCol.classList.add("d-block");
        nroLlamadosCol.classList.remove("d-none");

        parrafo.textContent = noContesta + '¿Cuantas veces se intento contactar?';

    } else {
        
        nroLlamadosCol.classList.remove("d-block");
        nroLlamadosCol.classList.add("d-none");

        //parrafo.textContent = 'ELige una Opción3';
    }

}

mensajeVoz.addEventListener ( 'change', mensajeVozForm );

function mensajeVozForm() {
    
    let eleccionVozForm = document.querySelector('input[name="dejo_mensaje"]:checked').value;

    console.log(eleccionVozForm);


    //let radio = document.getElementById('motivo_dejo_responder');
    //let radio = document.querySelector('input[name="motivo_descarte"]');


    
    //radio.checked = false;

    uncheckMotivo();

    function uncheckMotivo() {
        var x = document
            .querySelectorAll('input[name="motivo_descarte"]');

        for (var i = 0; i < x.length; i++) {
            x[i].checked = false;
        }
    }


    if ( eleccionVozForm == 'rellamar' ) {

        parrafo.textContent = textRellamar;

    } if ( eleccionVozForm == 'decartado' ) {

        
        motivoForm.classList.remove("d-none");
        motivoForm.classList.add("d-block");
        
        parrafo.textContent = 'Elige un motivo para descartar el LEAD';

    } else {

        motivoForm.classList.remove("d-block");
        motivoForm.classList.add("d-none");

        //parrafo.textContent = 'no descartado';

    }

}

motivoForm.addEventListener ( 'change', motivoChoice );

function motivoChoice() {
    
    let eleccionMotivo = document.querySelector('input[name="motivo_descarte"]:checked').value;

    console.log(eleccionMotivo);

    if ( eleccionMotivo ) {

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

        //motivoForm.classList.remove("d-block");
        //motivoForm.classList.add("d-none");

        parrafo.textContent = 'Elige un motivo para descartar el LEAD';

    }

}


nroLlamadosCol.addEventListener ( 'change', nroLlamados );

function nroLlamados() {
    
    let nroLlamadosForm = document.querySelector('input[name="nroLlamados"]:checked').value;

    console.log(nroLlamadosForm);
    if ( nroLlamadosForm == '4' ) {

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