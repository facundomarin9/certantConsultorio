const urlTurnos = "http://localhost:8080/turnos/turnosPorEspecialidad";
const urlTurnosByProfesional = "http://localhost:8080/turnos/turnosPorProfesional";
const urlProfesionales = "http://localhost:8080/profesionales";


const tablaBody = document.getElementById("tablaTurnosId");
const btnEnviar = document.getElementById("botonCargarProfesional");


document.addEventListener("DOMContentLoaded", function () {
    cargarComboBoxProfesionales();
  });
  
btnEnviar.addEventListener("click", function (){
    tablaBody.innerHTML = "";
    cargarTabla();
    

});


function cargarComboBoxProfesionales(){


    const comboBox = document.getElementById("comboProfesional");


    fetch(urlProfesionales)
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

  function cargarTabla() {

    
    const idProfesional = document.getElementById("comboProfesional").value;

    const datosEnviarProfesional = {};
    datosEnviarProfesional.idProfesional = idProfesional;

    
    

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEnviarProfesional)
        
    };
    fetch(urlTurnosByProfesional, opciones)
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