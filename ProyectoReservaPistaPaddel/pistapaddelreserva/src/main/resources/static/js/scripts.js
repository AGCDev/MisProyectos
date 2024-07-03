/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var fechaSel = new Date();
MostrarTabla(fechaSel);

$(".calendar td:not(.hora):not(.reserved)").click(function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Necesitas estar registrado para porder hacer una reserva.");
    } else {
        var rowIndex = $(this).parent().index(); // Índice de la fila
        var colIndex = $(this).index();          // Índice de la columna

        var start_time;
        var end_time;
        switch (rowIndex) {
            case 0:
                start_time = "08:00";
                end_time = "09:30";
                break;
            case 1:
                start_time = "09:30";
                end_time = "11:00";
                break;
            case 2:
                start_time = "11:00";
                end_time = "12:30";
                break;
            case 3:
                start_time = "12:30";
                end_time = "14:00";
                break;
            case 4:
                start_time = "14:00";
                end_time = "15:30";
                break;
            case 5:
                start_time = "15:30";
                end_time = "17:00";
                break;
            case 6:
                start_time = "17:00";
                end_time = "18:30";
                break;
            case 7:
                start_time = "18:30";
                end_time = "20:00";
                break;
            case 8:
                start_time = "20:00";
                end_time = "21:30";
                break;
            default:
                console.log("Error hora " + rowIndex);
                return;
        }
        let fecha = new Date(fechaSel);
        fecha.setDate(fecha.getDate() - fechaSel.getDay() + colIndex);
        fecha = formatearFecha(fecha);
        const datos = {
            fecha, start_time, end_time, token,
            usuario: {
                id: localStorage.userid
            }
        };
        $.ajax({
            url: "/api/reservas",
            type: "POST",
            contentType: "application/json",  // Especifica que estás enviando JSON
            data: JSON.stringify(datos),      // Convierte el objeto JavaScript a JSON
            success: function (data) {
                alert("Reserva realizada.")
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
});

$("#anterior").click(function () {
    fechaSel.setDate(fechaSel.getDate() - 7);
    MostrarTabla(fechaSel);
});
$("#siguiente").click(function () {
    fechaSel.setDate(fechaSel.getDate() + 7);
    MostrarTabla(fechaSel);
});


function formatearFecha(fecha) {
    var year = fecha.getFullYear();
    var month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function MostrarTabla(fecha) {
    $(".calendar th br").remove();
    $(".calendar th span").remove();
    $(".calendar tbody .reserved").text("");
    $(".calendar tbody .reserved").removeClass("reserved");
    var dias = new Date(fecha);
    for (let i = fecha.getDay(); i <= 7; i++) {
        $(".calendar th").eq(i).append("<br><span>" + dias.getDate() + "/" + (dias.getMonth() + 1) + "</span>");
        dias.setDate(dias.getDate() + 1);
    }
    dias = new Date(fecha);
    for (let i = fecha.getDay() - 1; i > 0; i--) {
        dias.setDate(dias.getDate() - 1);
        $(".calendar th").eq(i).append("<br><span>" + dias.getDate() + "/" + (dias.getMonth() + 1) + "</span>");
    }

    $(".calendar td:not(.hora):not(.reserved)").hover(function () {
        $(this).text("Reservar");
    }, function () {
        $(this).text("");
    });
    $.get("/api/reservas")
        .done(function (response) {
            if (response.success) {
                for (const reserva of response.reservas) {
                    let fecha = new Date(reserva.fecha);
                    if (estaEnSemana(fecha, fechaSel)) {
                        let fila = -1;
                        switch (reserva.startTime) {
                            case "08:00:00":
                                fila = 0;
                                break;
                            case "09:30:00":
                                fila = 1;
                                break;
                            case "11:00:00":
                                fila = 2;
                                break;
                            case "12:30:00":
                                fila = 3;
                                break;
                            case "14:00:00":
                                fila = 4;
                                break;
                            case "15:30:00":
                                fila = 5;
                                break;
                            case "17:00:00":
                                fila = 6;
                                break;
                            case "18:30:00":
                                fila = 7;
                                break;
                            case "20:00:00":
                                fila = 8;
                                break;
                            default:
                                console.log("Error hora " + reserva.startTime);
                                return;
                        }
                        let col = fecha.getDay() == 0 ? 7 : fecha.getDay();
                        let nodo = $(".calendar tbody tr").eq(fila).find("td").eq(col);
                        nodo.text("Reservado");
                        nodo.addClass("reserved");
                        nodo.off();
                    }
                }
            }
        });
}

function estaEnSemana(fecha, semana) {
    // Calcular el primer día de la semana (domingo)
    var primerDiaSemana = new Date(semana);
    primerDiaSemana.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00.000
    primerDiaSemana.setDate(semana.getDate() - semana.getDay() + 1);

    // Calcular el último día de la semana (sábado)
    var ultimoDiaSemana = new Date(semana);
    ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 7);
    ultimoDiaSemana.setHours(0, 0, 0, 0);

    // Convertir la fecha dada a objeto Date (si no lo es)
    var fechaObj = new Date(fecha);

    // Verificar si la fecha está dentro de la semana actual
    return fechaObj >= primerDiaSemana && fechaObj <= ultimoDiaSemana;
}


/*
document.getElementById("reservationForm").onsubmit = async function(event) {
    event.preventDefault();

    const reservationDate = document.getElementById("reservationDate").value;
    const startTime = document.getElementById("start_time").value;
    const endTime = document.getElementById("end_time").value;
   // const nombreUsuario = "nombreDelUsuario"; // Obtén esto del formulario o sesión actual

    // Validar intervalo de tiempo
    const start = new Date("01/01/2000 " + start_time);
    const end = new Date("01/01/2000 " + end_time);
    const diffMinutes = (end - start) / 60000;
    if (diffMinutes !== 90) {
        alert("La reserva debe ser de 1 hora y 30 minutos.");
        return false;
    }

    const requestBody = {
        fecha: reservationDate,
        start_time: start_time,
        end_time: end_time
       // nombreUsuario: nombreUsuario
    };

    try {
        const response = await fetch('http://localhost:8080/api/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();

        if (data.success) {
            const dayOfWeek = new Date(reservationDate).toLocaleDateString('es-ES', { weekday: 'long' });
            const cellId = `${dayOfWeek.toLowerCase()}-${start_time}-${end_time}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.innerHTML = "RESERVADO";
                cell.style.backgroundColor = "red";
                cell.style.color = "white";
            }
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

async function cargarReservas() {
    try {
        const response = await fetch('http://localhost:8080/api/reservas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const reservas = await response.json();

        reservas.forEach(reserva => {
            const dayOfWeek = new Date(reserva.fecha).toLocaleDateString('es-ES', { weekday: 'long' });
            const cellId = `${dayOfWeek.toLowerCase()}-${reserva.start_time}-${reserva.end_time}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.innerHTML = "RESERVADO";
                cell.style.backgroundColor = "red";
                cell.style.color = "white";
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
/*
async function registrarReservas() {
     let datos = {};
            datos.fecha = document.getElementById('reservationDate').value;
            datos.start_time = document.getElementById('start_time').value;
            datos.end_time = document.getElementById('end_time').value;


           const request = await fetch('api/reservas', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(datos)

           });

           alert("Reserva completada.");


}
window.onload = function() {

    cargarReservas(); // Cargar reservas al iniciar la página
};
*/
