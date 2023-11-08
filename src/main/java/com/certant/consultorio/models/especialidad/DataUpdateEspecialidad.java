package com.certant.consultorio.models.especialidad;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DataUpdateEspecialidad(

        @NotNull
        Long id,
        @NotBlank
        String especialidad,
        @NotBlank
        String descripcion

) {
}
