function Previous() {
    window.history.back()
}

function generarFormulario() {
    var formulario = document.getElementById("constanciaForm");
    if (formulario.checkValidity()) {
        generarConstancia()
    } else {
        alertDanger('No se pudo completar la solicitud.',"Por favor, completa todos los campos requeridos...");
        var importeHiddenInput = document.getElementById("importe_numero_hidden");
        for (var i = 0; i < formulario.elements.length; i++) {
            var elemento = formulario.elements[i];
            if (elemento.required && !elemento.value) {
                console.log("Campo faltante:", elemento.name);
            }
        }
    }
}

function generarConstancia() {
    let content = `
        <div class="text-start w-100">
            <span style="font-weight: bold; font-size: 20px;">Confirmación</span> 
            <br><br><br> 
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="declaracionCheckbox">
                <label class="form-check-label" for="declaracionCheckbox">
                    Declaración de protesta de decir la verdad
                </label>
            </div>
            <br><br>
            <div>
                <label for="fielInput" class="form-label">FIEL:</label>
                <input type="password" class="form-control" id="fielInput">
            </div>
        </div>
    `;

    Swal.fire({
        html: content,
        allowOutsideClick: true,
        confirmButtonText: 'Generar Constancia',
        confirmButtonColor: '#16634d',
        cancelButtonColor: '#9f2241',
        width: '800px'
    }).then(function (result) {
        if (result.isConfirmed) {
            var anho = document.getElementById('inputAnho').value;
            var aduana = document.getElementById('inputAduana').value;
            var patente = document.getElementById('inputPatente').value;
            var documento = document.getElementById('inputDocumento').value;
            var no_pedimento = anho + aduana + patente + documento;
            document.getElementById("no_pedimento").value = no_pedimento;
            var select2 = document.getElementById('select2_contribuciones_art86_fracc1_fracc154');
            var lista_ids = Array.from(select2.selectedOptions).map(option => parseInt(option.value));
            document.getElementById('lista_ids_input').value = JSON.stringify(lista_ids);
            const fiel = document.getElementById('fielInput').value;
                if (fiel.length > 0) {
                    document.getElementById("firma_electronica").value = fiel;
                    var formulario = document.getElementById("constanciaForm");
                    if (formulario.checkValidity()) {
                        enviarFormulario('Constancia generada con éxito.', 'Espere unos momentos a que inicie la descarga...')
                    } else {
                        alertDanger('No se pudo completar la solicitud.',"Por favor, completa todos los campos requeridos...");
                    }
                } else {
                    alertDanger('No se pudo completar la solicitud.',"Por favor ingrese su FIEL.");
                }
        }
    });
}

function enviarFormulario(title, message) {
    let content = `
        <div class="text-start w-100">
            <i class="bi bi-check-circle fs-2 text-anam-primary"></i>
            <span style="font-weight: bold; font-size: 20px; padding-left:10px;">${title}</span> 
            <br><br><br> 
            ${message}
        </div>
    `
    Swal.fire({
        html: content,
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#235b4e',
    }).then(function (result) {
        if (result.isConfirmed) {
            var formulario = document.getElementById("constanciaForm");
            formulario.submit();
        }
    })
}

function alertDanger(title, message) {
    let content = `
        <div class="text-start w-100">
            <i class="bi bi-x-circle fs-2 text-anam-secondary"></i>
            <span style="font-weight: bold; font-size: 20px; padding-left:10px;">${title}</span> 
            <br><br><br> 
            ${message}
        </div>
    `
    Swal.fire({
        html: content,
            allowOutsideClick: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#9f2241',
            customClass: 'swal-wide',
    }).then(function() {
        
    })
}

