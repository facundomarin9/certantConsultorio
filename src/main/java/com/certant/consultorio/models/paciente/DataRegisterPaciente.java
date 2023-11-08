package com.certant.consultorio.models.paciente;

import jakarta.validation.constraints.NotBlank;

public record DataRegisterPaciente(
        @NotBlank
        String nombrePaciente,
        @NotBlank
        String apellidoPaciente,
        @NotBlank
        String dniPaciente
) {
}
