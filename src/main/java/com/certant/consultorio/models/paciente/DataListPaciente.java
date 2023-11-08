package com.certant.consultorio.models.paciente;

public record DataListPaciente(String nombrePaciente, String apellidoPaciente, String dniPaciente) {

    public DataListPaciente (Paciente paciente){

        this(paciente.getNombrepaciente(), paciente.getApellidopaciente(), paciente.getDnipaciente());

    }

}
