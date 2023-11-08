package com.certant.consultorio.models.horarios;

import java.time.LocalDateTime;

public record DataListHorarios(Long id, LocalDateTime inicioConsulta) {

    public DataListHorarios (Horarios horarios){

        this(horarios.getId(), horarios.getInicioconsulta());

    }

}
