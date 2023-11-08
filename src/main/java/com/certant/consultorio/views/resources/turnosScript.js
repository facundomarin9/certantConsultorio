const urlTurnos = "http://localhost:8080/turnos";
const urlProfesionales = "http://localhost:8080/profesionales";
const urlHorariosById = "http://localhost:8080/horas"
const urlEspecialidadesById = "http://localhost:8080/especialidades";
const urlProfesionalesById = "http://localhost:8080/turnos";



const tablaBody = document.getElementById("tablaTurnosId");
const btnCargarComboHoras = document.getElementById("botonCargarHorariosId");
const comboBoxProfesionales = document.getElementById("comboProfesionalesId");
const comboBoxHorarios = document.getElementById("comboSeleccionarHorarioId");
const contenedorRadios = document.getElementById("containerRadios");
const btnCargarTurno = document.getElementById("botonCargarTurno");







document.addEventListener("DOMContentLoaded", function () {
    
    if (window.location.href.endsWith("listadoTurnos.html")) {
        cargarTabla();
    } else if(window.location.href.endsWith("cancelarTurno.html")){

        /**const parametrosCancelar = new URLSearchParams(window.location.search);
        const idTurnoCancelar = parametrosCancelar.get("id");
        console.log(idTurnoCancelar)
        cancelarTurno(idTurnoCancelar);
*/


    }
    cargarComboBoxProfesionales();
    
        const parametros = new URLSearchParams(window.location.search);
        const idTurno = parametros.get("id");
        
        cargarDatosFormularioUpdate(idTurno);




});

btnCargarTurno.addEventListener("click", function () {

    enviarDatosTurno();
    


});


btnCargarComboHoras.addEventListener("click", function () {
    comboBoxHorarios.innerHTML = "";
    const opcionCombo = comboBoxProfesionales.value;
    cargarComboBoxHorarios(opcionCombo);
    cargarRadioEspecialidad(opcionCombo)


});








function enviarDatosTurno() {

    const checkRadio = document.querySelectorAll("input[type='radio']");
    const comboBoxProfesional = document.getElementById("comboProfesionalesId");
    const comboBoxHorario = document.getElementById("comboSeleccionarHorarioId");
    const fecha = document.getElementById("inputFechaTurno");

    const inputDocumento = document.getElementById("inputDocumentoId").value;
    const inputHorario = document.getElementById("comboSeleccionarHorarioId").value;
    const inputProfesional = comboBoxProfesional.value;
    const inputFecha = fecha.value;

    const datosEnviarTurno = {};



    datosEnviarTurno.dniPaciente = inputDocumento;
    datosEnviarTurno.fechaTurno = inputFecha+"T00:00:00";
    datosEnviarTurno.idHoraTurno = inputHorario;
    datosEnviarTurno.idProfesional = inputProfesional;
   
    console.log(inputFecha)

    checkRadio.forEach(function (checkradio) {

        if (checkradio.checked) {
            
            datosEnviarTurno.idEspecialidad = checkradio.value;
        }

    });



    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEnviarTurno)
    };
    fetch(urlTurnos, opciones)
        .then(response => {
            if (!response.ok) {
                
                return response.text();
            }

            if(response.status == 201){
                alert("Turno Registrado con exito!");
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }

            
            return response.status;
        })
        .then(data => {
            
            console.log("Respuesta del servidor:", data);
            alert(data)
        })
        .catch(error => {
            console.error("Error:", error);
        });







}

function cargarRadioEspecialidad(opcionCombo) {
    contenedorRadios.innerHTML = "";
    fetch(urlEspecialidadesById + "/" + opcionCombo)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {


            const label = document.createElement("label");
                label.htmlFor = "containerRadios";
                label.textContent = "Seleccione Especialidad";
                contenedorRadios.appendChild(label)

            data.forEach((dato) => {
                const br = document.createElement("br");
                contenedorRadios.appendChild(br);
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "opciones";
                radio.value = dato.id;
                radio.id = `opcion${dato.id}`;
                const label = document.createElement("label");
                label.htmlFor = `opcion${dato.id}`;
                label.textContent = dato.especialidad;
                
                
                
                contenedorRadios.appendChild(radio);
                contenedorRadios.appendChild(label);


            })



        })

        .catch(error => {
            // Manejar errores de la solicitud
            console.error("Error: " + error);
        });




}

function cargarComboBoxHorarios(idProfesional) {

    

    fetch(urlHorariosById + "/" + idProfesional)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.forEach((dato) => {
                const horaTurno = new Date(dato.inicioconsulta);
                const horaFinal = horaTurno.toLocaleTimeString();

                const opcionCombo = document.createElement("option");
                opcionCombo.value = dato.id;
                opcionCombo.text = horaFinal;
                comboBoxHorarios.appendChild(opcionCombo);


            });



        })

        .catch(error => {
            // Manejar errores de la solicitud
            console.error("Error: " + error);
        });


}