function alertSuccess(...args) {
    var cantidad = args.length;

    let content = `
        <div class="text-start w-100">
            <i class="bi bi-check-circle fs-2 text-anam-primary"></i>
            <span style="font-weight: bold; font-size: 20px; padding-left:10px;">${args[0]}</span> 
            <br><br><br><br>
    `
    for (var i = 1; i < cantidad; i+=2)
    {
        content += `
            <span style="font-weight: bold; font-size: 15px;">${args[i]}</span>
            <span style="font-size: 15px;">${args[i+1]}</span>
            <br><br>
        `
    }

    content += `
        </div>
    `
    
    Swal.fire({
        html: content,
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#235b4e',
    }).then(function () {

    })
}

document.addEventListener("DOMContentLoaded", function() {
    var btnValidarCURP = document.getElementById("btnValidarCURP");

    btnValidarCURP.addEventListener("click", function() {
        alertSuccess("CURP Validado con éxito!", "Nombres:", "Jordan Israel", "Apellido Paterno:", "Vega", "Apellido Materno:", "Pérez")
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var btnValidarRFC = document.getElementById("btnValidarRFC");
    var divInfoRFC = document.getElementById("confirmarInformacionRFC")
    var divContenidoOculto = document.getElementById("divContenidoOculto")
    var inputNombreImportador = document.getElementById("id_nombre_importador")

    btnValidarRFC.addEventListener("click", function() {
        if (divContenidoOculto.style.display === "none") {
            inputNombreImportador.value = "Jordan Israel Vega Perez"
            divContenidoOculto.style.display = "block";
            divInfoRFC.style.display = 'block'
            alertSuccess("RFC Validado con éxito!", "Nombre completo:", "Jordan Israel Vega Pérez")
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var importeInput = document.getElementById("importe_numero_input");
    var importeHiddenInput = document.getElementById("importe_numero_hidden");

    var precioUnitarioInput = document.getElementById("precio_unitario_titulo_input");
    var precioUnitarioHiddenInput = document.getElementById("precio_unitario_titulo_hidden")

    var importeArt86Input = document.getElementById("importe_art86_fracc1_fracc154_input");
    var importeArt86HiddenInput = document.getElementById("importe_art86_fracc1_fracc154_hidden")

    var inputFechaVencimiento = document.getElementById('fecha_vencimiento_hidden')
    var fechaArt86 = document.getElementById('fecha_vencimiento_art86')
    var fechaArt86Fracc1 = document.getElementById('fecha_vencimiento_art86_fracc1')

    importeInput.addEventListener("blur", function() {
        var valor = importeInput.value;
        var importeSin = valor.replace('$', '')
        valor = valor.replace(/[^\d.]/g, '');
        var valorFormateado = numeral(valor).format('$0,0.00');
        importeInput.value = valorFormateado;
        importeHiddenInput.value = parseInt(importeSin); 
    });

    precioUnitarioInput.addEventListener("blur", function() {
        var valor = precioUnitarioInput.value;
        var importeSin = valor.replace('$', '')
        valor = valor.replace(/[^\d.]/g, '');
        var valorFormateado = numeral(valor).format('$0,0.00');
        precioUnitarioInput.value = valorFormateado;
        precioUnitarioHiddenInput.value = parseInt(importeSin); 
    });

    importeArt86Input.addEventListener("blur", function() {
        var valor = importeArt86Input.value;
        var importeSin = valor.replace('$', '')
        valor = valor.replace(/[^\d.]/g, '');
        var valorFormateado = numeral(valor).format('$0,0.00');
        importeArt86Input.value = valorFormateado;
        importeArt86HiddenInput.value = parseInt(importeSin); 
    });

    fechaArt86.addEventListener("blur", function() {
        inputFechaVencimiento.value = fechaArt86.value;
        console.log(inputFechaVencimiento.value)
    });

    fechaArt86Fracc1.addEventListener("blur", function() {
        inputFechaVencimiento.value = fechaArt86Fracc1.value;
        console.log(inputFechaVencimiento.value)
    });
});

document.addEventListener("DOMContentLoaded", function() {
    $('#select2_contribuciones_art86_fracc1_fracc154').select2();
});

document.getElementById('tipo_operacion_aduanera').addEventListener('change', function() {
    var divArt86 = document.getElementById('div_operacion_aduanera_art86')
    var inputTipoGarantia = document.getElementById('id_tipo_garantia_art86a_fracc1')
    var inputFechaVencimiento = document.getElementById('fecha_vencimiento_hidden')
    var fechaArt86 = document.getElementById('fecha_vencimiento_art86')
    var fechaArt86Fracc1 = document.getElementById('fecha_vencimiento_art86_fracc1')
    var divArt86Fracc1 = document.getElementById('div_operacion_aduanera_art86_fracc1');
    var divArt86Fracc1Fracc154 = document.getElementById('div_operacion_aduanera_art86_fracc1_fracc154');
    var inputDivArt86Fracc1 = document.getElementById('id_tipo_mercancia_art86_fracc1')
    var input1DivArt86Fracc1Fracc154 = document.getElementById('lista_ids_input')
    var input2DivArt86Fracc1Fracc154 = document.getElementById('importe_art86_fracc1_fracc154_input')
    var input2DivArt86Fracc1Fracc154Hidden = document.getElementById('importe_art86_fracc1_fracc154_hidden')

    if (this.value == 'art86') {
        document.getElementById("estado_constancia").value = 'generada'
        divArt86Fracc1.style.display = 'none';
        inputDivArt86Fracc1.selectedIndex = 0;
        inputTipoGarantia.selectedIndex = 0;
        fechaArt86Fracc1.value = ''
        inputFechaVencimiento.value = ''
        fechaArt86Fracc1.required = false;
        inputDivArt86Fracc1.required = false;
        inputTipoGarantia.required = false;

        divArt86Fracc1Fracc154.style.display = 'none';
        $('#select2_contribuciones_art86_fracc1_fracc154').val(null).trigger('change');
        input1DivArt86Fracc1Fracc154.value = '';
        input2DivArt86Fracc1Fracc154.value = '0.00';
        input2DivArt86Fracc1Fracc154Hidden.value = '0.00';
        input1DivArt86Fracc1Fracc154.required = false;
        input2DivArt86Fracc1Fracc154.required = false;
    
        divArt86.style.display = 'flex'
        fechaArt86.required = true;
    } else if (this.value === 'art86_fracc1') {
        document.getElementById("estado_constancia").value = 'generada'

        divArt86.style.display = 'none'
        fechaArt86.value = ''
        inputFechaVencimiento.value = ''
        fechaArt86.required = false;

        divArt86Fracc1Fracc154.style.display = 'none';
        $('#select2_contribuciones_art86_fracc1_fracc154').val(null).trigger('change');
        input1DivArt86Fracc1Fracc154.value = '';
        input2DivArt86Fracc1Fracc154.value = '0.00';
        input2DivArt86Fracc1Fracc154Hidden.value = '0.00';
        input1DivArt86Fracc1Fracc154.required = false;
        input2DivArt86Fracc1Fracc154.required = false;

        divArt86Fracc1.style.display = 'flex';
        inputTipoGarantia.required = true;
        inputDivArt86Fracc1.required = true;
        fechaArt86Fracc1.required = true;
    } else if (this.value == 'art86_fracc1_fracc154') {
        document.getElementById("estado_constancia").value = 'aplicada'

        divArt86.style.display = 'none'
        fechaArt86.value = ''
        fechaArt86.required = false;

        divArt86Fracc1.style.display = 'none';
        inputDivArt86Fracc1.selectedIndex = 0;
        inputTipoGarantia.selectedIndex = 0;
        fechaArt86Fracc1.value = ''
        fechaArt86Fracc1.required = false;
        inputDivArt86Fracc1.required = false;
        inputTipoGarantia.required = false;

        inputFechaVencimiento.value = ''

        divArt86Fracc1Fracc154.style.display = 'flex';
        input1DivArt86Fracc1Fracc154.required = true;
        input2DivArt86Fracc1Fracc154.required = true;
    }
  });