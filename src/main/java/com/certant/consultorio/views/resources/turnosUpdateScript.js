const urlTurnos = "http://localhost:8080/turnos";
const urlProfesionales = "http://localhost:8080/profesionales";
const urlHorariosById = "http://localhost:8080/horas"
const urlEspecialidadesById = "http://localhost:8080/especialidades";
const urlProfesionalesById = "http://localhost:8080/turnos";


const btnCargarComboHorariosUpdate = document.getElementById("botonCargarHorariosUpdateId");
const comboBoxProfesUpdate = document.getElementById("comboProfesionalesUpdateId");

document.addEventListener("DOMContentLoaded", function () {
    
    
         cargarComboBoxProfesionales();
    
        const parametros = new URLSearchParams(window.location.search);
        const idTurno = parametros.get("id");
        
        cargarDatosFormularioUpdate(idTurno);




});


btnCargarComboHorariosUpdate.addEventListener("click", function (){ 
    console.log(1)
    comboBoxHorariosUpdate.innerHTML = "";
    const opcionCombo = comboBoxProfesUpdate.value;
    console.log(opcionCombo)
    cargarComboBoxHorarios(opcionCombo);
    cargarRadioEspecialidad(opcionCombo)

});




function cargarComboBoxProfesionalesUpdate(){

    const comboBox = document.getElementById("comboProfesionalesUpdateId");
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

                var opcionCombo = document.createElement("option");
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
function cargarDatosFormularioUpdate(idTurno){
    cargarComboBoxProfesionalesUpdate();
    const inputUpdateDni = document.getElementById("inputDocumentoUpdateId");
   
    const comboBoxHorariosUpdate = document.getElementById("comboSeleccionarHorarioUpdateId");
    const comboBox = document.getElementById("comboProfesionalesUpdateId");

    fetch(urlProfesionalesById+"/"+idTurno)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Error en la solicitud al servidor.");
        }
    })
    .then(data => {
        
            inputUpdateDni.value = data.dniPaciente;
            const valorOpcion = data.hora.profesional.nombre+" "+data.hora.profesional.apellido;
            comboBox.value = data.hora.profesional.id;
            



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