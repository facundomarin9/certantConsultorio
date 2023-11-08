package com.certant.consultorio.models.turnos;

import java.time.LocalDateTime;

public record DataListTurnos(Long id, String nombrePaciente, String apellidoPaciente, String dniPaciente,
                             Boolean confirmado, LocalDateTime fechaTurno, LocalDateTime horaTurno, String nombreProfesional, String apellidoProfesional, String consultorio) {

    public DataListTurnos(Turno turno){

        this(turno.getId(), turno.getPaciente().getNombrepaciente(),turno.getPaciente().getApellidopaciente(),turno.getPaciente().getDnipaciente(), turno.getConfirmado(),
                turno.getFechaturno(), turno.getHorario().getInicioconsulta(), turno.getProfesional().getNombre(), turno.getProfesional().getApellido(), turno.getProfesional().getConsultorio());

    }

}
