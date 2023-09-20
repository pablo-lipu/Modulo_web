$(document).ready(function () {

    const urlApiListarTodosComb = "http://localhost:8086/combustibles/todos";
    $.ajax({
        url: urlApiListarTodosComb,
        method: "GET",
        success: function (respuesta) {
            console.log(respuesta);
            $("#miTabla").DataTable({
                destroy: true,
                order: [[3, "asc"]],
                data: respuesta,
                autoFill: false,
                responsive: true,
                select: true,
                search: true,
                menu: true,
                scrollX: true,
                lengthChange: true,
                lengthMenu: [
                    [5, 10, -1],
                    [5, 10, "Todas"],
                ],
                language: {
                    lengthMenu: "Mostrar: _MENU_",
                    search: "Buscar registros:",
                    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
                    sLoadingRecords: "Por favor espera - Cargando...",
                    infoFiltered: "(filtrado de un total de _MAX_ registros)",
                    infoEmpty: "Registros No disponibles.",
                    infoPostFix: "",
                    sEmptyTable: "Ning&#250;n dato disponible en esta tabla",
                    zeroRecords: "No existen registros - Lo sentimos :(",
                    paginate: {
                        previous: "Anterior",
                        next: "Siguiente",
                        sLast: "&#218;ltima página",
                    },
                },
                fnRowCallback: function (nRow, data) {
                    if (data.fechaCreacion) {
                        const fechaIso = data.fechaCreacion;
                        const fecha = new Date(fechaIso);
                        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
                        const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

                        $("td:eq(3)", nRow).html('<div>' + fechaFormateada + '</div>');
                    }

                    if (data.activo == true) {
                        $("td:eq(4)", nRow).html(
                            '<div>SI</div>'
                        );
                    } else if (data.activo == false) {
                        $("td:eq(4)", nRow).html(
                            '<div>No</div>'
                        );
                    }
                },
                columns: [
                    {
                        data: "idCombustible",
                        className: "center bolding",
                        title: "#"
                    },
                    {
                        data: "nombre",
                        className: "center",
                        title: "NOMBRE",
                    },
                    {
                        data: "descripcion",
                        className: "center",
                        title: "Descripcion",
                    },
                    {
                        data: null,
                        className: "center",
                        title: "Fecha Registro",
                    },
                    {
                        data: null,
                        className: "d-flex justify-content-center center bolding",
                        title: "Activo"
                    },
                    {
                        data: null,
                        className: "center ",
                        title: "Acci&oacute;n",
                        mRender: function (data) {
                            return (
                                '<a href="/combustibles/editar/' + data.idCombustible +
                                '"><i style="color: #6c757d;" class="bi bi-pencil-fill"/></a>'
                            );
                        },
                    },
                ],
            });
        },
        error: function (xhr, status, error) {
            console.log(error); // Maneja el error
        },
    });
});

// Obtener el formulario y el botón por su id
var formulario = document.getElementById('formCrear');
var botonCrear = document.getElementById('botonCrear');

// Agregar el evento de clic al botón
botonCrear.addEventListener('click', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    // Obtener los valores de los campos del formulario
    var nombre = formulario.querySelector('#inputNombre').value;
    var descripcion = formulario.querySelector('#inputDescripcion').value;

    // Realizar las acciones necesarias con los valores capturados
    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    // Aquí puedes enviar los datos al servidor o realizar otras acciones
    var data = {
        idCombustible: 0,
        nombre: nombre,
        descripcion: descripcion,
        activo: true,
        fechaCreacion: "2023-09-15T05:28:53.923Z"
      };
      console.log(data);
      console.log(JSON.stringify(data));

     // Realizar la petición AJAX para gusradr informacion
      $.ajax({
        url: 'http://localhost:8086/combustibles/crear',
        type: 'POST', 
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {

            $('#exampleModal').modal('hide');
            
            console.log('Respuesta del servidor:', response);
       
        },
        error: function (xhr, status, error) {
            console.log('Error en la petición:', error);
        }
    });
});