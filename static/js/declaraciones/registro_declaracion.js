function Previous() {
    window.history.back()
}

function generarDeclaracion() {
    var lada = document.getElementById('inputLada').value;
    var telefono = document.getElementById('inputTelefono').value;
    var telefonoConLada = lada + telefono;
    console.log(parseInt(telefonoConLada))
    document.getElementById('telefono_con_lada_contribuyente').value = parseInt(telefonoConLada);
    const fiel = document.getElementById('firma_electronica').value;
        if (fiel.length > 0) {
            var formulario = document.getElementById("declaracionForm");
            if (formulario.checkValidity()) {
                alertSuccess('Declaracion generada con éxito.', 'Espere unos momentos a que inicie la descarga...')
            } else {
                alertDanger('No se pudo completar la solicitud.',"Por favor, completa todos los campos requeridos...");
                for (var i = 0; i < formulario.elements.length; i++) {
                    console.log('si entro bro')
                    var elemento = formulario.elements[i];
                    if (elemento.required && !elemento.value) {
                        console.log("Campo faltante:", elemento.name);
                    }
                }
            }
        } else {
            alertDanger('No se pudo completar la solicitud.',"Por favor ingrese su FIEL.");
        }
}

function alertSuccess(title, message) {
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
            var formulario = document.getElementById("declaracionForm");
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

$(document).ready(function() {
    $('.my-input').focus(function() {
        if ($(this).val() === '-') {
            $(this).val('');
        }
    });
    $('.my-input').blur(function() {
        if ($(this).val() === '') {
            $(this).val('-');
        }
    });
});

document.getElementById('declaracion').addEventListener('change', function() {
    divFecha = document.getElementById('fechaDeclaracionModificacion')
    elementFecha = document.getElementById('id_fecha_modificacion')
    divMotivo = document.getElementById('motivoDeclaracionModificacion')
    if (this.value == 'modificacion') {
        divFecha.style.display = 'block';
        divMotivo.style.display = 'block';
        var fechaActual = new Date();
        elementFecha.value = fechaActual.toISOString().slice(0,10);
        elementFecha.required = true;
    } else {
        divFecha.style.display = 'none';
        divMotivo.style.display = 'none';
        elementFecha.required = false;
    };
});

document.getElementById('directa').addEventListener('change', function() {
    divParcialidadDirecta = document.getElementById('noParcialidadDirecta')
    inputParcialidadDirecta = document.getElementById('id_no_parcialidad_directa')

    if (this.value == 'parcial') {
        divParcialidadDirecta.style.display = 'block';
        inputParcialidadDirecta.required = true;
    } else {
        divParcialidadDirecta.style.display = 'none';
        inputParcialidadDirecta.value = '';
        inputParcialidadDirecta.required = false;
    };
});

document.getElementById('virtual').addEventListener('change', function() {
    divParcialidadVirtual = document.getElementById('noParcialidadVirtual')
    inputParcialidadVirtual = document.getElementById('id_no_parcialidad_virtual')

    if (this.value == 'parcial') {
        divParcialidadVirtual.style.display = 'block';
        inputParcialidadVirtual.required = true;
    } else {
        divParcialidadVirtual.style.display = 'none';
        inputParcialidadVirtual.value = '';
        inputParcialidadVirtual.required = false;
    };
});


document.addEventListener("DOMContentLoaded", function() {
    var importeInput = document.getElementById("rendimientos_input");
    var rendimientosCuentaAduanera = document.getElementById("rendimientos_hidden");
    var importeGarantizadoInput = document.getElementById('id_importe_garantizado');
    var totalInput = document.getElementById('id_total');

    importeInput.addEventListener("blur", function() {
        var valor = importeInput.value;
        var importeSin = valor.replace('$', '');
        valor = valor.replace(/[^\d.]/g, '');
        var valorFormateado = numeral(valor).format('$0,0.00');
        importeInput.value = valorFormateado;
        rendimientosCuentaAduanera.value = parseInt(importeSin); 
        totalInput.value = parseFloat(importeSin) + parseFloat(importeGarantizadoInput.value);
    });

    var cantidadMercanciaUMC = document.getElementById('id_cantidad_mercancia_UMC_importacion');
    var cantidadMercanciaRetornada = document.getElementById('id_cantidad_mercancia_retornada_UMC_exportacion');
    var porcentajeMercancia = document.getElementById('id_porcentaje_mercancia_retornada');

    function calcularResultado(){
        var valorRetornada = parseFloat(cantidadMercanciaRetornada.value);
        var valorUMC = parseFloat(cantidadMercanciaUMC.value);
        var resultado = (valorRetornada / valorUMC)*100;
        porcentajeMercancia.value = isNaN(resultado) ? '' : resultado.toFixed(2);
    }

    cantidadMercanciaUMC.addEventListener('input', function(){
        calcularResultado();
    });

    cantidadMercanciaRetornada.addEventListener('input', function(){
        calcularResultado();
    });

    var noPedimentoImportacion = document.getElementById('id_no_pedimento_importacion');
    var noPedimentoExportacion = document.getElementById('id_no_pedimento_exportacion');
    var inputFraccAracelariaImportacion = document.getElementById('id_fraccion_aracelaria_producto_importacion');
    var inputFraccAracelariaExportacion = document.getElementById('id_fraccion_aracelaria_producto_exportacion');

    noPedimentoImportacion.addEventListener('input', function() {
        if (this.value.length > 15) {
            this.value = this.value.slice(0, 15);
        }
    });

    noPedimentoExportacion.addEventListener('input', function() {
        if (this.value.length > 15) {
            this.value = this.value.slice(0, 15);
        }
    });

    inputFraccAracelariaImportacion.addEventListener('input', function() {
        var cleanedValue = this.value.replace(/[^\d]/g, '');
        var formattedValue = cleanedValue.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
        this.value = formattedValue;
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });

    inputFraccAracelariaExportacion.addEventListener('input', function() {
        var cleanedValue = this.value.replace(/[^\d]/g, '');
        var formattedValue = cleanedValue.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
        this.value = formattedValue;
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });

    var rendimientoContribucionesPagadas = document.getElementById('rendimiento_contribuciones_pagadas')
    var igiContribucionesPagadas = document.getElementById('igi_contribuciones_pagadas')
    var ivaContribucionesPagadas = document.getElementById('iva_contribuciones_pagadas')
    var ccContribucionesPagadas = document.getElementById('cc_contribuciones_pagadas')
    var totalContribucionesPagadas = document.getElementById('total_contribuciones_pagadas')

    function calcularTotal(){
        var igi = igiContribucionesPagadas.value.trim() !== '-' ? parseInt(igiContribucionesPagadas.value) : 0;
        var iva = ivaContribucionesPagadas.value.trim() !== '-' ? parseInt(ivaContribucionesPagadas.value) : 0;
        var cc = ccContribucionesPagadas.value.trim() !== '-' ? parseInt(ccContribucionesPagadas.value) : 0;
        var resultado = igi + iva + cc;
        totalContribucionesPagadas.value = isNaN(resultado) ? '-' : resultado.toFixed(4);
        rendimiento = parseFloat(totalContribucionesPagadas.value) / parseFloat(importeGarantizadoInput.value);
        rendimientoContribucionesPagadas.value = isNaN(rendimiento) ? '-' : rendimiento.toFixed(4);
        calcularFieldsBaseDeducible()
    }

    igiContribucionesPagadas.addEventListener('input', function() {
        calcularTotal()
    });
    ivaContribucionesPagadas.addEventListener('input', function() {
        calcularTotal()
    });
    ccContribucionesPagadas.addEventListener('input', function() {
        calcularTotal()
    });

    var rendimientoBaseDeducible = document.getElementById('rendimiento_base_deducible')
    var subtotalBaseDeducible = document.getElementById('subtotal_base_deducible')
    var igiBaseDeducible = document.getElementById('igi_base_deducible')
    var ivaBaseDeducible = document.getElementById('iva_base_deducible')
    var ccBaseDeducible = document.getElementById('cc_base_deducible')
    var contribucionesBaseDeducible = document.getElementById('contribuciones_base_deducible')
    var totalBaseDeducible = document.getElementById('total_base_deducible')

    var depositoCuentaAduanera = document.getElementById('id_deposito_en_cuenta_aduanera')
    var rendimientosSaldos = document.getElementById('id_rendimientos_saldos')

    importeInput.addEventListener('input', function() {
        calcularFieldsBaseDeducible()
    });
    cantidadMercanciaRetornada.addEventListener('input', function() {
        calcularFieldsBaseDeducible()
    });

    function calcularFieldsBaseDeducible(){
        resultado = (parseFloat(rendimientosCuentaAduanera.value) * parseFloat(rendimientoContribucionesPagadas.value) * parseFloat(cantidadMercanciaRetornada.value)) / 100;
        rendimientoBaseDeducible.value = isNaN(resultado) ? '-' : resultado;
        subtotalBaseDeducible.value = isNaN(resultado) ? '-' : resultado.toFixed(2);
        var igi = parseFloat(cantidadMercanciaRetornada.value) * parseFloat(igiContribucionesPagadas.value)
        var iva = parseFloat(cantidadMercanciaRetornada.value) * parseFloat(ivaContribucionesPagadas.value)
        var cc = parseFloat(cantidadMercanciaRetornada.value) * parseFloat(ccContribucionesPagadas.value)
        var suma = igi + iva + cc;
        var total = suma + resultado;
        igiBaseDeducible.value = isNaN(igi) ? '-' : igi;
        ivaBaseDeducible.value = isNaN(iva) ? '-' : iva;
        ccBaseDeducible.value = isNaN(cc) ? '-' : cc;
        contribucionesBaseDeducible.value = isNaN(suma) ? '-' : suma.toFixed(2);
        totalBaseDeducible.value = isNaN(total) ? '-' : total.toFixed(2);

        deposito = importeGarantizadoInput.value - contribucionesBaseDeducible.value;
        depositoCuentaAduanera.value = isNaN(deposito) ? '-' : deposito.toFixed(2); 
        rendimientos = subtotalBaseDeducible.value - rendimientosCuentaAduanera.value;
        rendimientosSaldos.value = isNaN(rendimientos) ? '-' : rendimientos.toFixed(2); 
        calcularFieldsProrrateo()
        calcularFieldsDevolucion()
    };

    var rendimientoFactorProrrateo = document.getElementById('rendimiento_factor_prorrateo')
    var igiFactorProrrateo = document.getElementById('igi_factor_prorrateo')
    var ivaFactorProrrateo = document.getElementById('iva_factor_prorrateo')
    var ccFactorProrrateo = document.getElementById('cc_factor_prorrateo')
    
    function calcularFieldsProrrateo(){
        var rendimiento = rendimientoBaseDeducible.value / 365;
        rendimientoFactorProrrateo.value = isNaN(rendimiento) ? '-' : rendimiento.toFixed(2);
        var igi = igiBaseDeducible.value / 365;
        var iva = ivaBaseDeducible.value / 365;
        var cc = ccBaseDeducible.value / 365;
        igiFactorProrrateo.value = isNaN(igi) ? '-' : igi.toFixed(2);
        ivaFactorProrrateo.value = isNaN(iva) ? '-' : iva.toFixed(2);
        ccFactorProrrateo.value = isNaN(cc) ? '-' : cc.toFixed(2);
        calcularFieldsTesofe()
    };

    var rendimientoDiasEstadia = document.getElementById('rendimiento_numero_dias_estadia')
    var igiDiasEstadia = document.getElementById('igi_numero_dias_estadia')
    var ivaDiasEstadia = document.getElementById('iva_numero_dias_estadia')
    var ccDiasEstadia = document.getElementById('cc_numero_dias_estadia')

    rendimientoDiasEstadia.addEventListener('input', function() {
        igiDiasEstadia.value = isNaN(rendimientoDiasEstadia.value) ? '-' :  rendimientoDiasEstadia.value;
        ivaDiasEstadia.value = isNaN(rendimientoDiasEstadia.value) ? '-' :  rendimientoDiasEstadia.value;
        ccDiasEstadia.value = isNaN(rendimientoDiasEstadia.value) ? '-' :  rendimientoDiasEstadia.value;
        calcularFieldsTesofe()
    });

    var rendimientoPorcentajeDeduccion = document.getElementById('rendimiento_porcentaje_deduccion')
    var igiPorcentajeDeduccion = document.getElementById('igi_porcentaje_deduccion')
    var ivaPorcentajeDeduccion = document.getElementById('iva_porcentaje_deduccion')
    var ccPorcentajeDeduccion = document.getElementById('cc_porcentaje_deduccion')

    rendimientoPorcentajeDeduccion.addEventListener('input', function() {
        igiPorcentajeDeduccion.value = isNaN(rendimientoPorcentajeDeduccion.value) ? '-' :  rendimientoPorcentajeDeduccion.value;
        ivaPorcentajeDeduccion.value = isNaN(rendimientoPorcentajeDeduccion.value) ? '-' :  rendimientoPorcentajeDeduccion.value;
        ccPorcentajeDeduccion.value = isNaN(rendimientoPorcentajeDeduccion.value) ? '-' :  rendimientoPorcentajeDeduccion.value;
        calcularFieldsTesofe()
    });

    var rendimientoTransferenciaTesofe = document.getElementById('rendimiento_transferencia_tesofe')
    var subtotalTransferenciaTesofe = document.getElementById('subtotal_transferencia_tesofe')
    var igiTransferenciaTesofe = document.getElementById('igi_transferencia_tesofe')
    var ivaTransferenciaTesofe = document.getElementById('iva_transferencia_tesofe')
    var ccTransferenciaTesofe = document.getElementById('cc_transferencia_tesofe')
    var contribucionesTransferenciaTesofe = document.getElementById('contribuciones_transferencia_tesofe')
    var totalTransferenciaTesofe = document.getElementById('total_transferencia_tesofe')

    var transferenciaTesofe = document.getElementById('id_transferencia_tesofe')

    function calcularFieldsTesofe(){
        var rendimiento = (rendimientoFactorProrrateo.value * rendimientoDiasEstadia.value * rendimientoPorcentajeDeduccion.value);
        rendimientoTransferenciaTesofe.value = isNaN(rendimiento) ? '-' : rendimiento.toFixed(2);
        subtotalTransferenciaTesofe.value = isNaN(rendimiento) ? '-' : rendimiento.toFixed(2);
        var igi = (igiFactorProrrateo.value * igiDiasEstadia.value * igiPorcentajeDeduccion.value);
        igiTransferenciaTesofe.value = isNaN(igi) ? '-' : igi.toFixed(2);
        var iva = (ivaFactorProrrateo.value * ivaDiasEstadia.value * ivaPorcentajeDeduccion.value);
        ivaTransferenciaTesofe.value = isNaN(iva) ? '-' : iva.toFixed(2);
        var cc = (ccFactorProrrateo.value * ccDiasEstadia.value * ccPorcentajeDeduccion.value);
        ccTransferenciaTesofe.value = isNaN(cc) ? '-' : cc.toFixed(2);
        var contribuciones = igi + iva + cc;
        contribucionesTransferenciaTesofe.value = isNaN(contribuciones) ? '-' : contribuciones.toFixed(2);
        var total = rendimiento + contribuciones;
        totalTransferenciaTesofe.value = isNaN(total) ? '-' : total.toFixed(2);
        transferenciaTesofe.value = isNaN(total) ? '-' : total.toFixed(2);

        calcularFieldsDevolucion()
    };

    var rendimientoDevolucionContribuyente = document.getElementById('rendimiento_devolucion_contribuyente')
    var subtotalDevolucionContribuyente = document.getElementById('subtotal_devolucion_contribuyente')
    var igiDevolucionContribuyente = document.getElementById('igi_devolucion_contribuyente')
    var ivaDevolucionContribuyente = document.getElementById('iva_devolucion_contribuyente')
    var ccDevolucionContribuyente = document.getElementById('cc_devolucion_contribuyente')
    var contribucionesDevolucionContribuyente = document.getElementById('contribuciones_devolucion_contribuyente')
    var totalDevolucionContribuyente = document.getElementById('total_devolucion_contribuyente')

    var devolucionContribuyente = document.getElementById('id_devolucion_al_contribuyente')

    function calcularFieldsDevolucion(){
        var rendimiento = (rendimientoBaseDeducible.value - rendimientoTransferenciaTesofe.value);
        rendimientoDevolucionContribuyente.value = isNaN(rendimiento) ? '-' : rendimiento.toFixed(2);
        subtotalDevolucionContribuyente.value = isNaN(rendimiento) ? '-' : rendimiento.toFixed(2);
        var igi = (igiBaseDeducible.value - igiTransferenciaTesofe.value);
        igiDevolucionContribuyente.value = isNaN(igi) ? '-' : igi.toFixed(2);
        var iva = (ivaBaseDeducible.value - igiTransferenciaTesofe.value);
        ivaDevolucionContribuyente.value = isNaN(iva) ? '-' : iva.toFixed(2);
        var cc = (ccBaseDeducible.value - igiTransferenciaTesofe.value);
        ccDevolucionContribuyente.value = isNaN(cc) ? '-' : cc.toFixed(2);
        var contribuciones = igi + iva + cc;
        contribucionesDevolucionContribuyente.value = isNaN(contribuciones) ? '-' : contribuciones.toFixed(2);
        var total = rendimiento + contribuciones;
        totalDevolucionContribuyente.value = isNaN(total) ? '-' : total.toFixed(2);
        devolucionContribuyente.value = isNaN(total) ? '-' : total.toFixed(2);
    };

});
