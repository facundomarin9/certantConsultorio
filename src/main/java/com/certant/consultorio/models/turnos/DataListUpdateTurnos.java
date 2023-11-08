package com.certant.consultorio.models.turnos;

import com.certant.consultorio.models.especialidad.Especialidad;
import com.certant.consultorio.models.horarios.Horarios;
import com.certant.consultorio.models.profesionales.Profesional;

import java.time.LocalDateTime;

public record DataListUpdateTurnos(String dniPaciente, LocalDateTime fechaTurno, Horarios hora, Profesional profesional, Especialidad especialidad) {

    public DataListUpdateTurnos(Turno turno){
        this(turno.getPaciente().getDnipaciente(), turno.getFechaturno(), turno.getHorario(), turno.getProfesional(), turno.getEspecialidad());
    }

}
