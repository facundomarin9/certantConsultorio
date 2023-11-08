package com.certant.consultorio.models.turnos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record DataRegisterTurno(

        @NotBlank
        String dniPaciente,
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
