package com.certant.consultorio.models.profesionales;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DataUpdateProfesional(
        @NotNull
        Long id,
        @NotBlank
        String nombre,
        @NotBlank
        String apellido,
        @NotBlank
        String consultorio,
        @NotBlank
        String matricula
) {
}
