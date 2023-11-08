package com.certant.consultorio.models.especialidad;

import jakarta.validation.constraints.NotBlank;

public record DataRegisterEspecialidad(
        @NotBlank
        String especialidad,
        @NotBlank
        String descripcion

) {



}
