package com.certant.consultorio.models.profesionales;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DataEspecialidad(



        @NotNull
        Long id,
        @NotBlank
        String especialidad,
        @NotBlank
        String descripcion

) {}
