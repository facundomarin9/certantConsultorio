package com.certant.consultorio.models.profesionales;

import com.certant.consultorio.models.especialidad.ListEspecialidades;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DataRegisterProfesional(

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
