package com.certant.consultorio.models.especialidad;

public record DataListEspecialidades(Long id, String especialidad, String descripcion) {

    public DataListEspecialidades(Especialidad especialidad){

        this(especialidad.getId(),especialidad.getEspecialidad(), especialidad.getDescripcion());

    }

}
