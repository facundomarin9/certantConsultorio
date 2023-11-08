package com.certant.consultorio.models.profesionales;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

public interface ProfesionalRepository extends JpaRepository<Profesional, Long> {
    Page<Profesional> findByActivoTrue(Pageable paginacion);

    Set<Profesional> findByConsultorio(String consultorio);

}
