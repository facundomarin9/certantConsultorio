


const urlTurnos = "http://localhost:8080/turnos";




document.addEventListener("DOMContentLoaded", function () {

    const parametrosCancelar = new URLSearchParams(window.location.search);
    const idTurnoCancelar = parametrosCancelar.get("id");
    console.log(idTurnoCancelar)
    cancelarTurno(idTurnoCancelar);
    


});

        


function cancelarTurno(idTurnoCancelar){

const opciones = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }
};
fetch(urlTurnos+"/"+idTurnoCancelar, opciones)
    .then(response => {

        if(response.status == 204){
            alert("Turno eliminado con exito!");
            window.location.href= "listadoTurnos.html";
            
        }else if(response.status == 400){
            alert("Turno dado de baja o ya no tiene tiempo para cancelarlo");
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