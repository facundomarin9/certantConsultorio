package com.certant.consultorio.models.profesionales;

import com.certant.consultorio.models.especialidad.Especialidad;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;

public record DataUpdateProfesionalEspecialidad(@NotNull Long id, @NotNull ArrayList<Especialidad> especialidades) {
}
