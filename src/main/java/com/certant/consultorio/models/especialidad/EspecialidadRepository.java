package com.certant.consultorio.models.especialidad;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface EspecialidadRepository extends JpaRepository<Especialidad, Long> {
    Page<Especialidad> findByActivoTrue(Pageable paginacion);

    ArrayList<Especialidad> findByProfesionalesId(Long id);
}
