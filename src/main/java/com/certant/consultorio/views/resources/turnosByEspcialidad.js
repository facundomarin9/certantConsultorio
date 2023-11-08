const urlTurnos = "http://localhost:8080/turnos/turnosPorEspecialidad";
const urlEspecialidades = "http://localhost:8080/especialidades";
const urlHorariosById = "http://localhost:8080/horas"
const urlEspecialidadesById = "http://localhost:8080/especialidades";


const tablaBody = document.getElementById("tablaTurnosId");
const btnEnviar = document.getElementById("botonCargarEspecialidad");


document.addEventListener("DOMContentLoaded", function () {
    cargarComboBoxEspecialidades();
  });
  
btnEnviar.addEventListener("click", function (){
    tablaBody.innerHTML = "";
    cargarTabla();
    

});


function cargarComboBoxEspecialidades(){


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
                opcionCombo.text = dato.especialidad
                comboBox.appendChild(opcionCombo);


            })

                .catch(error => {
                    // Manejar errores de la solicitud
                    console.error("Error: " + error);
                });

        })


}

  function cargarTabla() {

    
    const idEspecialidad = document.getElementById("comboEspecialidades").value;

    const datosEnviarPaciente = {};
    datosEnviarPaciente.idEspecialidad = idEspecialidad;

    console.log(datosEnviarPaciente)
    

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEnviarPaciente)
        
    };
    fetch(urlTurnos, opciones)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error en la solicitud al servidor.");
            }
        })
        .then(data => {
            data.forEach((dato) => {

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

            

                



                tablaBody.appendChild(fila);




            })
        })
        .catch(error => {
            // Manejar errores de la solicitud
            console.error("Error: " + error);
        });


}