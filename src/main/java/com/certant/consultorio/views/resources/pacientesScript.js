const urlPaciente = "http://localhost:8080/paciente";
const tablaBody = document.getElementById("tablaPacientes");
const btnCargarPaciente = document.getElementById("botonCargarEspecialidad");


document.addEventListener("DOMContentLoaded", function () {
    cargarTabla();
});


btnCargarPaciente.addEventListener("click", function () {

    enviarDatosPacientes();
    const modalPaciente = document.getElementById("modalPacienteId");
    $(modalPaciente).modal("hide");
    setTimeout(function () {
        location.reload();
    }, 1000);

});


function enviarDatosPacientes() {


    const inputNombre = document.getElementById("nombrePacienteId").value;
    const inputApellido = document.getElementById("apellidoPacienteId").value;
    const inputDni = document.getElementById("documentoPacienteId").value;
    const datosEnviarPaciente = {}

    datosEnviarPaciente.nombrePaciente = inputNombre;
    datosEnviarPaciente.apellidoPaciente = inputApellido;
    datosEnviarPaciente.dniPaciente = inputDni;

    console.log(datosEnviarPaciente);

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEnviarPaciente)
    };
    fetch(urlPaciente, opciones)
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


function cargarTabla() {

    fetch(urlPaciente)
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

                const nombrePaciente = document.createElement("td");
                nombrePaciente.textContent = dato.nombrePaciente;
                fila.appendChild(nombrePaciente);

                const apellidoPaciente = document.createElement("td");
                apellidoPaciente.textContent = dato.apellidoPaciente;
                fila.appendChild(apellidoPaciente);

                const dniPaciente = document.createElement("td");
                dniPaciente.textContent = dato.dniPaciente;
                fila.appendChild(dniPaciente);

                tablaBody.appendChild(fila);




            })
        })
        .catch(error => {
            // Manejar errores de la solicitud
            console.error("Error: " + error);
        });

}