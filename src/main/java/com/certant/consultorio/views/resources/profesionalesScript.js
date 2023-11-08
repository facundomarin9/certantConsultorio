const url = "http://localhost:8080/profesionales";
const urlEspecialidades = "http://localhost:8080/especialidades";
const urlHoras = "http://localhost:8080/horas";
const tablaBody = document.getElementById("tablaProfesionalesId");
const botonCargarHorarios = document.getElementById("botonCargarHorarios");
const botonCargarProfesionales = document.getElementById("botonCargarProfesionales");
const btnCargarEspecialidades = document.getElementById("botonCargarEspecialidad");
const urlAgregarEspecialidadProfesional = "http://localhost:8080/profesionales/agregarEspecialidadProfecional";




document.addEventListener("DOMContentLoaded", function () {
    cargarTabla();
    cargarComboBoxProfesionales();
    cargarComboBoxProfesionalesEsp();
    cargarComboEspecialidades();
    cargarComboBoxHorarios();
});




botonCargarHorarios.addEventListener("click", function () {

    enviarDatosHorarios();
    const modalProfesional = document.getElementById("modalHorariosId");
    $(modalProfesional).modal("hide");
    setTimeout(function () {
        location.reload();
    }, 1000);

});

btnCargarEspecialidades.addEventListener("click", function() {

    enviarDatosEspecialidades();
    const modalProfesional = document.getElementById("modalEspecialidadId");
    $(modalProfesional).modal("hide");
    setTimeout(function () {
        location.reload();
    }, 1000);


});

botonCargarProfesionales.addEventListener("click", function () {

    enviarDatosProfesionales();
    const modalProfesional = document.getElementById("modalProfesionalId");
    $(modalProfesional).modal("hide");
    setTimeout(function () {
        location.reload();
    }, 1000);

});

function enviarDatosEspecialidades(){

    const opcionComboProfesional = document.getElementById("comboProfesionales2").value;
    const opcionComboEspecialidad = document.getElementById("comboEspecialidades").value;
    const datosEnviarEspeProf = {};
    datosEnviarEspeProf.idProfesional = opcionComboProfesional;
    datosEnviarEspeProf.idEspecialidad = opcionComboEspecialidad;

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEnviarEspeProf)
    };
    fetch(urlAgregarEspecialidadProfesional, opciones)
        .then(response => {
            if(response.status === 200){
                alert("Especialidad Cargada!")
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


}

function cargarComboEspecialidades(){

    const comboBox = document.getElementById("comboEspecialidades");
    fetch(urlEspecialidades)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.content.forEach(function(dato)  {
                const opcionCombo = document.createElement("option");
                opcionCombo.value = dato.id;
                opcionCombo.text = dato.especialidad;
                comboBox.appendChild(opcionCombo);


            })

                .catch(error => {
                    // Manejar errores de la solicitud
                    console.error("Error: " + error);
                });

        })

}

