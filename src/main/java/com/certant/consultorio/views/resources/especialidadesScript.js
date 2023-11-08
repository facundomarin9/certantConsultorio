const url = "http://localhost:8080/especialidades";
const tablaBody = document.getElementById("tablaEspecialidades");
const botonCargarEspecialidad = document.getElementById("botonCargarEspecialidad");

document.addEventListener("DOMContentLoaded", function () {
  cargarTabla();
});

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
  data.content.forEach((dato) => {

  const fila = document.createElement("tr");

  const especialidad = document.createElement("td");
  especialidad.textContent = dato.especialidad;
  fila.appendChild(especialidad);

  const descripcion = document.createElement("td");
  descripcion.textContent = dato.descripcion;
  fila.appendChild(descripcion);

  tablaBody.appendChild(fila);




  })
 })
  .catch(error => {
    // Manejar errores de la solicitud
    console.error("Error: " + error);
  });

}

botonCargarEspecialidad.addEventListener("click", function(){

enviarDatosEspecialidades();
const modalEspecialidad = document.getElementById("modalEspecialidadesId");
$(modalEspecialidad).modal("hide");
setTimeout(function(){
  location.reload();
}, 1000);

});


function enviarDatosEspecialidades(){


const inputEspecialidad = document.getElementById("especialidad").value;
const inputDescripcion = document.getElementById("descripcion").value;
const datosEnviarEspecialidad = {}

datosEnviarEspecialidad.especialidad = inputEspecialidad;
datosEnviarEspecialidad.descripcion = inputDescripcion;

console.log(datosEnviarEspecialidad);

const opciones = {
  method: "POST",
  headers: {
      "Content-Type": "application/json" 
  },
  body: JSON.stringify(datosEnviarEspecialidad) 
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






