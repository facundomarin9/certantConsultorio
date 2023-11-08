package com.certant.consultorio.models.turnos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record DataUpdateTurno(
        @NotNull
        Long id,
        @NotNull
        LocalDateTime fechaTurno,
        @NotNull
        Long idHoraTurno,
        @NotNull
        Long idProfesional,
        @NotNull
        Long idEspecialidad
) {
}