function enviarDatosHorarios(){
    const cuerpoDate = "2023-11-05T";
    const datosEnviarHoras = {};
    const opcionComboProfesional = document.getElementById("comboProfesionales").value;
    const opcionComboHoraInicio = document.getElementById("comboInicioConsulta").value;

    datosEnviarHoras.idProfesional = opcionComboProfesional;
    datosEnviarHoras.inicioConsulta = cuerpoDate+opcionComboHoraInicio;

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEnviarHoras)
    };
    fetch(urlHoras, opciones)
        .then(response => {
            if(response.status === 200){
                alert("Horario Cargado!")
            }
            if (!response.ok) {
                
                if(response.status === 400){
                    alert("No se puede cargar un horario que ya esta cargado.")
                }
                
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


}

function enviarDatosProfesionales() {

    const checkboxesAlt = document.querySelectorAll("input[type='checkbox']");

    const inputNombre = document.getElementById("nombreId").value;
    const inputApellido = document.getElementById("apellidoId").value;
    const inputConsultorio = document.getElementById("consultorioId").value;
    const inputMatricula = document.getElementById("matriculaId").value;
    const datosEnviarProfesional = {};



    datosEnviarProfesional.nombre = inputNombre;
    datosEnviarProfesional.apellido = inputApellido;
    datosEnviarProfesional.consultorio = inputConsultorio;
    datosEnviarProfesional.matricula = inputMatricula;
    datosEnviarProfesional.especialidades = [];


    checkboxesAlt.forEach(function (checkbox) {

        if (checkbox.checked) {
            const objeto = { id: checkbox.value }
            datosEnviarProfesional.especialidades.push(objeto)
        }

    });



    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEnviarProfesional)
    };
    fetch(url, opciones)
        .then(response => {
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







}

function cargarComboBoxHorarios(){

    const comboBoxInicio = document.getElementById("comboInicioConsulta");
    const horarios = jsonHorarios();

    horarios.forEach((datos) => {

        const opcionCombo = document.createElement("option");
        
                opcionCombo.value = datos.inicioConsulta.replace('2023-11-05T','');
                opcionCombo.text = datos.inicioConsulta.replace('2023-11-05T','');
                
                comboBoxInicio.appendChild(opcionCombo);
                


    });


}

function cargarComboBoxProfesionalesEsp(){

    const comboBox = document.getElementById("comboProfesionales2");
    fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.forEach(function(dato)  {
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

function cargarComboBoxProfesionales() {

    const comboBox = document.getElementById("comboProfesionales");
    fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.forEach(function(dato)  {
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

function traerHorariosProfesional(idProfesional){

    const divModalMostrarDatos = document.getElementById("divDatosParaMostrar");
    divModalMostrarDatos.innerHTML = "";
    const tituloMostrar = document.getElementById("tituloModalHyE");
    
    fetch(urlHoras+"/"+idProfesional)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud al servidor.");
                }
            })
            .then(data => {
                data.forEach((dato) => {
                    
                    tituloMostrar.textContent = "Horarios Profesional"
                    const horarios = document.createElement("label");
                    const bloqueSeparacion = document.createElement("br");
                    horarios.textContent = dato.inicioconsulta.replace('2023-11-05T','');
                    divModalMostrarDatos.appendChild(bloqueSeparacion)
                    divModalMostrarDatos.appendChild(horarios);
                        
                    
    
                });
    
    
    
            })
    
            .catch(error => {
                // Manejar errores de la solicitud
                console.error("Error: " + error);
            });
    


}


function traerEspecialidadesProfesional(idProfesional){

const divModalMostrarDatos = document.getElementById("divDatosParaMostrar");
divModalMostrarDatos.innerHTML = "";
const tituloMostrar = document.getElementById("tituloModalHyE");

fetch(urlEspecialidades+"/"+idProfesional)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.forEach((dato) => {
                
                tituloMostrar.textContent = "Especialidades Profesional"
                const especialidad = document.createElement("label");
                especialidad.textContent = dato.especialidad;
                divModalMostrarDatos.appendChild(especialidad)
                    
                

            });



        })

        .catch(error => {
            // Manejar errores de la solicitud
            console.error("Error: " + error);
        });


}


function cargarTabla() {

    fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.forEach((dato) => {



                const filaProfesional = document.createElement("tr");

                const idProfesional = document.createElement("td");
                idProfesional.textContent = dato.id;


                const nombre = document.createElement("td");
                nombre.textContent = dato.nombre;


                const apellido = document.createElement("td");
                apellido.textContent = dato.apellido;


                const consultorio = document.createElement("td");
                consultorio.textContent = dato.consultorio;


                const matricula = document.createElement("td");
                matricula.textContent = dato.matricula;

                const mostrarHorarios = document.createElement("a");
                mostrarHorarios.type = "button";
                mostrarHorarios.className = "btn btn-primary";
                mostrarHorarios.setAttribute("data-bs-target", "#modalHorariosProfesional");
                mostrarHorarios.setAttribute("data-bs-toggle","modal");
                mostrarHorarios.setAttribute("onClick","traerHorariosProfesional("+dato.id+")");
                mostrarHorarios.textContent = "Mostrar Horarios";

                

                const mostrarEspecialidades = document.createElement("button");
                mostrarEspecialidades.type = "button";
                mostrarEspecialidades.className = "btn btn-primary";
                mostrarEspecialidades.setAttribute("data-bs-target", "#modalHorariosProfesional");
                mostrarEspecialidades.setAttribute("data-bs-toggle","modal");
                mostrarEspecialidades.setAttribute("onClick","traerEspecialidadesProfesional("+dato.id+")");
                mostrarEspecialidades.textContent = "Mostrar Especialidades";

                


                //TODO DE LA TABLA
                
                filaProfesional.appendChild(idProfesional);
                filaProfesional.appendChild(nombre);
                filaProfesional.appendChild(apellido);
                filaProfesional.appendChild(consultorio);
                filaProfesional.appendChild(matricula);
                filaProfesional.appendChild(mostrarEspecialidades);
                filaProfesional.appendChild(mostrarHorarios);



                tablaBody.appendChild(filaProfesional);

            });



        })

        .catch(error => {
            // Manejar errores de la solicitud
            console.error("Error: " + error);
        });

}



function jsonHorarios(){
    const horarios = [];

    horarios.push({inicioConsulta : "2023-11-05T08:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T08:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T09:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T09:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T10:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T10:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T11:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T11:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T12:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T12:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T15:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T16:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T17:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T18:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T19:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T20:30:00"});
    horarios.push({inicioConsulta : "2023-11-05T21:00:00"});
    horarios.push({inicioConsulta : "2023-11-05T22:30:00"});
    

    return horarios;
}