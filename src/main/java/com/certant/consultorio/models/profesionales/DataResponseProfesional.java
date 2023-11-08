package com.certant.consultorio.models.profesionales;

import com.certant.consultorio.models.especialidad.ListEspecialidades;

import java.util.List;

public record DataResponseProfesional(
        Long id,
        String nombre,
        String apellido,
        String consultorio,
        String matricula,
        List<ListEspecialidades> especialidades
) {
}
