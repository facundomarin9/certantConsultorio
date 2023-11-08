package com.certant.consultorio.models.profesionales;

import com.certant.consultorio.models.especialidad.Especialidad;
import com.certant.consultorio.models.horarios.Horarios;

import java.util.List;
import java.util.Set;

public record DataListProfesionales(Long id, String nombre, String apellido, String consultorio, String matricula
) {

    public DataListProfesionales (Profesional profesional){

        this(profesional.getId(), profesional.getNombre(), profesional.getApellido(), profesional.getConsultorio(),
                profesional.getMatricula());

    }

}
