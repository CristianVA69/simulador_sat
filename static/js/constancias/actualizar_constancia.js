function Previous() {
    window.history.back()
}

var files = [];
const idsToDelete = [];

document.addEventListener("DOMContentLoaded", function() {
    var campoSeleccion = document.getElementById("id_estado_constancia");
    var divDevuelta = document.getElementById('divDevuelta');
    var divVigenciaExtendida = document.getElementById('divVigenciaExtendida')
    var divTransferida = document.getElementById('divTransferida')
    var divDevueltaTransferida = document.getElementById('divDevueltaTransferida')

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const fileId = this.getAttribute("data-id");
            if (!idsToDelete.includes(fileId)) {
                idsToDelete.push(fileId);
                console.log(`ID añadido a la lista para eliminar: ${fileId}`);

                const fileDiv = document.getElementById(`archivo-${fileId}`);
                if (fileDiv) {
                    fileDiv.style.display = 'none';
                }
            }
        });
    });

    function actualizarEstado() {
        if (campoSeleccion.value == 'devuelta') {
            divVigenciaExtendida.style.display = 'none';
            divTransferida.style.display = 'none';
            divDevueltaTransferida.style.display = 'none';
            divDevuelta.style.display = 'flex';
        } else if (campoSeleccion.value == 'vigencia_extendida') {
            divDevuelta.style.display = 'none';
            divTransferida.style.display = 'none';
            divDevueltaTransferida.style.display = 'none';
            divVigenciaExtendida.style.display = 'block';
        } else if (campoSeleccion.value == 'transferida'){
            divDevuelta.style.display = 'none';
            divVigenciaExtendida.style.display = 'none';
            divDevueltaTransferida.style.display = 'none';
            divTransferida.style.display = 'flex';
        } else if (campoSeleccion.value == 'devuelta_y_transferida'){
            divDevueltaTransferida.style.display = 'block';
            divDevuelta.style.display = 'flex';
            divVigenciaExtendida.style.display = 'none';
            divTransferida.style.display = 'none';
        } else {
            divDevuelta.style.display = 'none';
            divVigenciaExtendida.style.display = 'none';
            divTransferida.style.display = 'none';
            divDevueltaTransferida.style.display = 'none';
        }
    }

    if (campoSeleccion) {
        console.log(campoSeleccion.value)
        actualizarEstado();
        campoSeleccion.addEventListener("change", actualizarEstado);
    }
});

$('#custom-file-button').on('click', function() {
    $('#id_file').click();
});

$('#id_file').on('change', function(){ 
    saveFiles();
});

function saveFiles(){
    var inputArchivos = document.getElementById('id_file');
    for (var i = 0; i < inputArchivos.files.length; i++) {
        if (inputArchivos.files[i].name.endsWith('.pdf')) {
            files.push(inputArchivos.files[i])
        } else {
            alertDanger('Error al subir archivos!', 'Solo se pueden subir archivos tipo PDF.')
        }
    }
    updateFileList();
}

function updateFileList() {
    var fileListContainer = document.getElementById('file-list');
    fileListContainer.innerHTML = '';

    files.forEach((file, index) => {
        var fileDiv = document.createElement('div');
        fileDiv.className = 'archivo';

        var dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'opc dropdown';
        
        var dropdownLink = document.createElement('a');
        dropdownLink.href = '#';
        dropdownLink.id = 'dropdownMenuLink';
        dropdownLink.dataset.bsToggle = 'dropdown';
        dropdownLink.setAttribute('aria-haspopup', 'true');
        dropdownLink.setAttribute('aria-expanded', 'false');
        dropdownLink.innerHTML = '<img class="threedots" src="' + threedotsUrl + '" />';

        var dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuLink');
        dropdownMenu.style.fontSize = '10px';

        var deleteButton = document.createElement('button');
        deleteButton.className = 'dropdown-item';
        deleteButton.onclick = function() { deleteFile(index); };
        deleteButton.innerHTML = '<img style="margin-right:5%; margin-left:0" src="' + trashUrl + '"/> Eliminar';

        dropdownMenu.appendChild(deleteButton);

        dropdownDiv.appendChild(dropdownLink);
        dropdownDiv.appendChild(dropdownMenu);

        var contDiv = document.createElement('div');
        contDiv.className = 'cont';
        contDiv.innerHTML = '<img src="/static/img/Documentos/Icon PDF.svg" /><p>' + file.name + '</p>';

        fileDiv.appendChild(dropdownDiv);
        fileDiv.appendChild(contDiv);

        fileListContainer.appendChild(fileDiv);
    });
}

function deleteFile(index) {
    files.splice(index, 1);
    updateFileList();
    var inputArchivos = document.getElementById('id_file');
    inputArchivos.value = null;
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

function generarFormulario() {
    var formulario = document.getElementById("actualizarConstanciaForm");
    if (formulario.checkValidity()) {
        submitForm();
    } else {
        alertDanger('No se pudo completar la solicitud.',"Por favor, completa todos los campos requeridos...");
        for (var i = 0; i < formulario.elements.length; i++) {
            var elemento = formulario.elements[i];
            if (elemento.required && !elemento.value) {
                console.log("Campo faltante:", elemento.name);
            }
        }
    }
}

function submitForm() {
    var form = document.getElementById('actualizarConstanciaForm');
    var formData = new FormData(form);

    function isHidden(element) {
        while (element) {
            if (element.style.display === 'none') {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    }

    form.querySelectorAll('input, select, textarea').forEach(function(field) {
        if (isHidden(field)) {
            formData.delete(field.name);
            console.log(field.name)
        }
    });

    files.forEach(function(file) {
        formData.append('files[]', file);
    });

    formData.append('idsToDelete', JSON.stringify(idsToDelete));
    
    $.ajax({
        url: form.action,
        type: form.method,
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            alertSuccess('Estatus actualizado exitosamente!', 'El estatus ha sido actualizado, puede consultar los cambios en la sección de busqueda.').then(function() {
                window.location.href = '/ejemplo/';
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alertDanger('Error al enviar archivos: ', textStatus);
        }
    });
}

function alertSuccess(title, message) {
    let content = `
        <div class="text-start w-100">
            <i class="bi bi-check-circle fs-2 text-anam-primary"></i>
            <span style="font-weight: bold; font-size: 20px; padding-left:10px;">${title}</span> 
            <br><br><br> 
            ${message}
        </div>
    `;
    return Swal.fire({
        html: content,
        allowOutsideClick: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#235b4e',
        customClass: 'swal-wide',
    });
}