function cargarComboBoxProfesionales() {

    const comboBox = document.getElementById("comboProfesionalesId");
    fetch(urlProfesionales)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.forEach((dato) => {

                const opcionCombo = document.createElement("option");
                opcionCombo.value = dato.id;
                opcionCombo.text = dato.nombre + " " + dato.apellido;
                comboBox.appendChild(opcionCombo);


            })

                .catch(error => {
                    // Manejar errores de la solicitud
                    console.error("Error: " + error);
                });

        })

}

function cargarTabla() {

    fetch(urlTurnos)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.content.forEach((dato) => {

                const fila = document.createElement("tr");

                const fechaTurnoFinal = new Date(dato.fechaTurno);
                const horaTurnoFinal = new Date(dato.horaTurno);

                const nombrePaciente = document.createElement("td");
                nombrePaciente.textContent = dato.nombrePaciente;
                fila.appendChild(nombrePaciente);

                const apellidoPaciente = document.createElement("td");
                apellidoPaciente.textContent = dato.apellidoPaciente;
                fila.appendChild(apellidoPaciente);

                const dniPaciente = document.createElement("td");
                dniPaciente.textContent = dato.dniPaciente;
                fila.appendChild(dniPaciente);

                const fechaTurno = document.createElement("td");
                fechaTurno.textContent = fechaTurnoFinal.toLocaleDateString();
                fila.appendChild(fechaTurno);

                const horaTurno = document.createElement("td");
                horaTurno.textContent = horaTurnoFinal.toLocaleTimeString();
                fila.appendChild(horaTurno);

                const nombreProfesional = document.createElement("td");
                nombreProfesional.textContent = dato.nombreProfesional;
                fila.appendChild(nombreProfesional);

                const apellidoProfesional = document.createElement("td");
                apellidoProfesional.textContent = dato.apellidoProfesional;
                fila.appendChild(apellidoProfesional);

                const consultorio = document.createElement("td");
                consultorio.textContent = dato.consultorio;
                fila.appendChild(consultorio);

                const editar = document.createElement("a");
                editar.type = "button";
                editar.className = "btn btn-primary";
                editar.href = "updateTurno.html?id="+dato.id+"";
                editar.textContent = "Editar";

                fila.appendChild(editar);

                const cancelar = document.createElement("a");
                cancelar.type = "button";
                cancelar.className = "btn btn-primary";
                cancelar.href = "cancelarTurno.html?id="+dato.id+"";
                cancelar.textContent = "Cancelar";

                fila.appendChild(cancelar);

                



                tablaBody.appendChild(fila);




            })
        })
        .catch(error => {
            // Manejar errores de la solicitud
            console.error("Error: " + error);
        });


}

function enviarUpdateTurno(idTurno){

    const opciones = {
        method: "UPDATE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUpdateTurno)
    };
    fetch(urlTurnos, opciones)
        .then(response => {

            if(response.status == 201){
                alert("Turno Editado con exito!");
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }else if(response.status == 400){
                alert("Horario o fecha ya ocupado con este profesional");
            }

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.status;
        })
        .then(data => {

            console.log("Respuesta del servidor:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });


    const checkRadio = document.querySelectorAll("input[type='radio']");
    const comboBoxProfesional = document.getElementById("comboProfesionalesId");
    const fecha = document.getElementById("inputFechaTurno");

    const inputDocumento = document.getElementById("inputDocumentoId").value;
    const inputHorario = document.getElementById("comboSeleccionarHorarioId").value;
    const inputProfesional = comboBoxProfesional.value;
    const inputFecha = fecha.value;

    const datosEnviarTurno = {};



    datosEnviarTurno.dniPaciente = inputDocumento;
    datosEnviarTurno.fechaTurno = inputFecha+"T00:00:00";
    datosEnviarTurno.idHoraTurno = inputHorario;
    datosEnviarTurno.idProfesional = inputProfesional;
   
    console.log(inputFecha)

    checkRadio.forEach(function (checkradio) {

        if (checkradio.checked) {
            
            datosEnviarTurno.idEspecialidad = checkradio.value;
        }

    });



    


}

function jsonHorarios() {
    const horarios = [];

    horarios.push({ inicioConsulta: "2023-11-05T08:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T08:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T09:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T09:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T10:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T10:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T11:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T11:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T12:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T12:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T15:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T16:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T17:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T18:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T19:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T20:30:00" });
    horarios.push({ inicioConsulta: "2023-11-05T21:00:00" });
    horarios.push({ inicioConsulta: "2023-11-05T22:30:00" });


    return horarios;
}

